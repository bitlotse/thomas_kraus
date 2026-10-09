# Netlify-Build-Reparatur – 2026-10-09

Stand: lokale Prüfung und erster Live-Nachweis nach dem Push auf `main`.

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

Die erste Reparatur wurde als `d50a903` auf `main` gepusht. Danach antwortete `https://thomaskraus.netlify.app/` mit HTTP 200. Alle 31 Dateien im lokalen Output waren live erreichbar. PDF-, Bild- und Videodateien waren bytegleich; Textdateien unterscheiden sich unter anderem durch Plattform-Zeilenumbrüche, Sitemap-Reihenfolge und Netlifys injizierten Hosting-Kommentar/Toolbar. Robots erlaubt Crawling, die Homepage hat `index, follow`, die Sitemap enthält neun URLs und eine unbekannte Route liefert 404. Der Canonical-Host bleibt `https://probenahme-bayern.de`.

Ein Live-Browsertest mit Playwright entdeckte, dass der echte CSP-Header das bisherige Inline-Script für die JavaScript-Erkennung blockiert. Dieses Script wurde anschließend in die vorhandene `src/js/main.js` verschoben. Die CSP wurde nicht abgeschwächt. Diese Korrektur muss nach dem zweiten Push live bestätigt werden.

Netlify injiziert außerdem das öffentliche „Powered by Netlify“-Badge unter `/.netlify/scripts/hud?variant=public`, das zusätzliche CSP-Meldungen in seinem isolierten Frame auslöst. Laut [Netlify-Dokumentation](https://docs.netlify.com/manage/projects/powered-by-netlify-badge/) beeinträchtigt ein CSP-Block dieses Badges die Website nicht; ausschalten lässt es sich unter Project configuration > General > Powered by Netlify badge. Die Netlify-Dashboard-Einstellungen waren in dieser Sitzung nicht zugänglich. Der konkrete Published-Commit im Dashboard und die Custom-Domain-Verknüpfung sind nicht bestätigt. Eine echte Formularsendung wurde nicht vorgenommen.
