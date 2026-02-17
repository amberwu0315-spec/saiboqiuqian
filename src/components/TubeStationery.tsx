interface TubeStationeryProps {
  shaking: boolean;
}

export default function TubeStationery({ shaking }: TubeStationeryProps) {
  return (
    <div className={shaking ? "animate-tubeSoft" : ""}>
      <svg viewBox="0 0 220 260" className="h-56 w-56 md:h-72 md:w-72" aria-hidden="true">
        <defs>
          <linearGradient id="templeTubeBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b9a097" />
            <stop offset="45%" stopColor="#a78a84" />
            <stop offset="100%" stopColor="#8f7270" />
          </linearGradient>
          <linearGradient id="templeTubeRim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e7d9c6" />
            <stop offset="50%" stopColor="#d8c6ae" />
            <stop offset="100%" stopColor="#e7d9c6" />
          </linearGradient>
          <linearGradient id="templeTubeStick" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff9ec" />
            <stop offset="100%" stopColor="#ecd9be" />
          </linearGradient>
          <radialGradient id="templeTubeInner" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#6b5658" />
            <stop offset="100%" stopColor="#433336" />
          </radialGradient>
          <radialGradient id="templeTubeGlow" cx="28%" cy="26%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="templeTubeShadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#5f4a4d" floodOpacity="0.22" />
          </filter>
        </defs>

        <ellipse cx="110" cy="236" rx="68" ry="13" fill="#8c6f72" fillOpacity="0.22" />

        <g filter="url(#templeTubeShadow)">
          <ellipse cx="110" cy="56" rx="58" ry="17" fill="url(#templeTubeRim)" />
          <ellipse cx="110" cy="57" rx="49" ry="11" fill="url(#templeTubeInner)" />

          <rect x="56" y="57" width="108" height="168" rx="28" fill="url(#templeTubeBody)" />
          <rect x="56" y="57" width="108" height="168" rx="28" fill="none" stroke="#eadccd" strokeWidth="2.6" />

          <rect x="66" y="75" width="10" height="132" rx="5" fill="#e7bfc0" fillOpacity="0.25" />
          <rect x="145" y="75" width="7" height="132" rx="3.5" fill="#7a6163" fillOpacity="0.38" />
          <rect x="56" y="57" width="108" height="168" rx="28" fill="url(#templeTubeGlow)" />

          <rect x="72" y="146" width="76" height="34" rx="12" fill="#fdf3e5" fillOpacity="0.96" />
          <rect x="72" y="146" width="76" height="34" rx="12" fill="none" stroke="#8f7072" strokeOpacity="0.26" strokeWidth="2" />
          <line x1="84" y1="163" x2="136" y2="163" stroke="#8a6a6d" strokeOpacity="0.24" strokeWidth="2" />
        </g>

        <g className={shaking ? "animate-sticksSoft" : ""}>
          <g>
            <rect x="78" y="76" width="13" height="118" rx="6.5" fill="url(#templeTubeStick)" stroke="#9a7758" strokeOpacity="0.35" strokeWidth="1.7" />
            <line x1="84.5" y1="84" x2="84.5" y2="187" stroke="#b1895c" strokeOpacity="0.36" strokeWidth="1.2" />
          </g>
          <g>
            <rect x="102.5" y="72" width="14" height="122" rx="7" fill="url(#templeTubeStick)" stroke="#9a7758" strokeOpacity="0.35" strokeWidth="1.7" />
            <line x1="109.5" y1="80" x2="109.5" y2="187" stroke="#b1895c" strokeOpacity="0.36" strokeWidth="1.2" />
          </g>
          <g>
            <rect x="128" y="78" width="13" height="114" rx="6.5" fill="url(#templeTubeStick)" stroke="#9a7758" strokeOpacity="0.35" strokeWidth="1.7" />
            <line x1="134.5" y1="86" x2="134.5" y2="184" stroke="#b1895c" strokeOpacity="0.36" strokeWidth="1.2" />
          </g>
        </g>

        <circle cx="150" cy="140" r="9.5" fill="#e3d0c2" stroke="#8f7072" strokeOpacity="0.28" strokeWidth="2" />
        <path d="M150 149 L146 160 L150 168 L154 160 Z" fill="#d8b9af" fillOpacity="0.95" />
      </svg>
    </div>
  );
}
