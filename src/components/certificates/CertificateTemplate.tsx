import { memo } from "react";
import { format } from "date-fns";
import type { CertificateRecord } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";

export const CERTIFICATE_BASE_WIDTH = 1680;
export const CERTIFICATE_BASE_HEIGHT = 1188;

type CertificateTemplateProps = {
  certificate: CertificateRecord;
  width?: number;
  height?: number;
  className?: string;
};

const CertificateTemplate = ({ certificate, width, height, className }: CertificateTemplateProps) => {
  const issuedDate = format(new Date(certificate.issuedAt), "PP");
  const moduleLabel = certificate.moduleId ? certificate.title : `${certificate.title}`;
  const highlights = certificate.highlights.slice(0, 3);

  return (
    <svg
      role="img"
      aria-label={`Certificate awarded to ${certificate.recipientName}`}
      viewBox={`0 0 ${CERTIFICATE_BASE_WIDTH} ${CERTIFICATE_BASE_HEIGHT}`}
      width={width ?? CERTIFICATE_BASE_WIDTH}
      height={height ?? CERTIFICATE_BASE_HEIGHT}
      className={cn("rounded-[36px] bg-transparent", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="certificate-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#081229" />
          <stop offset="48%" stopColor="#101b38" />
          <stop offset="100%" stopColor="#1f263f" />
        </linearGradient>
        <linearGradient id="certificate-gild" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="55%" stopColor="#d6b97a" />
          <stop offset="100%" stopColor="#fbe2a6" />
        </linearGradient>
        <linearGradient id="certificate-tier" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.9" />
        </linearGradient>
        <clipPath id="certificate-round">
          <rect x="0" y="0" width={CERTIFICATE_BASE_WIDTH} height={CERTIFICATE_BASE_HEIGHT} rx="48" />
        </clipPath>
      </defs>

      <g clipPath="url(#certificate-round)">
        <rect width={CERTIFICATE_BASE_WIDTH} height={CERTIFICATE_BASE_HEIGHT} fill="url(#certificate-bg)" />
        <rect
          x="64"
          y="64"
          width={CERTIFICATE_BASE_WIDTH - 128}
          height={CERTIFICATE_BASE_HEIGHT - 128}
          rx="36"
          stroke="url(#certificate-gild)"
          strokeWidth="6"
          fill="rgba(4,7,15,0.45)"
        />

        <g opacity="0.35">
          <circle cx="1200" cy="220" r="240" fill="url(#certificate-tier)" />
          <circle cx="360" cy="1020" r="220" fill="url(#certificate-tier)" />
        </g>

        <text x="140" y="260" fontFamily="'Playfair Display', 'Times New Roman', serif" fontSize="58" fill="#f5e6c8">
          Certificate of Executive Mastery
        </text>
        <text x="140" y="340" fontFamily="'Inter', 'Arial', sans-serif" fontSize="24" fill="#b9c3d8" letterSpacing="6">
          AWARDED TO
        </text>
        <text
          x="140"
          y="440"
          fontFamily="'Playfair Display', 'Times New Roman', serif"
          fontSize="98"
          fill="#ffffff"
          fontWeight="600"
        >
          {certificate.recipientName}
        </text>

        <text x="140" y="520" fontFamily="'Inter', 'Arial', sans-serif" fontSize="24" fill="#b4c0d6" letterSpacing="4">
          HAS COMPLETED THE CONCIERGE PROGRAM
        </text>

        <text x="140" y="590" fontFamily="'Inter', 'Arial', sans-serif" fontSize="40" fill="#f5e6c8" fontWeight="600">
          {moduleLabel}
        </text>

        <g transform="translate(140 640)">
          <rect width="520" height="120" rx="32" fill="rgba(23,34,56,0.65)" stroke="rgba(245,230,200,0.5)" strokeWidth="2" />
          <text x="38" y="62" fontFamily="'Inter', 'Arial', sans-serif" fontSize="24" fill="#c0cee7">
            Tier {certificate.tier}
          </text>
          <text x="38" y="94" fontFamily="'Inter', 'Arial', sans-serif" fontSize="20" fill="#8fa3c7">
            Issued {issuedDate}
          </text>
        </g>

        <g transform="translate(140 800)">
          <text fontFamily="'Inter', 'Arial', sans-serif" fontSize="22" fill="#b9c3d8" letterSpacing="5">
            EXECUTIVE HIGHLIGHTS
          </text>
          {highlights.map((highlight, index) => (
            <g key={highlight} transform={`translate(0 ${48 + index * 64})`}>
              <circle cx="16" cy="12" r="6" fill="#f5e6c8" />
              <text x="40" y="18" fontFamily="'Inter', 'Arial', sans-serif" fontSize="24" fill="#e4ecff">
                {highlight}
              </text>
            </g>
          ))}
        </g>

        <g transform="translate(1080 780)">
          <rect width="420" height="210" rx="28" fill="rgba(23,34,56,0.65)" stroke="rgba(245,230,200,0.5)" strokeWidth="2" />
          <text x="40" y="70" fontFamily="'Inter', 'Arial', sans-serif" fontSize="22" fill="#c1cce4" letterSpacing="5">
            VERIFIED BY
          </text>
          <text x="40" y="120" fontFamily="'Playfair Display', 'Times New Roman', serif" fontSize="40" fill="#ffffff">
            {certificate.signature.name}
          </text>
          <line x1="40" y1="140" x2="380" y2="140" stroke="rgba(245,230,200,0.4)" strokeWidth="2" />
          <text x="40" y="172" fontFamily="'Inter', 'Arial', sans-serif" fontSize="20" fill="#8fa3c7">
            {certificate.signature.title}
          </text>
        </g>

        <g transform="translate(1080 640)">
          <rect width="420" height="110" rx="28" fill="rgba(23,34,56,0.65)" stroke="rgba(245,230,200,0.5)" strokeWidth="2" />
          <text x="40" y="60" fontFamily="'Inter', 'Arial', sans-serif" fontSize="24" fill="#e4ecff" letterSpacing="6">
            VERIFICATION
          </text>
          <text x="40" y="92" fontFamily="'Inter', 'Arial', sans-serif" fontSize="30" fill="#f5e6c8" letterSpacing="4">
            {certificate.verificationCode}
          </text>
        </g>

        <g transform="translate(140 1040)">
          <text fontFamily="'Inter', 'Arial', sans-serif" fontSize="20" fill="#8fa3c7">
            Issued by {certificate.issuedBy}
          </text>
        </g>
      </g>
    </svg>
  );
};

export default memo(CertificateTemplate);
