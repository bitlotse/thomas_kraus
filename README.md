# Agency Starter

Kundenneutraler Eleventy-Starter für individuelle Websites kleiner und mittlerer lokaler Unternehmen. Er liefert Architektur, Accessibility-, SEO-, QA- und Netlify-Grundlagen, aber bewusst keine fertige Kundenmarke und keine erfundenen Fakten.

## Schnellstart

Voraussetzung: Node.js 20 oder neuer.

```powershell
npm.cmd ci
npm.cmd run check
npm.cmd start
```

`check` baut und prüft die Website einschließlich der lokalen Browsertests. Vor einem Preview werden zuerst alle `TODO_CLIENT`-Werte in `src/_data/client.js` ersetzt und dann ausgeführt:

```powershell
npm.cmd run check:production
```

Dieser Production-Check prüft technische Daten, Canonical-Domain und die erzeugte Website. Die internen Flags `client.legal.approved` und `client.templateMode` blockieren den Build nicht. `templateMode` steuert weiterhin Robots und strukturierte Daten; für diese Website steht es auf `false`. Eine fachliche Prüfung der Rechtstexte wird durch einen erfolgreichen Build nicht bestätigt.

Netlify führt `npm ci && npm run check:deploy:production` aus: Produktionsdatenprüfung, Build, JavaScript-Syntaxprüfung und Output-Prüfung. `check:production` ergänzt lokal die Browsertests. Damit braucht der Netlify-Build keine zusätzliche Playwright-Browserinstallation.

## Neues Kundenprojekt starten

1. Repository in einen neuen Kundenordner kopieren, jedoch nie `node_modules`, `output`, `.git`, `.netlify` oder `.env` übernehmen.
2. Die vier Vorlagen in `briefs/` ausfüllen und Faktenfreigabe einholen.
3. `src/_data/client.js`, Navigation, Services und Seitenplan aus bestätigten Angaben anpassen.
4. Tokens in `src/css/tokens.css` und die Homepage-Komposition gestalten; keine bloße Umfärbung.
5. Seitenfamilien aufbauen, `npm.cmd run check` ausführen und nach Designfreigabe ein Deploy Preview vorbereiten.
6. Vor Veröffentlichung `npm.cmd run check:production` sowie die L3-Checkliste abarbeiten.

Vor dem ersten Production-Build werden Firmenname, vollständiges NAP, E-Mail, Telefon, reale Öffnungszeiten/Terminmodell, echtes Leistungsgebiet, Canonical-URL, Rechtsverantwortliche und freigegebene Social-/GBP-Links benötigt. Services und strukturierte Daten dürfen nur bestätigte Fakten enthalten.

## Architektur

- `src/_data/`: bestätigte Fakten und Inhaltsmodelle
- `src/_includes/layouts/`: Seitengerüste
- `src/_includes/partials/`: globale UI
- `src/_includes/sections/`: frei kombinierbare Seitenabschnitte
- `src/css/`: Tokens, globale, Komponenten-, Seitenfamilien- und Utility-Styles
- `scripts/`: Daten- und Output-Validator sowie lokaler Testserver
- `tests/browser/`: risikobasierte Browser-/Accessibility-Prüfung
- `briefs/`, `docs/`: Intake- und Arbeitsprozess

Automatisch geprüft werden Datenpflichten, Metadaten, Canonicals, Robots, H1/main, Links, lokale Assets, Bilddimensionen, JSON-LD und verbotene Identitätsreste auf allen HTML-Routen. Browserchecks decken repräsentative Seitenfamilien, 390/1440 px, 320-px-Overflow, Navigation, Fokus, Formularzustände, Reduced Motion, Axe sowie Console-/Request-Fehler ab.

Nur in Preview/Production belegbar sind HTTPS/Canonical-Host, Redirect-Verhalten des Hosts, reale Security-Header und MIME-Typen, Netlify-Formularerkennung, Live-Routen, robots/Sitemap/Manifest sowie externe Profile. Eine echte Formularsendung bleibt genehmigungspflichtig.

Siehe außerdem [Kundenworkflow](docs/customer-workflow.md), [Designsystem](docs/design-system.md), [Komponenten](docs/component-catalog.md), [Local SEO](docs/local-seo-workflow.md) und [QA/Evidenz](docs/qa-and-evidence.md).
