import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import CertificateTemplate, {
  CERTIFICATE_BASE_HEIGHT,
  CERTIFICATE_BASE_WIDTH,
} from "@/components/certificates/CertificateTemplate";
import type { CertificateRecord } from "@/context/ProgressContext";

const filenameFromTitle = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "certificate";

const buildSvgMarkup = (certificate: CertificateRecord) => {
  const markup = renderToStaticMarkup(
    React.createElement(CertificateTemplate, {
      certificate,
      width: CERTIFICATE_BASE_WIDTH,
      height: CERTIFICATE_BASE_HEIGHT,
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>${markup}`;
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

export const downloadCertificate = async (
  certificate: CertificateRecord,
  options?: { format?: "png" | "svg"; filename?: string },
): Promise<void> => {
  if (typeof window === "undefined") {
    throw new Error("Certificate export is only available in the browser.");
  }

  const format = options?.format ?? "png";
  const filename = `${filenameFromTitle(certificate.title)}-${certificate.verificationCode.toLowerCase()}.${format}`;
  const svgMarkup = buildSvgMarkup(certificate);

  if (format === "svg") {
    const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
    downloadBlob(blob, filename);
    return;
  }

  const svgBlob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Unable to render certificate preview."));
      img.src = url;
    });

    const aspectRatio = CERTIFICATE_BASE_WIDTH / CERTIFICATE_BASE_HEIGHT;
    const canvasWidth = 2400;
    const canvasHeight = Math.round(canvasWidth / aspectRatio);
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Unable to acquire canvas context for export.");
    }
    context.fillStyle = "#050910";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(image, 0, 0, canvasWidth, canvasHeight);

    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.96));
    if (!blob) {
      throw new Error("Unable to encode certificate image.");
    }
    downloadBlob(blob, filename);
  } finally {
    URL.revokeObjectURL(url);
  }
};

export const buildCertificateSvg = (certificate: CertificateRecord) => buildSvgMarkup(certificate);
