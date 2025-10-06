import fs from "node:fs";
import path from "node:path";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const coursesPath = path.resolve("src/data/courses.ts");
let content = fs.readFileSync(coursesPath, "utf8");

const titleVideoRegex = /title:\s*"([^"]+)",\s*\n\s*videoUrl:\s*"https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]{11})",/g;
const lessonMap = new Map();
let match;
while ((match = titleVideoRegex.exec(content)) !== null) {
  const [, title, videoId] = match;
  lessonMap.set(videoId, { title });
}

const reportPath = path.resolve("scripts/youtube-report.json");
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));

const replacements = [];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function checkVideo(id) {
  const res = await fetch(`https://www.youtube.com/watch?v=${id}`, {
    headers: { "user-agent": USER_AGENT },
  });
  if (!res.ok) {
    return { ok: false, status: `${res.status} ${res.statusText}` };
  }
  const html = await res.text();
  const matchPlayer = html.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});/s);
  if (!matchPlayer) {
    return { ok: false, status: "missing-player" };
  }
  const data = JSON.parse(matchPlayer[1]);
  const status = data?.playabilityStatus?.status;
  const reason = data?.playabilityStatus?.reason;
  return { ok: status === "OK", status, reason };
}

async function searchYouTube(query) {
  const res = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, {
    headers: { "user-agent": USER_AGENT },
  });
  if (!res.ok) {
    throw new Error(`Search failed ${res.status} ${res.statusText}`);
  }
  const html = await res.text();
  const matchData = html.match(/ytInitialData\s*=\s*(\{.*?\});/s);
  if (!matchData) {
    throw new Error("Missing search data");
  }
  const data = JSON.parse(matchData[1]);
  const sections =
    data?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents ?? [];
  const videos = [];
  for (const section of sections) {
    const items = section?.itemSectionRenderer?.contents ?? [];
    for (const item of items) {
      if (item?.videoRenderer?.videoId) {
        const videoId = item.videoRenderer.videoId;
        const titleRuns = item.videoRenderer.title?.runs ?? [];
        const title = titleRuns.map((run) => run.text).join("");
        videos.push({ videoId, title });
      }
    }
  }
  return videos;
}

const failures = [];

(async () => {
  for (const entry of report.unavailable) {
    const info = lessonMap.get(entry.id);
    if (!info) {
      failures.push({ id: entry.id, reason: "not-found" });
      continue;
    }

    const query = `${info.title} tutorial`;
    let candidates = [];
    try {
      candidates = await searchYouTube(query);
    } catch (error) {
      failures.push({ id: entry.id, reason: error.message });
      continue;
    }

    let replacement = null;
    for (const candidate of candidates.slice(0, 8)) {
      if (candidate.videoId === entry.id) {
        continue;
      }
      try {
        const status = await checkVideo(candidate.videoId);
        if (status.ok) {
          replacement = { id: candidate.videoId, title: candidate.title };
          break;
        }
      } catch (error) {
        // ignore and continue testing other candidates
      }
      await delay(200);
    }

    if (!replacement) {
      failures.push({ id: entry.id, reason: "no-valid-replacement", query });
      continue;
    }

    content = content.replace(
      new RegExp(`https://www\\.youtube\\.com/embed/${entry.id.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}`, "g"),
      `https://www.youtube.com/embed/${replacement.id}`,
    );

    replacements.push({
      oldId: entry.id,
      newId: replacement.id,
      lessonTitle: info.title,
      replacementTitle: replacement.title,
      query,
    });

    await delay(200);
  }

  fs.writeFileSync(coursesPath, content);
  fs.writeFileSync(
    path.resolve("scripts/youtube-replacements.json"),
    JSON.stringify({ replacements, failures }, null, 2),
  );
})();
