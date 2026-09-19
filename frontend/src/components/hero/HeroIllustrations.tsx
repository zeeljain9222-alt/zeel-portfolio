import React from "react";

/* =========================================================
   Hand-drawn SVG art for the anime-editorial scrapbook hero
   ========================================================= */

const INK = "hsl(30, 10%, 12%)";
const CORAL = "hsl(12, 53%, 53%)";
const CORAL_SOFT = "hsl(12, 45%, 66%)";
const INK_SOFT = "hsl(30, 10%, 30%)";

/* ---------- Brush wash blobs (charcoal / coral) ---------- */

export const InkWash: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 200 140" fill="none" className={className} style={style} aria-hidden="true">
    <path
      d="M14 84c-6-22 8-46 34-56 24-9 54-11 76-2 20 8 34 26 33 44-1 20-20 34-46 38-30 5-62 3-82-8-9-5-13-9-15-16Z"
      fill="currentColor"
    />
    <path
      d="M8 96c18 14 52 20 88 16 34-4 62-18 70-38"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      opacity="0.35"
    />
    <path d="M40 40c14-10 34-14 52-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
  </svg>
);

export const CoralWash: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 200 140" fill="none" className={className} style={style} aria-hidden="true">
    <path
      d="M22 78c-8-20 6-42 30-50 22-8 48-9 68-1 18 7 30 23 28 40-2 19-20 31-43 34-27 4-56 1-72-8-6-4-10-9-11-15Z"
      fill="currentColor"
    />
    <path d="M52 38c12-8 28-11 42-9" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
  </svg>
);

export const GreyWash: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 160 120" fill="none" className={className} style={style} aria-hidden="true">
    <path
      d="M12 70C6 52 20 32 42 24c20-7 44-8 60-1 16 6 26 20 24 35-2 17-18 27-40 30-24 3-48 1-62-7-6-4-10-7-12-11Z"
      fill="currentColor"
    />
  </svg>
);

/* ---------- Anime character: seated, coding on laptop ---------- */

export const AnimeCoder: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 340 300" fill="none" className={className} style={style} aria-hidden="true">
    {/* laptop */}
    <g>
      <rect x="128" y="176" width="118" height="12" rx="3" fill="hsl(215, 15%, 25%)" />
      <rect x="138" y="112" width="98" height="66" rx="5" fill="hsl(215, 15%, 22%)" />
      <rect x="144" y="118" width="86" height="52" rx="3" fill="hsl(215, 12%, 14%)" />
      <path d="M150 126h34M150 134h58M150 142h42M150 150h50" stroke={CORAL} strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
      <path d="M150 160h24" stroke="hsl(0,0%,80%)" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      <circle cx="187" cy="171" r="4" fill="#fff" opacity="0.85" />
    </g>
    {/* crossed legs / grey pants */}
    <path
      d="M96 218c26-8 52-10 74-6 20 4 40 6 58 2 16-3 30 2 34 12 4 11-8 20-30 24-30 6-74 6-104 0-20-4-34-12-32-20 1-6 6-9 14-12Z"
      fill="hsl(30, 6%, 62%)"
    />
    <path d="M112 252c26 8 66 9 96 2" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity="0.5" />
    {/* shoes */}
    <path d="M84 252c-2-8 6-14 16-14 8 0 16 3 18 10 2 6-2 10-10 11-10 2-21 0-24-7Z" fill={INK} />
    <path d="M236 258c-3-7 3-13 13-14 8-1 15 2 17 8 2 6-3 10-11 11-9 1-16-1-19-5Z" fill={INK} />
    <path d="M86 247l8 3M88 253l10 1M241 252l9 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    {/* torso — oversized black hoodie */}
    <path
      d="M118 196c-4-34 10-64 42-70 30-6 56 6 62 32 4 18 2 32-2 44-2 6-8 10-16 11-32 4-62 2-78-6-6-3-8-6-8-11Z"
      fill="hsl(220, 12%, 13%)"
    />
    <path d="M132 172c14 10 44 12 66 6" stroke="#000" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
    {/* hoodie pocket + strings */}
    <path d="M148 190c12 6 32 7 44 3" stroke="#000" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    <path d="M158 148c-2 10-2 18 0 26M184 146c2 8 2 16 0 24" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    {/* headphones around neck */}
    <path d="M138 136c-6 8-4 18 4 24" stroke={CORAL} strokeWidth="4" strokeLinecap="round" />
    <circle cx="141" cy="160" r="6" fill={CORAL} />
    {/* arms to laptop */}
    <path d="M126 168c-2-14 6-24 18-28" stroke="hsl(220, 12%, 13%)" strokeWidth="14" strokeLinecap="round" />
    <path d="M216 170c4-16-4-28-16-30" stroke="hsl(220, 12%, 13%)" strokeWidth="14" strokeLinecap="round" />
    <circle cx="141" cy="138" r="7" fill="hsl(28, 35%, 82%)" />
    <circle cx="202" cy="139" r="7" fill="hsl(28, 35%, 82%)" />
    {/* head */}
    <ellipse cx="171" cy="106" rx="34" ry="30" fill="hsl(28, 35%, 84%)" />
    {/* hair — messy dark bob */}
    <path
      d="M136 104c-4-28 14-48 36-48s38 20 34 46c-1 6-3 9-6 12 1-6 0-12-3-16-2 8-6 12-12 14 2-6 1-12-3-16-1 8-6 13-13 14 2-5 2-10-1-14-3 7-9 11-16 11 1-4 0-8-3-10-6 2-11 6-13 7Z"
      fill="hsl(220, 14%, 10%)"
    />
    <path d="M138 100c-6 8-8 18-4 26 3-9 7-15 13-19" fill="hsl(220, 14%, 10%)" />
    <path d="M206 98c8 6 12 16 10 26-4-8-9-13-15-16" fill="hsl(220, 14%, 10%)" />
    {/* face */}
    <path d="M158 112c2-2 6-2 8 0" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M178 112c2-2 6-2 8 0" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M170 122c1 2 3 3 5 2" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    <path d="M163 100c3-2 6-2 8 0M176 100c3-2 6-2 8 0" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
    {/* blush */}
    <ellipse cx="150" cy="118" rx="5" ry="3" fill={CORAL_SOFT} opacity="0.7" />
    <ellipse cx="192" cy="118" rx="5" ry="3" fill={CORAL_SOFT} opacity="0.7" />
  </svg>
);

/* ---------- Anime character: top row — leaning over collage ---------- */

export const AnimeLean: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 300 220" fill="none" className={className} style={style} aria-hidden="true">
    {/* torso, black oversized jacket */}
    <path
      d="M96 214c-8-44 4-84 40-92 34-7 62 8 70 38 5 20 2 36-4 52-2 6-9 10-18 10-34 2-64-1-80-9-5-2-7-5-8 1Z"
      fill="hsl(220, 13%, 12%)"
    />
    {/* backpack strap */}
    <path d="M136 130c8 22 10 44 8 66" stroke="hsl(30, 25%, 30%)" strokeWidth="10" strokeLinecap="round" opacity="0.9" />
    <path d="M170 128c6 20 7 40 5 60" stroke="hsl(30, 25%, 30%)" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
    {/* hair clip */}
    <rect x="176" y="52" width="16" height="6" rx="3" transform="rotate(18 184 55)" fill={CORAL} />
    {/* head — looking down/side */}
    <ellipse cx="152" cy="86" rx="35" ry="31" fill="hsl(28, 35%, 84%)" />
    <path
      d="M116 86c-6-30 14-52 38-52 25 0 42 22 36 50-1 5-3 8-5 10 0-7-2-13-5-16-1 8-5 13-11 15 1-6 0-11-4-14-2 8-7 12-14 13 2-5 2-10-1-13-4 6-10 9-17 9 1-4 0-7-3-9-7 3-12 6-14 7Z"
      fill="hsl(220, 14%, 10%)"
    />
    <path d="M120 92c-8 6-12 16-10 26 4-9 10-15 17-18M188 88c9 5 14 14 14 25-5-8-11-12-18-14" fill="hsl(220, 14%, 10%)" />
    {/* face */}
    <path d="M140 96c2-2 6-2 8 0" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M162 94c2-2 6-2 8 0" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M150 108c2 2 5 2 7 0" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    <path d="M136 84c3-2 7-2 9 0M160 82c3-2 7-2 9 0" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
    <ellipse cx="132" cy="102" rx="5" ry="3" fill={CORAL_SOFT} opacity="0.7" />
  </svg>
);

/* ---------- Anime character: handstand (calisthenics) ---------- */

export const AnimeHandstand: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 260 340" fill="none" className={className} style={style} aria-hidden="true">
    {/* arms */}
    <path d="M92 332c-2-34 2-62 10-84" stroke="hsl(28, 35%, 82%)" strokeWidth="13" strokeLinecap="round" />
    <path d="M168 330c4-30 2-56-6-78" stroke="hsl(28, 35%, 82%)" strokeWidth="13" strokeLinecap="round" />
    <path d="M84 336c2-5 8-7 14-5M166 334c2-5 8-7 14-5" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    {/* wristband */}
    <rect x="80" y="300" width="22" height="10" rx="5" fill={INK} transform="rotate(-8 91 305)" />
    <rect x="160" y="296" width="22" height="10" rx="5" fill={INK} transform="rotate(8 171 301)" />
    {/* torso — black tee */}
    <path
      d="M96 250c-6-26 6-48 34-50 28-2 46 14 48 38 1 18-6 32-18 40-24 4-48-2-60-14-3-5-4-9-4-14Z"
      fill="hsl(220, 13%, 12%)"
    />
    <path d="M104 236c20 8 44 8 60 0" stroke="#000" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    {/* baggy black pants */}
    <path
      d="M100 208c-4-22 8-38 30-40 24-2 40 10 42 30 1 14-4 26-14 32-22 4-44-2-54-10-3-4-4-8-4-12Z"
      fill="hsl(220, 13%, 12%)"
    />
    <path d="M112 196c18 6 38 6 52 0" stroke="#000" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    {/* legs */}
    <path d="M112 176c-2-18 4-32 18-38" stroke="hsl(220, 13%, 12%)" strokeWidth="16" strokeLinecap="round" />
    <path d="M152 172c4-18-2-32-16-38" stroke="hsl(220, 13%, 12%)" strokeWidth="16" strokeLinecap="round" />
    {/* sneakers */}
    <path d="M92 128c-4-10 4-18 14-18 9 0 16 6 17 14 1 9-5 15-14 16-8 1-15-4-17-12Z" fill="#fff" stroke={INK} strokeWidth="3" />
    <path d="M170 126c4-10-4-18-14-18-9 0-16 6-17 14-1 9 5 15 14 16 8 1 15-4 17-12Z" fill="#fff" stroke={INK} strokeWidth="3" />
    <path d="M92 122l14 2M168 120l-14 2" stroke={CORAL} strokeWidth="2.4" strokeLinecap="round" />
    {/* head below — looking down */}
    <ellipse cx="130" cy="60" rx="28" ry="25" fill="hsl(28, 35%, 84%)" />
    <path
      d="M104 58c-4-24 12-42 28-42 17 0 30 18 26 42-1 4-2 7-4 8 0-6-2-10-4-13-1 7-4 11-9 12 1-5 0-9-3-11-2 6-6 9-11 10 1-4 1-8-1-10-3 5-8 7-13 7 1-3 0-6-2-7-6 2-6 3-7 4Z"
      fill="hsl(220, 14%, 10%)"
    />
    <path d="M116 72c2 2 5 2 7 0" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    <path d="M118 60c2-2 5-2 7 0M138 58c2-2 5-2 7 0" stroke={INK} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ---------- Hand-drawn doodles ---------- */

export const DoodleCrown: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 48 32" fill="none" className={className} style={style} aria-hidden="true">
    <path
      d="M4 26L8 8l9 10 7-14 7 14 9-10 4 18c-13 4-27 4-40 0Z"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path d="M6 29c12 3 24 3 36 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const DoodleCrownMini: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 32 22" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M3 17L6 5l6 7 4-9 4 9 6-7 3 12c-8 2-17 2-26 0Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

export const DoodleSmile: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 28 24" fill="none" className={className} style={style} aria-hidden="true">
    <circle cx="14" cy="11" r="10" stroke="currentColor" strokeWidth="2.2" />
    <path d="M10 13c2.5 3 5.5 3 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 8h.5M17.5 8h.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const DoodleSparkle: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M14 2c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z" fill="currentColor" />
  </svg>
);

export const DoodleSparkleOutline: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className} style={style} aria-hidden="true">
    <path
      d="M14 3c.9 5.6 3.8 8.6 9.5 9.6-5.7 1-8.6 3.9-9.5 9.4-.9-5.5-3.8-8.4-9.5-9.4C10.2 11.6 13.1 8.6 14 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M22.5 19.5l1.5 1.5M23.5 18l1 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const DoodleLightning: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 18 34" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M11 2L3 18h5L6 32l10-18h-5l4-12H11Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

export const DoodleArrow: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 64 48" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M6 6c14 10 26 22 34 34" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M30 38l11 3 1-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DoodleArrowLong: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 90 40" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M4 34C26 30 56 20 82 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M70 6l13 1-4 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DoodleZigzag: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 60 40" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M6 8l8 10-8 10 10-2M34 6l8 10-8 10 10-2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DoodleSquiggleArrow: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 44 60" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M8 4c16 8 22 20 18 34-2 8-8 14-16 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M2 44l8 10 11-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DoodleLoop: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 60 24" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M4 14c8-12 18-12 24-4s16 8 24-4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

/* ---------- Leaf sprigs ---------- */

export const LeafSprig: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 90 160" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M46 156C40 110 42 60 58 8" stroke={INK_SOFT} strokeWidth="2.2" strokeLinecap="round" />
    <path
      d="M52 34c-10-4-14-14-10-24 8 2 14 10 14 20M54 58c-12-2-20-12-19-24 9 3 16 12 18 22M52 86c-12 0-21-9-22-21 9 2 17 10 20 20M48 112c-11-1-19-10-19-22 8 3 15 11 17 21M46 134c-9-1-16-9-16-19 7 3 13 10 15 18M60 46c8-6 10-17 6-26-7 4-11 13-11 22M64 72c9-5 13-16 10-26-8 4-13 13-14 22M64 100c9-4 14-14 12-25-8 4-13 12-15 21M60 124c8-4 12-13 11-23-7 4-12 11-14 19"
      fill="hsl(120, 8%, 32%)"
      opacity="0.75"
    />
  </svg>
);

export const LeafSprigDark: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 90 160" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M44 156C38 110 40 60 56 8" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <path
      d="M50 34c-10-4-14-14-10-24 8 2 14 10 14 20M52 58c-12-2-20-12-19-24 9 3 16 12 18 22M50 86c-12 0-21-9-22-21 9 2 17 10 20 20M46 112c-11-1-19-10-19-22 8 3 15 11 17 21M44 134c-9-1-16-9-16-19 7 3 13 10 15 18M58 46c8-6 10-17 6-26-7 4-11 13-11 22M62 72c9-5 13-16 10-26-8 4-13 13-14 22M62 100c9-4 14-14 12-25-8 4-13 12-15 21M58 124c8-4 12-13 11-23-7 4-12 11-14 19"
      fill="hsl(120, 6%, 18%)"
      opacity="0.85"
    />
  </svg>
);

/* ---------- Photo placeholder frame content ---------- */

export const PhotoPlaceholder: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} style={style} aria-hidden="true">
    <circle cx="60" cy="48" r="17" stroke="#faf6ec" strokeWidth="3" />
    <circle cx="60" cy="42" r="6" stroke="#faf6ec" strokeWidth="2.6" />
    <path d="M49 56c3-5 8-8 11-8s8 3 11 8" stroke="#faf6ec" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M30 22l4 4M86 22l4 4M30 88l4-4M86 88l4-4" stroke="#faf6ec" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

/* ---------- Landscape polaroid art (sunset + mountains) ---------- */

export const PolaroidScene: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg viewBox="0 0 220 150" fill="none" className={className} style={style} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e7b98c" />
        <stop offset="55%" stopColor="#d98f66" />
        <stop offset="100%" stopColor="#b9563d" />
      </linearGradient>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c96a4a" />
        <stop offset="100%" stopColor="#8a4a3c" />
      </linearGradient>
    </defs>
    <rect width="220" height="96" fill="url(#sky)" />
    <circle cx="110" cy="62" r="17" fill="#f7e3c2" />
    <circle cx="110" cy="62" r="24" fill="#f7e3c2" opacity="0.3" />
    {/* mountains */}
    <path d="M0 78l34-30 26 22 20-16 34 26 26-20 40 24 40-18v30H0Z" fill="#6e4638" opacity="0.9" />
    <path d="M0 86l40-22 30 18 26-14 36 22 30-16 58 26v10H0Z" fill="#54372e" />
    {/* water */}
    <rect y="96" width="220" height="54" fill="url(#sea)" />
    <path d="M92 106h36M70 116h60M96 126h30M60 136h70" stroke="#f7e3c2" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    {/* foliage corners */}
    <path d="M0 0c22 4 36 18 40 38C22 34 6 20 0 0Z" fill="#3f4a35" opacity="0.85" />
    <path d="M220 0c-24 5-38 20-42 42 22-6 38-22 42-42Z" fill="#3f4a35" opacity="0.85" />
  </svg>
);
