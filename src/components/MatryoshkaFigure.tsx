import React from 'react';
import { motion } from 'motion/react';
import { MatryoshkaLayer } from '../data/russiaFacts';

interface MatryoshkaFigureProps {
  layer: MatryoshkaLayer;
  currentLayerIndex: number;
  totalLayers: number;
  onClick: () => void;
}

export function MatryoshkaFigure({
  layer,
  currentLayerIndex,
  totalLayers,
  onClick,
}: MatryoshkaFigureProps) {
  // Scale down slightly as layers go deeper (1 -> 1.0, 5 -> 0.85) to simulate nested doll sizes!
  const scaleRatio = 1.05 - currentLayerIndex * 0.05;

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <motion.div
        key={layer.layer}
        initial={{ scale: 0.88, rotate: -3, y: 10 }}
        animate={{ scale: scaleRatio, rotate: 0, y: 0 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        whileHover={{ scale: scaleRatio * 1.04, y: -4 }}
        whileTap={{ scale: scaleRatio * 0.96 }}
        onClick={onClick}
        className="cursor-pointer relative group flex flex-col items-center drop-shadow-2xl"
        title="Нажмите на матрёшку, чтобы открыть следующий слой!"
      >
        {/* Glow behind matryoshka */}
        <div
          className="absolute -inset-4 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: layer.shawlColor }}
        />

        {/* SVG Matryoshka Silhouette & Russian Folk Ornament */}
        <svg
          viewBox="0 0 240 340"
          className="w-52 sm:w-60 h-auto filter drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Shawl Gradient */}
            <linearGradient id={`shawlGrad-${layer.layer}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={layer.shawlColor} />
              <stop offset="100%" stopColor={layer.dressColor} />
            </linearGradient>

            {/* Dress Gradient */}
            <radialGradient id={`dressGrad-${layer.layer}`} cx="50%" cy="65%" r="50%">
              <stop offset="0%" stopColor={layer.dressColor} />
              <stop offset="90%" stopColor="#1c1917" stopOpacity="0.85" />
            </radialGradient>

            {/* Apron Glow */}
            <radialGradient id={`apronGrad-${layer.layer}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor={layer.apronColor} />
            </radialGradient>
          </defs>

          {/* MAIN DOLL BODY SILHOUETTE (Classic Russian Matryoshka curve: Head bulb merging smoothly into pear-shaped body) */}
          <path
            d="M 120,18
               C 162,18 190,46 190,88
               C 190,118 178,138 162,154
               C 188,172 216,206 216,256
               C 216,306 172,330 120,330
               C 68,330 24,306 24,256
               C 24,206 52,172 78,154
               C 62,138 50,118 50,88
               C 50,46 78,18 120,18 Z"
            fill={`url(#dressGrad-${layer.layer})`}
            stroke="#292524"
            strokeWidth="3.5"
          />

          {/* HEADSHAWL (PLATOK) OUTER SHELL */}
          <path
            d="M 120,18
               C 162,18 190,46 190,88
               C 190,126 172,158 146,170
               C 134,176 120,178 120,178
               C 120,178 106,176 94,170
               C 68,158 50,126 50,88
               C 50,46 78,18 120,18 Z"
            fill={`url(#shawlGrad-${layer.layer})`}
          />

          {/* Golden Scarf Trimming / Kokoshnik Border */}
          <path
            d="M 72,136
               C 60,114 62,60 120,32
               C 178,60 180,114 168,136
               C 152,152 134,158 120,158
               C 106,158 88,152 72,136 Z"
            fill="#fbbf24"
            opacity="0.3"
          />

          {/* Golden pearl dots around the scarf border */}
          {[
            [74, 130], [67, 108], [69, 82], [79, 58], [98, 40],
            [120, 32],
            [142, 40], [161, 58], [171, 82], [173, 108], [166, 130]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#fef08a" stroke="#b45309" strokeWidth="0.8" />
          ))}

          {/* PORCELAIN DOLL FACE (Gentle Oval) */}
          <ellipse
            cx="120"
            cy="90"
            rx="42"
            ry="46"
            fill="#fffaf0"
            stroke="#78350f"
            strokeWidth="1.5"
          />

          {/* Hair: Pretty dark curls framing the forehead */}
          <path
            d="M 85,78
               C 92,62 108,68 120,74
               C 132,68 148,62 155,78
               C 153,60 138,50 120,50
               C 102,50 87,60 85,78 Z"
            fill="#5c3822"
          />
          <path
            d="M 82,90 C 82,82 86,74 92,72 C 87,79 88,88 88,94 Z"
            fill="#452210"
          />
          <path
            d="M 158,90 C 158,82 154,74 148,72 C 153,79 152,88 152,94 Z"
            fill="#452210"
          />

          {/* Eyebrows: Elegant curved arches */}
          <path d="M 95,80 Q 104,75 111,79" stroke="#452210" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 129,79 Q 136,75 145,80" stroke="#452210" strokeWidth="1.8" strokeLinecap="round" />

          {/* Big expressive blue Russian doll eyes with eyelashes */}
          {/* Left Eye */}
          <ellipse cx="103" cy="88" rx="6" ry="7" fill="#ffffff" stroke="#292524" strokeWidth="1.2" />
          <circle cx="104" cy="88" r="4" fill="#1e3a8a" />
          <circle cx="104" cy="88" r="2.2" fill="#09090b" />
          <circle cx="106" cy="86" r="1.4" fill="#ffffff" />
          {/* Left Eyelashes */}
          <path d="M 97,83 Q 103,81 109,83" stroke="#292524" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <line x1="102" y1="82" x2="100" y2="79" stroke="#292524" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="106" y1="82" x2="106" y2="78" stroke="#292524" strokeWidth="1.2" strokeLinecap="round" />

          {/* Right Eye */}
          <ellipse cx="137" cy="88" rx="6" ry="7" fill="#ffffff" stroke="#292524" strokeWidth="1.2" />
          <circle cx="136" cy="88" r="4" fill="#1e3a8a" />
          <circle cx="136" cy="88" r="2.2" fill="#09090b" />
          <circle cx="138" cy="86" r="1.4" fill="#ffffff" />
          {/* Right Eyelashes */}
          <path d="M 131,83 Q 137,81 143,83" stroke="#292524" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <line x1="134" y1="82" x2="134" y2="78" stroke="#292524" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="138" y1="82" x2="140" y2="79" stroke="#292524" strokeWidth="1.2" strokeLinecap="round" />

          {/* Cute Button Nose */}
          <path d="M 118,98 Q 120,101 122,98" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Rosy Blushing Cheeks (Russian Rubies) */}
          <circle cx="94" cy="98" r="7.5" fill="#f43f5e" opacity="0.38" />
          <circle cx="146" cy="98" r="7.5" fill="#f43f5e" opacity="0.38" />

          {/* Smiling Red Lips (Cherries) */}
          <path
            d="M 112,112
               C 116,110 118,114 120,114
               C 122,114 124,110 128,112
               C 124,122 116,122 112,112 Z"
            fill="#e11d48"
            stroke="#9f1239"
            strokeWidth="0.8"
          />

          {/* Scarf Knot Under Chin with Bow */}
          <g>
            <circle cx="120" cy="154" r="7" fill={layer.shawlColor} stroke="#292524" strokeWidth="1.5" />
            <path
              d="M 114,154 C 104,156 94,166 102,174 C 112,172 116,160 116,154 Z"
              fill={layer.shawlColor}
              stroke="#292524"
              strokeWidth="1.2"
            />
            <path
              d="M 126,154 C 136,156 146,166 138,174 C 128,172 124,160 124,154 Z"
              fill={layer.shawlColor}
              stroke="#292524"
              strokeWidth="1.2"
            />
            <circle cx="120" cy="154" r="3" fill="#fbbf24" />
          </g>

          {/* ORNAMENTAL APRON (FARTUK) - Central Russian folk centerpiece */}
          <ellipse
            cx="120"
            cy="242"
            rx="66"
            ry="72"
            fill={`url(#apronGrad-${layer.layer})`}
            stroke="#fbbf24"
            strokeWidth="2.5"
          />

          {/* Apron Scalloped Border */}
          <ellipse
            cx="120"
            cy="242"
            rx="62"
            ry="68"
            fill="none"
            stroke={layer.accentColor}
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* FOLK PATTERNS ACCORDING TO TYPE */}
          {layer.patternType === 'khokhloma' && (
            /* Traditional Red/Gold Khokhloma: Big lush scarlet rose, golden scrolls, rowan berries */
            <g transform="translate(120, 238)">
              {/* Central Scarlet Rose */}
              <circle cx="0" cy="0" r="19" fill="#dc2626" />
              <circle cx="0" cy="0" r="14" fill="#ef4444" />
              <circle cx="0" cy="0" r="9" fill="#f87171" />
              <circle cx="0" cy="0" r="4" fill="#fbbf24" />

              {/* Side Flower Buds */}
              <circle cx="-28" cy="-14" r="8" fill="#f59e0b" />
              <circle cx="28" cy="-14" r="8" fill="#f59e0b" />
              <circle cx="-26" cy="18" r="9" fill="#dc2626" />
              <circle cx="26" cy="18" r="9" fill="#dc2626" />

              {/* Khokhloma Golden Swirls & Rowan Berries */}
              <path d="M -15,-22 Q -5,-34 10,-26 Q 22,-20 18,-8" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 15,22 Q 5,34 -10,26 Q -22,20 -18,8" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {/* Green Leaves */}
              <path d="M -12,-8 C -22,-18 -16,-28 -8,-24 Z" fill="#15803d" />
              <path d="M 12,-8 C 22,-18 16,-28 8,-24 Z" fill="#15803d" />
              <path d="M -12,12 C -24,20 -18,30 -6,26 Z" fill="#15803d" />
              <path d="M 12,12 C 24,20 18,30 6,26 Z" fill="#15803d" />
            </g>
          )}

          {layer.patternType === 'gorodets' && (
            /* Gorodets Folk Painting: Warm golden sunflower, red berries, whimsical folk birds/swirls */
            <g transform="translate(120, 238)">
              {/* Sunny Center */}
              <circle cx="0" cy="0" r="21" fill="#f59e0b" />
              <circle cx="0" cy="0" r="14" fill="#d97706" />
              <circle cx="0" cy="0" r="7" fill="#fef08a" />

              {/* Golden Sun Petals */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const px = Math.cos(rad) * 26;
                const py = Math.sin(rad) * 26;
                return <circle key={i} cx={px} cy={py} r="4.5" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />;
              })}

              {/* Folk Berries */}
              <circle cx="-32" cy="0" r="7" fill="#dc2626" />
              <circle cx="32" cy="0" r="7" fill="#dc2626" />
              <circle cx="-24" cy="-24" r="6" fill="#b45309" />
              <circle cx="24" cy="-24" r="6" fill="#b45309" />
              <circle cx="-24" cy="24" r="6" fill="#b45309" />
              <circle cx="24" cy="24" r="6" fill="#b45309" />
            </g>
          )}

          {layer.patternType === 'gzhel' && (
            /* Royal Russian Gzhel: Icy white & deep cobalt blue roses, frost swirls */
            <g transform="translate(120, 238)">
              {/* Deep Cobalt Blue Rose */}
              <circle cx="0" cy="0" r="20" fill="#1d4ed8" />
              <circle cx="0" cy="0" r="14" fill="#2563eb" />
              <circle cx="0" cy="0" r="8" fill="#60a5fa" />
              <circle cx="0" cy="0" r="3.5" fill="#eff6ff" />

              {/* Gzhel Frost Tendrils */}
              <path d="M 0,-20 C -18,-34 -30,-12 -24,-2" stroke="#1e40af" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 0,-20 C 18,-34 30,-12 24,-2" stroke="#1e40af" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M -16,14 C -28,26 -14,36 -2,28" stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 16,14 C 28,26 14,36 2,28" stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round" />

              {/* Frost Flakes */}
              <circle cx="-28" cy="-6" r="5" fill="#38bdf8" />
              <circle cx="28" cy="-6" r="5" fill="#38bdf8" />
              <circle cx="0" cy="24" r="6" fill="#1d4ed8" />
            </g>
          )}

          {layer.patternType === 'malachite' && (
            /* Emerald Malachite & Gold: Ural gemstones, blooming spring flowers */
            <g transform="translate(120, 238)">
              <circle cx="0" cy="0" r="21" fill="#047857" />
              <circle cx="0" cy="0" r="14" fill="#059669" />
              <circle cx="0" cy="0" r="7" fill="#34d399" />
              <circle cx="0" cy="0" r="3" fill="#fef08a" />

              {/* Malachite Rings */}
              <ellipse cx="0" cy="0" rx="36" ry="32" fill="none" stroke="#10b981" strokeWidth="1.8" opacity="0.6" />
              <circle cx="-28" cy="-14" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
              <circle cx="28" cy="-14" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
              <circle cx="-22" cy="20" r="8" fill="#059669" />
              <circle cx="22" cy="20" r="8" fill="#059669" />
            </g>
          )}

          {layer.patternType === 'cosmos' && (
            /* Cosmic Starlight: Deep purple sky, gold crescent and sparkling stars (Yuri Gagarin & Science) */
            <g transform="translate(120, 238)">
              <circle cx="0" cy="0" r="22" fill="#581c87" />
              {/* Golden Orbit Ring */}
              <ellipse cx="0" cy="0" rx="42" ry="18" fill="none" stroke="#fbbf24" strokeWidth="2" transform="rotate(-25)" />

              {/* First Earth Satellite / Star Motif */}
              <circle cx="0" cy="0" r="9" fill="#fbbf24" />
              <circle cx="0" cy="0" r="5" fill="#ffffff" />

              {/* Stars & Sparks */}
              {[
                [-24, -22], [24, -22], [-28, 16], [28, 16], [0, 26], [0, -32]
              ].map(([sx, sy], i) => (
                <g key={i} transform={`translate(${sx}, ${sy})`}>
                  <path d="M 0,-4 L 1,-1 L 4,0 L 1,1 L 0,4 L -1,1 L -4,0 L -1,-1 Z" fill="#fbbf24" />
                </g>
              ))}
            </g>
          )}

          {/* Gentle hands holding the apron */}
          <g>
            <ellipse cx="58" cy="226" rx="9" ry="14" fill="#fffaf0" stroke="#78350f" strokeWidth="1.2" transform="rotate(20 58 226)" />
            <ellipse cx="182" cy="226" rx="9" ry="14" fill="#fffaf0" stroke="#78350f" strokeWidth="1.2" transform="rotate(-20 182 226)" />
          </g>

          {/* Layer number badge on apron */}
          <g transform="translate(120, 296)">
            <rect x="-30" y="-10" width="60" height="20" rx="10" fill="#1c1917" opacity="0.8" />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="11"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              № {layer.layer} / {totalLayers}
            </text>
          </g>
        </svg>

        {/* Floating Hint Tag */}
        <div className="mt-3 px-3 py-1 rounded-full bg-stone-900/85 text-white text-[11px] font-bold font-sans-ui flex items-center gap-1.5 shadow-md border border-amber-400/40 group-hover:bg-rose-700 transition-colors">
          <span>✨</span>
          <span>Наряд: {layer.outfitName}</span>
        </div>
      </motion.div>

      {/* Interactive Helper Button */}
      <button
        type="button"
        id="btn-next-matryoshka"
        onClick={onClick}
        className="mt-3 text-xs font-semibold text-rose-700 hover:text-rose-800 font-sans-ui flex items-center gap-1.5 cursor-pointer transition-colors"
      >
        <span>Раскрыть матрёшку (кукла {layer.layer} из {totalLayers})</span>
        <span className="text-sm">→</span>
      </button>
    </div>
  );
}
