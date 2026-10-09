# QA und Evidenz

- **L0:** geplant oder geprüft, noch kein technischer Nachweis.
- **L1:** lokaler Build, Daten-/Output-Validator und `git diff --check` grün.
- **L2:** lokale Browser-/Accessibility-Prüfung grün.
- **L3:** Deploy Preview oder Production live geprüft.

`npm.cmd run check` ist das lokale Gate. `npm.cmd run check:production` prüft Produktionsdaten und ergänzt die Browsertests. Netlify verwendet `npm.cmd run check:deploy:production` für Produktionsdatenprüfung, Build, Syntax- und Output-Prüfung ohne lokale Browserabhängigkeit. Platzhalter und ungültige technische Daten blockieren weiterhin; die internen Freigabe-Flags blockieren nicht und bestätigen keine fachliche Prüfung der Rechtstexte. Der Output-Validator prüft jede HTML-Route auf genau ein `main`/H1, Metadaten, Canonical/Robots, Platzhaltermodus, interne Links, lokale Bilder und Dimensionen sowie parsebares JSON-LD. Er prüft außerdem Systemdateien und Formularmarkup.

Die Browser-Suite prüft Homepage, Kontakt/Formular, Service-Liste/-Detail, Content- und Rechtsseite in 390 und 1440 px, zusätzlich 320-px-Overflow, Tastatur/Fokus, mobile Navigation, Formularfehler/-bereitschaft ohne Versand, Erfolgsseite, Reduced Motion, 404-Status, ernsthafte/kritische Axe-Befunde sowie Request-/Console-/Browserfehler.

Vor Production ist L3 separat nötig: Canonical Host/HTTPS, Redirects, Security-Header, MIME, alle Routen, robots/Sitemap/Manifest, wichtige Medien und Netlify-Formularerkennung. Eine echte Testübermittlung erfolgt nur nach ausdrücklicher Erlaubnis.
