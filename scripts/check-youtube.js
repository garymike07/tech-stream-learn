import fs from "node:fs";
import path from "node:path";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const filePath = path.resolve("src/data/courses.ts");
const fileContent = fs.readFileSync(filePath, "utf8");

const embedRegex = /https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]+)/g;
const ids = new Set();

for (const match of fileContent.matchAll(embedRegex)) {
  ids.add(match[1]);
}

if (ids.size === 0) {
  console.log("No YouTube embeds found.");
  process.exit(0);
}

console.log(`Checking ${ids.size} YouTube embed(s)...`);

const statusSummary = {
  OK: 0,
  ERROR: 0,
};

const report = {
  available: [],
  unavailable: [],
};

for (const id of ids) {
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  try {
    const response = await fetch(watchUrl, {
      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      statusSummary.ERROR += 1;
      report.unavailable.push({ id, status: response.status, statusText: response.statusText });
      console.warn(`Unavailable: ${id} (${response.status} ${response.statusText})`);
      continue;
    }

    const html = await response.text();
    const match = html.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});/s);

    if (!match) {
      statusSummary.ERROR += 1;
      report.unavailable.push({ id, status: "parse-error", statusText: "Missing player response" });
      console.warn(`Unavailable: ${id} (parse-error missing player response)`);
      continue;
    }

    let playerResponse;
    try {
      playerResponse = JSON.parse(match[1]);
    } catch (error) {
      statusSummary.ERROR += 1;
      report.unavailable.push({ id, status: "parse-error", statusText: error.message });
      console.warn(`Unavailable: ${id} (parse-error ${error.message})`);
      continue;
    }

    const playabilityStatus = playerResponse?.playabilityStatus?.status;

    if (playabilityStatus !== "OK") {
      statusSummary.ERROR += 1;
      const reason = playerResponse?.playabilityStatus?.reason ?? "Unknown reason";
      report.unavailable.push({ id, status: playabilityStatus ?? "unknown", statusText: reason });
      console.warn(`Unavailable: ${id} (${playabilityStatus ?? "unknown"} ${reason})`);
      continue;
    }

    statusSummary.OK += 1;
    report.available.push(id);
    process.stdout.write("·");
  } catch (error) {
    statusSummary.ERROR += 1;
    report.unavailable.push({ id, status: "network-error", statusText: error.message });
    console.warn(`Unavailable: ${id} (network-error ${error.message})`);
  }
}

console.log("\nCheck complete.");
console.log(`Playable videos: ${statusSummary.OK}`);
console.log(`Unavailable/errored videos: ${statusSummary.ERROR}`);

const outputPath = path.resolve("scripts/youtube-report.json");
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
console.log(`Report written to ${outputPath}`);

if (report.unavailable.length) {
  console.log("Unavailable videos:");
  report.unavailable.slice(0, 20).forEach((entry) => {
    console.log(` - ${entry.id}: ${entry.status} ${entry.statusText ?? ""}`.trim());
  });
  if (report.unavailable.length > 20) {
    console.log(` ...and ${report.unavailable.length - 20} more`);
  }
  process.exitCode = 1;
} else {
  console.log("All videos are available.");
}
