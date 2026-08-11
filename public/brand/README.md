# RimansTech Brand Assets

Official logo files for print, digital and document use.

## Active site assets (in use)

These five PNGs are wired into the live website. Regenerate with the scripts in the project README.

| File | Use |
|------|-----|
| `rimanstech-wordmark-editorial-accent-nav-dark.png` | Nav wordmark — light mode |
| `rimanstech-wordmark-editorial-accent-nav-light.png` | Nav wordmark — dark mode |
| `rimanstech-monogram-hero-clean.png` | Homepage hero RT monogram |
| `rimanstech-monogram-launcher-icon.png` | AI chat launcher button |
| `rimanstech-monogram-premium.png` | Logo monogram variant |

All other generation variants (50+ files) are kept in `archive/` for reference and can be restored if needed.

---

## Full brand library (archived variants)

The sections below document the complete variant library. Most files now live under `archive/`.

Regenerate active assets:

```bash
node scripts/process-editorial-wordmarks.mjs   # Nav wordmarks
node scripts/process-launcher-monogram.mjs     # Chat launcher
node scripts/process-hero-monogram.mjs         # Hero monogram
```

## Wordmark structure

```
RIMANS          |  INDUSTRIES
TECH
```

- **RIMANS** — Carbon Black `#101110`
- **TECH** — Deep Forest `#183C32`
- **INDUSTRIES** — Graphite `#50534F`

## Clear space

Maintain clear space equal to the height of the letter "T" in TECH on all sides.

## Minimum sizes

- Wordmark: 120px wide (digital), 30mm wide (print)
- Monogram: 32px (digital), 8mm (print)

## Do not

- Stretch or distort proportions
- Change brand colours
- Add effects, shadows or gradients
- Place on busy backgrounds without sufficient contrast
