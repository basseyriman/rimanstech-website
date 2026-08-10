export function HeroVisual() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border-light bg-porcelain">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px bg-border-light p-px">
        {/* Top-left: abstract data grid */}
        <div className="relative overflow-hidden bg-obsidian p-4">
          <div className="grid h-full grid-cols-4 grid-rows-4 gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  background: `rgba(138, 156, 141, ${0.1 + (i % 4) * 0.15})`,
                }}
              />
            ))}
          </div>
          <span className="absolute bottom-2 left-3 text-[9px] tracking-widest text-sage/60 uppercase">
            Inference
          </span>
        </div>

        {/* Top-center: MRI-style scan */}
        <div className="relative overflow-hidden bg-charcoal">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full border border-sage/30 bg-gradient-to-br from-sage/20 to-transparent" />
            <div className="absolute h-14 w-14 rounded-full border border-sage/20" />
            <div className="absolute h-8 w-8 rounded-full bg-sage/10" />
          </div>
          <span className="absolute bottom-2 left-3 text-[9px] tracking-widest text-sage/60 uppercase">
            MRI Analysis
          </span>
        </div>

        {/* Top-right: dashboard fragment */}
        <div className="relative overflow-hidden bg-porcelain p-3">
          <div className="space-y-2">
            <div className="h-1.5 w-3/4 rounded bg-forest/20" />
            <div className="h-1.5 w-1/2 rounded bg-border-light" />
            <div className="mt-3 flex gap-1">
              {[40, 65, 30, 80, 55].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-forest/15"
                  style={{ height: `${h * 0.3}px` }}
                />
              ))}
            </div>
          </div>
          <span className="absolute bottom-2 left-3 text-[9px] tracking-widest text-stone uppercase">
            Dashboard
          </span>
        </div>

        {/* Middle-left: code architecture */}
        <div className="relative overflow-hidden bg-obsidian p-3 font-mono text-[8px] leading-relaxed text-sage/50">
          <div>model.train()</div>
          <div className="text-sage/30">→ validate()</div>
          <div className="text-sage/30">→ deploy()</div>
          <div className="mt-2 text-sage/40">epoch: 42</div>
          <span className="absolute bottom-2 left-3 text-[9px] tracking-widest text-sage/60 uppercase">
            Pipeline
          </span>
        </div>

        {/* Center: AI Quest card */}
        <div className="relative flex items-center justify-center overflow-hidden bg-accent-subtle">
          <div className="h-24 w-16 rotate-3 rounded-lg border border-border-light bg-porcelain shadow-sm">
            <div className="p-2">
              <div className="mb-2 h-1 w-full rounded bg-forest/30" />
              <div className="h-1 w-2/3 rounded bg-border-light" />
              <div className="mt-3 h-8 w-full rounded bg-forest/10" />
            </div>
          </div>
          <div className="-ml-4 h-24 w-16 -rotate-2 rounded-lg border border-border-light bg-porcelain shadow-sm">
            <div className="p-2">
              <div className="mb-2 h-1 w-full rounded bg-sage/40" />
              <div className="h-1 w-1/2 rounded bg-border-light" />
            </div>
          </div>
          <span className="absolute bottom-2 left-3 text-[9px] tracking-widest text-stone uppercase">
            AI Quest
          </span>
        </div>

        {/* Middle-right: neural topology */}
        <div className="relative overflow-hidden bg-charcoal p-3">
          <svg viewBox="0 0 100 80" className="h-full w-full opacity-60">
            {[
              [20, 20], [50, 15], [80, 25],
              [15, 50], [50, 45], [85, 55],
              [30, 70], [70, 68],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill="#8A9C8D" opacity="0.6" />
            ))}
            <line x1="20" y1="20" x2="50" y2="45" stroke="#8A9C8D" strokeWidth="0.5" opacity="0.3" />
            <line x1="50" y1="15" x2="50" y2="45" stroke="#8A9C8D" strokeWidth="0.5" opacity="0.3" />
            <line x1="80" y1="25" x2="50" y2="45" stroke="#8A9C8D" strokeWidth="0.5" opacity="0.3" />
            <line x1="15" y1="50" x2="30" y2="70" stroke="#8A9C8D" strokeWidth="0.5" opacity="0.3" />
            <line x1="50" y1="45" x2="70" y2="68" stroke="#8A9C8D" strokeWidth="0.5" opacity="0.3" />
          </svg>
          <span className="absolute bottom-2 left-3 text-[9px] tracking-widest text-sage/60 uppercase">
            Model
          </span>
        </div>

        {/* Bottom row */}
        <div className="relative overflow-hidden bg-porcelain p-3">
          <div className="flex items-end gap-1">
            {[25, 45, 35, 60, 40, 55].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-sage/25" style={{ height: `${h}px` }} />
            ))}
          </div>
          <span className="absolute bottom-2 left-3 text-[9px] tracking-widest text-stone uppercase">
            Analytics
          </span>
        </div>

        <div className="relative overflow-hidden bg-forest p-4">
          <p className="text-[11px] leading-snug font-medium text-ivory/90">
            Build. Train.
            <br />
            Deploy.
          </p>
          <span className="absolute bottom-2 left-3 text-[9px] tracking-widest text-ivory/40 uppercase">
            RimansTech
          </span>
        </div>

        <div className="relative overflow-hidden bg-porcelain p-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-square rounded border border-border-light bg-accent-subtle" />
            <div className="aspect-square rounded border border-border-light bg-forest/5" />
          </div>
          <span className="absolute bottom-2 left-3 text-[9px] tracking-widest text-stone uppercase">
            Platform
          </span>
        </div>
      </div>
    </div>
  );
}
