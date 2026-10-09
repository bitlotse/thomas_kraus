# Homepage refinement — 2026-09-25

- Hero: min-height 100vh; desktop 900px at a 900px viewport. Header is additional. Content can grow on narrow screens (853px at 390x844, 859px at 320x760).
- Three credentials: SVG checkmarks, distinct heading/detail hierarchy, consistent spacing and separators.
- Accreditation: responsive two-column layout, large document illustration, separate standard label. Removed the existing circular link which claimed documents were available but linked to itself. No certificate destination was supplied.
- Icons: subtle hover motion for credentials, services, document and menu; menu also responds to keyboard focus/open state. Reduced Motion disables these transforms.
- Local server and Playwright accept PORT while retaining 8080 as default, to avoid an occupied port.

## Font audit
Homepage uses Segoe UI, Arial, sans-serif as a CSS system-font stack. No font files, @font-face or Google Fonts requests were found in src. These are not open-source fonts, but the present CSS-only use is expressly permitted by Microsoft, without a separate webfont licence. Do not extract, convert or self-host their font files under this permission.
Source checked 2026-09-25: https://learn.microsoft.com/en-us/typography/fonts/font-faq (Web section).
This does not guarantee against future legal issues. The typeface/licensing provenance of text baked into the supplied logo image cannot be established from that raster file.

## Evidence
- L0: existing architecture and source inspected; this folder is not a Git repository, so no Git WIP/diff verification was possible. Existing business claims were not independently verified.
- L1: build, JS syntax, data and output validation passed in template mode. git diff --check unavailable without repository metadata.
- L2: PORT=8191 npm.cmd run check passed, 22/22 tests. Additional desktop/390px/320px captures show zero horizontal overflow; no-JS navigation visible; reduced-motion service icon transform is none. Screenshots in reports/homepage-*.png.
- L3: no deployment or live verification. Production remains blocked by existing incomplete customer/template data.
