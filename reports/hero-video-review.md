# Hero adjustment — 2026-09-25

## Current result: full first-screen hero restored

- L0: Removed the earlier 94dvh exception described below. Header plus hero now targets 100dvh on every layout. Desktop windows up to 750px high use tighter internal spacing, smaller headings and a video height cap. Content may grow for extreme window sizes or enlarged text instead of being clipped. No Git repository is available in this folder.
- L1: npm.cmd run check passed in template mode; production data gaps are unchanged.
- L2: All 38 tests passed. The height regression now requires the hero bottom to match the viewport and all hero grid content to fit in 18 viewport sizes, including 864x600, 1024x600, 1280x600, 1366x768, 1536x864, 1920x1080 and 2560x1440, plus mobile sizes. Visually inspected reports/hero-fit-1280x600.png, reports/hero-fit-864x600.png and reports/hero-fit-1920x1080.png.
- L2: Initial run had one aborted duplicate media request despite successful playback. Trace showed the local server returned the video without Content-Length; added the known file size to responses. The subsequent complete gate passed. This does not prove the intermittent issue can never recur.
- L3: No deployment or live verification performed.

## Earlier changes (superseded where noted above)

- L0: Inspected Eleventy templates, existing CSS, scripts, assets and tests. This folder is not a Git repository; Git WIP comparison is unavailable. Reused the supplied local hero_video.mp4 and existing image as its poster.
- L0: For mouse/trackpad layouts 864–1600 CSS pixels wide and at most 900 pixels high, header plus hero now targets 94dvh instead of 100dvh. Other layouts retain the previous height. Content can still grow on unusually short screens or with enlarged text.
- L1: npm.cmd run check passed, including build, JavaScript syntax, data and output validation. Validation ran in template mode; two existing customer-data gaps still block production validation.
- L2: All 38 Playwright tests passed. Coverage includes nine viewport sizes, muted video playback, pause/resume, reduced-motion changes and reduced-motion initial load. Reviewed desktop and mobile screenshots; capture measurements show no horizontal overflow at 1440, 390 and 320 pixels. No-JS navigation checked. The video retains a static poster without JavaScript.
- L3: No deployment, production check or live-site verification performed.

Browser launch was blocked by the sandbox on the initial test run; the elevated local rerun passed.

## Pause icon follow-up

- L0: Replaced the visible text with pause/play SVG icons in the existing button. The German accessible label changes with playback state; the control retains a 44px target and keyboard focus styling.
- L1: npm.cmd run check passed on rerun without further source changes.
- L2: All 38 existing browser tests passed on rerun, including accessible button names, pause/resume and reduced motion. The first run reported interrupted video requests in two homepage tests while playback tests passed; the interruptions did not recur. Earlier screenshots above predate the icon change.
- L3: Not deployed or verified live.

## Subtle control styling follow-up

- L0: Reduced the icon to 12px on a 24px translucent navy circle, replacing the solid white square. Retained the invisible 44px hit area, accessible labels and keyboard focus. Hover/focus strengthens the circle background.
- L1: npm.cmd run check passed.
- L2: All 38 existing browser tests passed. No new visual screenshots captured for this CSS-only refinement.
- L3: Not deployed or verified live.
