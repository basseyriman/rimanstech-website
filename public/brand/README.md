# RimansTech Brand Assets

Official logo files for print, digital and document use.

## Active site assets (in use)

These PNGs are wired into the live website.

| File | Use |
|------|-----|
| `rimanstech-wordmark-bold-light-transparent-clean.png` | Nav / UI wordmark — light mode (black, true alpha) |
| `rimanstech-wordmark-bold-dark-transparent-clean.png` | Nav / footer wordmark — dark mode (white, true alpha) |
| `rimanstech-monogram-hero-clean.png` | Homepage hero RT monogram |
| `rimanstech-monogram-premium.png` | Logo monogram variant |

Masters (opaque canvas) stay as `*-transparent.png`. Clean variants are generated with:

```bash
node scripts/process-wordmark-transparent.mjs
```

All other generation variants (50+ files) are kept in `archive/` for reference and can be restored if needed.
