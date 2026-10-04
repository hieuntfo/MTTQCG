import React, { useState } from 'react';
import mttqOfficialLogo from '../../assets/images/mttq_official_logo_1791094243484.jpg';

interface EmblemProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const MttqEmblem: React.FC<EmblemProps> = ({ size = 48, className = '', showText = false }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {!imgError ? (
        <img
          src={mttqOfficialLogo}
          alt="Biểu trưng chuẩn Mặt trận Tổ quốc Việt Nam"
          width={size}
          height={size}
          onError={() => setImgError(true)}
          className="rounded-full object-cover shrink-0 ring-2 ring-amber-400/90 shadow-sm"
          style={{ width: size, height: size }}
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-sm select-none"
          aria-label="Biểu trưng chính thức Mặt trận Tổ quốc Việt Nam"
        >
          <defs>
            {/* Top text arc path for 'MẶT TRẬN TỔ QUỐC' */}
            <path id="topTextArc" d="M 28,100 A 72,72 0 0,1 172,100" fill="none" />
            {/* Bottom ribbon text arc path for 'VIỆT NAM' */}
            <path id="bottomTextArc" d="M 52,168 A 95,95 0 0,0 148,168" fill="none" />
            
            {/* Gradients for 3D faceted star */}
            <linearGradient id="starFacetDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="starFacetLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>
          </defs>

          {/* 1. Outer Dark Brown/Red Rim */}
          <circle cx="100" cy="100" r="97" fill="#881A05" />
          <circle cx="100" cy="100" r="91" fill="#DC2626" stroke="#FEF08A" strokeWidth="2" />

          {/* 2. Side Radiating Golden Sunbeam Rings (Left and Right Wings) */}
          <g stroke="#FACC15" strokeWidth="3" fill="none">
            <circle cx="100" cy="100" r="82" strokeDasharray="38 120" strokeDashoffset="75" />
            <circle cx="100" cy="100" r="76" strokeDasharray="36 120" strokeDashoffset="74" />
            <circle cx="100" cy="100" r="70" strokeDasharray="34 120" strokeDashoffset="73" />
            <circle cx="100" cy="100" r="64" strokeDasharray="32 120" strokeDashoffset="72" />
            <circle cx="100" cy="100" r="82" strokeDasharray="38 120" strokeDashoffset="185" />
            <circle cx="100" cy="100" r="76" strokeDasharray="36 120" strokeDashoffset="186" />
            <circle cx="100" cy="100" r="70" strokeDasharray="34 120" strokeDashoffset="187" />
            <circle cx="100" cy="100" r="64" strokeDasharray="32 120" strokeDashoffset="188" />
          </g>
          <path d="M 22,60 L 32,74 M 18,78 L 30,88 M 16,98 L 30,102 M 18,118 L 32,118" stroke="#881A05" strokeWidth="2" />
          <path d="M 178,60 L 168,74 M 182,78 L 170,88 M 184,98 L 170,102 M 182,118 L 168,118" stroke="#881A05" strokeWidth="2" />

          <g fill="none" stroke="#FACC15" strokeWidth="4">
            <ellipse cx="100" cy="172" rx="42" ry="12" />
            <ellipse cx="100" cy="179" rx="34" ry="9" strokeWidth="3" />
            <ellipse cx="100" cy="185" rx="26" ry="6" strokeWidth="2.5" />
          </g>

          <path
            d="M 28,92 C 26,118 42,142 98,155 C 56,134 40,118 52,120 C 44,116 34,106 28,92 Z"
            fill="#FFFFFF"
            stroke="#7F1D1D"
            strokeWidth="2"
          />
          <path
            d="M 172,92 C 174,118 158,142 102,155 C 144,134 160,118 148,120 C 156,116 166,106 172,92 Z"
            fill="#FFFFFF"
            stroke="#7F1D1D"
            strokeWidth="2"
          />

          <path
            d="M 44,68 C 38,88 56,128 98,154 C 68,128 58,98 68,98 C 58,92 48,82 44,68 Z"
            fill="#FFFFFF"
            stroke="#7F1D1D"
            strokeWidth="2"
          />
          <path
            d="M 156,68 C 162,88 144,128 102,154 C 132,128 142,98 132,98 C 142,92 152,82 156,68 Z"
            fill="#FFFFFF"
            stroke="#7F1D1D"
            strokeWidth="2"
          />

          <path
            d="M 68,58 C 62,86 82,130 99,154 C 82,118 80,94 90,98 C 78,90 70,76 68,58 Z"
            fill="#FFFFFF"
            stroke="#7F1D1D"
            strokeWidth="2"
          />
          <path
            d="M 132,58 C 138,86 118,130 101,154 C 118,118 120,94 110,98 C 122,90 130,76 132,58 Z"
            fill="#FFFFFF"
            stroke="#7F1D1D"
            strokeWidth="2"
          />
          <path
            d="M 100,56 C 85,82 92,122 100,154 C 108,122 115,82 100,56 Z"
            fill="#FFFFFF"
            stroke="#7F1D1D"
            strokeWidth="2"
          />

          <g stroke="#7F1D1D" strokeWidth="1.8" fill="none">
            <path d="M 100,154 Q 96,132 94,120" />
            <path d="M 100,154 Q 104,132 106,120" />
            <path d="M 100,154 Q 88,134 82,122" />
            <path d="M 100,154 Q 112,134 118,122" />
            <path d="M 100,154 Q 78,140 68,130" />
            <path d="M 100,154 Q 122,140 132,130" />
          </g>

          <g stroke="#B45309" strokeWidth="1">
            <polygon points="100,18 100,46 88,38" fill="url(#starFacetDark)" />
            <polygon points="100,18 100,46 112,38" fill="url(#starFacetLight)" />
            <polygon points="138,44 100,46 114,58" fill="url(#starFacetDark)" />
            <polygon points="138,44 100,46 112,38" fill="url(#starFacetLight)" />
            <polygon points="124,88 100,46 100,64" fill="url(#starFacetDark)" />
            <polygon points="124,88 100,46 114,58" fill="url(#starFacetLight)" />
            <polygon points="76,88 100,46 86,58" fill="url(#starFacetDark)" />
            <polygon points="76,88 100,46 100,64" fill="url(#starFacetLight)" />
            <polygon points="62,44 100,46 88,38" fill="url(#starFacetDark)" />
            <polygon points="62,44 100,46 86,58" fill="url(#starFacetLight)" />
          </g>

          <path
            d="M 42,156 Q 100,182 158,156 C 150,188 50,188 42,156 Z"
            fill="#DC2626"
            stroke="#881A05"
            strokeWidth="3.5"
          />

          <text
            fill="#FFF000"
            stroke="#78350F"
            strokeWidth="0.5"
            fontSize="17"
            fontWeight="bold"
            fontFamily="'Times New Roman', Times, serif"
            letterSpacing="2.5"
          >
            <textPath href="#bottomTextArc" startOffset="50%" textAnchor="middle">
              VIỆT NAM
            </textPath>
          </text>

          <text
            fill="#FFF000"
            stroke="#78350F"
            strokeWidth="0.5"
            fontSize="13"
            fontWeight="bold"
            fontFamily="'Times New Roman', Times, serif"
            letterSpacing="2"
          >
            <textPath href="#topTextArc" startOffset="50%" textAnchor="middle">
              MẶT TRẬN TỔ QUỐC
            </textPath>
          </text>
        </svg>
      )}

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-xs uppercase tracking-wider font-semibold text-red-700">
            Ủy ban Mặt trận Tổ quốc Việt Nam
          </span>
          <span className="text-base font-bold text-slate-900 leading-tight">
            PHƯỜNG CẦU GIẤY
          </span>
        </div>
      )}
    </div>
  );
};

export const NationalEmblem: React.FC<EmblemProps> = ({ size = 44, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-label="Quốc huy Việt Nam"
    >
      <circle cx="50" cy="50" r="46" fill="#DC2626" stroke="#CA8A04" strokeWidth="3" />
      {/* Rice ears */}
      <circle cx="50" cy="50" r="41" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 3" />
      {/* Cogwheel */}
      <circle cx="50" cy="74" r="14" fill="#EAB308" stroke="#A16207" strokeWidth="1.5" />
      <circle cx="50" cy="74" r="7" fill="#DC2626" />
      {/* Five point star */}
      <polygon
        points="50,22 55,38 72,38 58,48 63,64 50,54 37,64 42,48 28,38 45,38"
        fill="#FDE047"
        stroke="#CA8A04"
        strokeWidth="1.2"
      />
    </svg>
  );
};

export const PartyEmblem: React.FC<EmblemProps> = ({ size = 44, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-label="Biểu trưng Đảng Cộng sản Việt Nam"
    >
      <circle cx="50" cy="50" r="46" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      {/* Hammer and Sickle */}
      <path
        d="M32 30 L46 30 L46 44 L40 44 L40 72 L32 72 Z"
        fill="#FACC15"
        stroke="#B45309"
        strokeWidth="1"
        transform="rotate(-25 40 48)"
      />
      <path
        d="M48 28 C64 28 72 42 68 56 C65 66 54 72 44 72 C42 66 45 60 52 58 C60 56 62 46 56 38 C52 34 46 36 44 38 Z"
        fill="#FACC15"
        stroke="#B45309"
        strokeWidth="1"
      />
      <rect x="36" y="58" width="10" height="22" rx="2" fill="#EAB308" transform="rotate(35 41 69)" />
    </svg>
  );
};
