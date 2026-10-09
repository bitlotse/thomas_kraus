# Abschlussreport — Agency Starter 1.0.0

## Ergebnis

Neu aufgebaut wurde ein kundenneutraler Eleventy-Starter mit getrennten Daten-, Layout-, Komponenten-, Seiten- und Style-Schichten; zugänglicher Navigation/Form; responsiver Homepage und fünf repräsentativen Seitenfamilien; SEO/OG/Canonical/JSON-LD; Systemdateien; strengem Production-Daten-Gate; risikobasiertem Output- und Browser-QA; Briefings und K-00–K-05-Dokumentation.

Aus dem geprüften Referenzprojekt übernommen wurden nur bewährte Prinzipien: Eleventy-Output `output`, zentrale Daten, semantische Includes, getrennte Styles, sichtbarer Fokus/Reduced Motion, Validator/Playwright-Gates sowie GitHub-/Netlify-taugliche Build-Skripte. Nicht übernommen wurden Identität, Texte, Claims, Kundendaten, Rechtstexte, Preise, Referenzen, Testimonials, Medien, Standort-/Routenannahmen, Analytics-/Hosting-Verknüpfungen oder Alt-Reports.

## Start und Pflichtangaben

Briefs ausfüllen, bestätigte Daten in `src/_data/client.js` sowie Services/Navigation einsetzen, Tokens und Homepage eigenständig gestalten. `npm.cmd ci`, dann `npm.cmd run check`. Vor Preview müssen Firmenname, NAP, Kontakt, Öffnungszeiten/Terminmodell, Leistungsgebiet, Leistungen, Domain, Rechtsverantwortung und Rechte geklärt sein; dann `npm.cmd run check:production`.

Automatisch laufen Build, JS-Prüfung, Daten-/Platzhalter-Gate, routeweiter Output-Validator sowie repräsentative Browser-/A11y-Tests. Host-Redirects, Live-Header/MIME, Netlify-Formularerkennung, Search Console und GBP sind erst L3. Echte Formularsendung und Deployment bleiben freigabepflichtig.

Bewusst später: projektspezifische Bildpipeline, Webfonts, Video, CMS, Analytics/Consent, zusätzliche Seitenfamilien und feste visuelle Regressionen – jeweils erst bei echtem Kundenbedarf.
