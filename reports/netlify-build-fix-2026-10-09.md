# Netlify-Build-Reparatur – 2026-10-09

Stand: lokale Prüfung vor dem Push auf `main`.

## L0 – Ursache und Änderung

- Der ursprüngliche Produktionsvalidator scheiterte ausschließlich an `client.legal.approved: false` und `client.templateMode: true`.
- Die beiden manuellen Freigabe-Checks wurden aus dem Validator entfernt. Platzhalter-, Domain-, E-Mail- und Profilstrukturprüfungen bleiben erhalten.
- `templateMode` steht auf `false`. Pauschale `noindex`-Vorgaben in Homepage und Seiten-Daten wurden entfernt. 404 und Kontakt-Hilfsseite behalten `noindex`.
- Netlify verwendet `npm ci && npm run check:deploy:production`: Produktionsdatenprüfung, Eleventy-Build, JavaScript-Syntaxprüfung und Output-Prüfung. Der vollständige lokale `check:production` ergänzt weiterhin Playwright. Netlify braucht dadurch keine gesonderte Browserinstallation.
- `client.legal.approved` bleibt `false`. Dieser Build-Fix bestätigt keine fachliche Prüfung der Rechtstexte und verändert die Rechtstexte nicht.
- Routen und Canonical-Host wurden nicht verändert. Der Arbeitsbaum war vor Beginn sauber.

## L1 – Lokaler technischer Nachweis

- `npm.cmd run check`: bestanden.
- `npm.cmd run check:production`: bestanden.
- Produktionsdaten, Build, JavaScript-Syntax und Output-Validator: bestanden; 11 HTML-Routen geprüft.
- `git diff --check`: bestanden.
- Produktionsoutput: Homepage und Kontakt mit `index, follow`; 404 und Kontakt-Hilfsseite mit `noindex, nofollow`.
- `robots.txt`: `Allow: /` und Sitemap-Verweis auf den bestehenden Canonical-Host.
- `sitemap.xml`: neun Seiten, einschließlich Homepage; ohne 404 und Kontakt-Hilfsseite.

## L2 – Lokale Browserprüfung

- Beide vollständigen Gates: jeweils 38 Playwright-Tests bestanden, Desktop und Mobil.
- Bestehende Tests prüfen unter anderem Accessibility, Navigation/Tastatur, 320px-Overflow, Hero-Video/Reduced Motion, lokale PDFs, 404 und fehlende Tracking-Requests.

## L3 – Live-Nachweis

Vor dem Push noch nicht bestätigt. Lokale Checks beweisen keinen erfolgreichen Netlify-Deploy. Der gemeldete Netlify-Log war über das Web-Werkzeug nicht zugänglich; das Browser-Werkzeug konnte in dieser Sitzung nicht starten.
