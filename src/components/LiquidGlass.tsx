import { useState } from "react";

const blobs = [
  { w: 50, h: 50, top: '10%', left: '15%', bg: 'var(--glass-blob-1)', delay: '0s' },
  { w: 40, h: 40, top: '60%', left: '5%', bg: 'var(--glass-blob-2)', delay: '2s' },
  { w: 35, h: 35, top: '20%', left: '70%', bg: 'var(--glass-blob-3)', delay: '4s' },
  { w: 45, h: 45, top: '70%', left: '65%', bg: 'var(--glass-blob-1)', delay: '6s' },
  { w: 30, h: 30, top: '40%', left: '80%', bg: 'var(--glass-blob-2)', delay: '1s' },
  { w: 25, h: 25, top: '5%', left: '45%', bg: 'var(--glass-blob-3)', delay: '3s' },
  { w: 38, h: 38, top: '85%', left: '35%', bg: 'var(--glass-blob-1)', delay: '5s' },
  { w: 28, h: 28, top: '50%', left: '25%', bg: 'var(--glass-blob-2)', delay: '7s' },
  { w: 70, h: 70, top: '2%', left: '42%', bg: 'rgba(236,72,153,0.05)', delay: '1.5s' },
  { w: 45, h: 45, top: '78%', left: '82%', bg: 'rgba(20,184,166,0.05)', delay: '3.5s' },
];

const barHeights = [12, 18, 8, 22, 14, 24, 10, 20, 16, 8, 18, 14];

const cardBase = {
  background: 'hsl(var(--glass-bg))',
  backdropFilter: 'blur(24px) saturate(200%) brightness(1.05)',
  WebkitBackdropFilter: 'blur(24px) saturate(200%) brightness(1.05)',
  border: '1px solid hsl(var(--glass-border))',
  borderRadius: 20,
} as const;

const hoverTransition = 'transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms cubic-bezier(0.34,1.56,0.64,1)';

const LiquidGlass = () => {
  const [card1Hovered, setCard1Hovered] = useState(false);
  const [card2Hovered, setCard2Hovered] = useState(false);
  const [card3Hovered, setCard3Hovered] = useState(false);

  const defaultShadow = '0 8px 32px hsl(var(--glass-shadow)), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(0,0,0,0.04)';
  const hoverShadow = '0 20px 60px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(0,0,0,0.04)';

  return (
    <div className="relative w-[460px] h-[420px]">
      {/* Ambient blobs */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-blob-drift"
          style={{
            width: blob.w,
            height: blob.h,
            top: blob.top,
            left: blob.left,
            background: blob.bg,
            filter: 'blur(30px)',
            opacity: 'var(--ambient-opacity)',
            animationDelay: blob.delay,
          }}
        />
      ))}

      {/* Soft radial gradient background */}
      <div className="absolute inset-0 rounded-[20px]" style={{
        background: 'radial-gradient(at 40% 20%, rgba(168,148,255,0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(99,180,255,0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(236,72,153,0.06) 0px, transparent 50%)',
      }} />

      {/* Connecting lines SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <line x1="200" y1="200" x2="320" y2="80" stroke="rgba(99,102,241,0.15)" strokeWidth="1" />
        <line x1="200" y1="200" x2="100" y2="320" stroke="rgba(99,102,241,0.15)" strokeWidth="1" />
        <line x1="320" y1="80" x2="100" y2="320" stroke="rgba(99,102,241,0.1)" strokeWidth="1" />
        <line x1="320" y1="80" x2="140" y2="350" stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
        <line x1="100" y1="320" x2="360" y2="100" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
        {/* Intersection nodes */}
        <circle cx="200" cy="200" r="3" fill="rgba(99,102,241,0.3)" />
        <circle cx="320" cy="80" r="3" fill="rgba(99,102,241,0.3)" />
        <circle cx="100" cy="320" r="3" fill="rgba(99,102,241,0.3)" />
      </svg>

      {/* Card 1 — Main (center) */}
      <div
        className="absolute animate-float-1"
        onMouseEnter={() => setCard1Hovered(true)}
        onMouseLeave={() => setCard1Hovered(false)}
        style={{
          ...cardBase,
          top: '100px',
          left: '70px',
          width: 320,
          height: 200,
          boxShadow: card1Hovered ? hoverShadow : defaultShadow,
          zIndex: 3,
          padding: 24,
          transform: card1Hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: hoverTransition,
          cursor: 'default',
        }}
      >
        {/* macOS window chrome */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-2 h-2 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#FFBD2E' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#28C840' }} />
        </div>
        {/* Avatar */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full" style={{ background: 'linear-gradient(135deg, #818cf8, #6366f1)' }} />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 rounded-full w-3/4" style={{ background: 'hsl(var(--foreground) / 0.15)' }} />
            <div className="h-1.5 rounded-full w-1/2" style={{ background: 'hsl(var(--foreground) / 0.08)' }} />
          </div>
        </div>
        {/* Accent bar */}
        <div className="h-2 rounded-md mb-2" style={{ background: '#6366f1', width: '60%' }} />
        {/* Text bars */}
        <div className="space-y-1.5 mb-3">
          <div className="h-1.5 rounded-full w-full" style={{ background: 'hsl(var(--foreground) / 0.1)' }} />
          <div className="h-1.5 rounded-full w-4/5" style={{ background: 'hsl(var(--foreground) / 0.07)' }} />
        </div>
        {/* Action pills */}
        <div className="flex gap-2 mb-3">
          <div className="px-3 py-1 rounded-full text-[9px] font-medium" style={{ background: '#6366f1', color: 'white' }}>Primary</div>
          <div className="px-3 py-1 rounded-full text-[9px] font-medium" style={{ border: '1.5px solid hsl(var(--foreground) / 0.2)', color: 'hsl(var(--foreground) / 0.5)' }}>Secondary</div>
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-[3px] h-[28px]">
          {barHeights.map((h, i) => (
            <div key={i} className="rounded-t" style={{ width: 4, height: h, background: h === 24 ? 'rgba(99,102,241,0.85)' : 'rgba(99,102,241,0.3)' }} />
          ))}
        </div>
      </div>

      {/* Card 2 — Top right (smaller) */}
      <div
        className="absolute animate-float-2"
        onMouseEnter={() => setCard2Hovered(true)}
        onMouseLeave={() => setCard2Hovered(false)}
        style={{
          ...cardBase,
          top: '30px',
          right: '20px',
          width: 180,
          height: 100,
          boxShadow: card2Hovered ? hoverShadow : defaultShadow,
          zIndex: 2,
          padding: 16,
          transform: card2Hovered ? 'translateY(-6px) rotate(1deg)' : 'translateY(0) scale(1)',
          transition: hoverTransition,
          cursor: 'default',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <div className="h-2 rounded-full flex-1" style={{ background: 'hsl(var(--foreground) / 0.15)' }} />
        </div>
        <div className="h-2 rounded-full w-4/5 mb-3" style={{ background: 'hsl(var(--foreground) / 0.08)' }} />
        <div className="flex items-end gap-1 h-[24px]">
          {[40, 65, 50].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: 'rgba(99,102,241,0.4)' }} />
          ))}
        </div>
      </div>

      {/* Card 3 — Bottom left (small) */}
      <div
        className="absolute animate-float-3"
        onMouseEnter={() => setCard3Hovered(true)}
        onMouseLeave={() => setCard3Hovered(false)}
        style={{
          ...cardBase,
          bottom: '40px',
          left: '40px',
          width: 160,
          height: 80,
          boxShadow: card3Hovered ? hoverShadow : defaultShadow,
          zIndex: 2,
          padding: 14,
          transform: card3Hovered ? 'translateY(-6px) rotate(-1deg)' : 'translateY(0) scale(1)',
          transition: hoverTransition,
          cursor: 'default',
        }}
      >
        <div className="flex gap-2 mb-2.5">
          {['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'].map((c) => (
            <div key={c} className="w-4 h-4 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'hsl(var(--foreground) / 0.06)' }}>
          <div className="h-full rounded-full" style={{ width: '65%', background: 'linear-gradient(90deg, #6366f1, #8B5CF6)' }} />
        </div>
      </div>
    </div>
  );
};

export default LiquidGlass;
