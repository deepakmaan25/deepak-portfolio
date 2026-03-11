const LiquidGlass = () => {
  return (
    <div className="relative w-[460px] h-[420px]">
      {/* Ambient light blobs */}
      {[
        { w: 50, h: 50, top: '10%', left: '15%', bg: 'var(--glass-blob-1)' },
        { w: 40, h: 40, top: '60%', left: '5%', bg: 'var(--glass-blob-2)' },
        { w: 35, h: 35, top: '20%', left: '70%', bg: 'var(--glass-blob-3)' },
        { w: 45, h: 45, top: '70%', left: '65%', bg: 'var(--glass-blob-1)' },
        { w: 30, h: 30, top: '40%', left: '80%', bg: 'var(--glass-blob-2)' },
        { w: 25, h: 25, top: '5%', left: '45%', bg: 'var(--glass-blob-3)' },
        { w: 38, h: 38, top: '85%', left: '35%', bg: 'var(--glass-blob-1)' },
        { w: 28, h: 28, top: '50%', left: '25%', bg: 'var(--glass-blob-2)' },
      ].map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.w,
            height: blob.h,
            top: blob.top,
            left: blob.left,
            background: blob.bg,
            filter: 'blur(30px)',
            opacity: 'var(--ambient-opacity)',
          }}
        />
      ))}

      {/* Soft radial gradient background */}
      <div className="absolute inset-0 rounded-[20px]" style={{
        background: 'radial-gradient(ellipse at 30% 40%, rgba(168,148,255,0.15) 0%, rgba(99,180,255,0.12) 40%, transparent 70%)',
      }} />

      {/* Connecting lines SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <line x1="200" y1="200" x2="320" y2="80" stroke="rgba(99,102,241,0.1)" strokeWidth="1" />
        <line x1="200" y1="200" x2="100" y2="320" stroke="rgba(99,102,241,0.1)" strokeWidth="1" />
        <line x1="320" y1="80" x2="100" y2="320" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
      </svg>

      {/* Card 1 — Main (center) */}
      <div
        className="absolute animate-float-1"
        style={{
          top: '100px',
          left: '70px',
          width: 320,
          height: 200,
          background: 'hsl(var(--glass-bg))',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid hsl(var(--glass-border))',
          borderRadius: 20,
          boxShadow: '0 8px 32px hsl(var(--glass-shadow)), inset 0 1.5px 0 rgba(255,255,255,0.9)',
          zIndex: 3,
          padding: 24,
        }}
      >
        {/* Avatar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full" style={{ background: 'linear-gradient(135deg, #818cf8, #6366f1)' }} />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 rounded-full w-3/4" style={{ background: 'hsl(var(--foreground) / 0.15)' }} />
            <div className="h-2 rounded-full w-1/2" style={{ background: 'hsl(var(--foreground) / 0.08)' }} />
          </div>
        </div>
        {/* Accent bar */}
        <div className="h-2 rounded-md mb-3" style={{ background: '#6366f1', width: '60%' }} />
        {/* Text bars */}
        <div className="space-y-2 mb-4">
          <div className="h-2 rounded-full w-full" style={{ background: 'hsl(var(--foreground) / 0.1)' }} />
          <div className="h-2 rounded-full w-4/5" style={{ background: 'hsl(var(--foreground) / 0.07)' }} />
        </div>
        {/* Action pills */}
        <div className="flex gap-2">
          <div className="px-4 py-1.5 rounded-full text-[10px] font-medium" style={{ background: '#6366f1', color: 'white' }}>Primary</div>
          <div className="px-4 py-1.5 rounded-full text-[10px] font-medium" style={{ border: '1.5px solid hsl(var(--foreground) / 0.2)', color: 'hsl(var(--foreground) / 0.5)' }}>Secondary</div>
        </div>
      </div>

      {/* Card 2 — Top right (smaller) */}
      <div
        className="absolute animate-float-2"
        style={{
          top: '30px',
          right: '20px',
          width: 180,
          height: 100,
          background: 'hsl(var(--glass-bg))',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid hsl(var(--glass-border))',
          borderRadius: 20,
          boxShadow: '0 8px 32px hsl(var(--glass-shadow)), inset 0 1.5px 0 rgba(255,255,255,0.9)',
          zIndex: 2,
          padding: 16,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <div className="h-2 rounded-full flex-1" style={{ background: 'hsl(var(--foreground) / 0.15)' }} />
        </div>
        <div className="h-2 rounded-full w-4/5 mb-3" style={{ background: 'hsl(var(--foreground) / 0.08)' }} />
        {/* Bar chart */}
        <div className="flex items-end gap-1 h-[24px]">
          {[40, 65, 50].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: 'rgba(99,102,241,0.4)' }} />
          ))}
        </div>
      </div>

      {/* Card 3 — Bottom left (small) */}
      <div
        className="absolute animate-float-3"
        style={{
          bottom: '40px',
          left: '40px',
          width: 160,
          height: 80,
          background: 'hsl(var(--glass-bg))',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid hsl(var(--glass-border))',
          borderRadius: 20,
          boxShadow: '0 8px 32px hsl(var(--glass-shadow)), inset 0 1.5px 0 rgba(255,255,255,0.9)',
          zIndex: 2,
          padding: 14,
        }}
      >
        {/* Color dots */}
        <div className="flex gap-2 mb-2.5">
          {['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'].map((c) => (
            <div key={c} className="w-4 h-4 rounded-full" style={{ background: c }} />
          ))}
        </div>
        {/* Progress bar */}
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'hsl(var(--foreground) / 0.06)' }}>
          <div className="h-full rounded-full" style={{ width: '65%', background: 'linear-gradient(90deg, #6366f1, #8B5CF6)' }} />
        </div>
      </div>
    </div>
  );
};

export default LiquidGlass;
