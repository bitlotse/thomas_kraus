# Seitenaufbau und Hero-Korrektur – 25.09.2026

## Umsetzung
- Header jetzt 65 px am Desktop und 61 px mobil, inklusive Rahmen. Logo und Navigationsabstände reduziert.
- Hero berücksichtigt die tatsächliche Headerhöhe (ResizeObserver mit CSS-Fallback). Header und Hero ergeben zusammen 100 dvh; 100 vh dient als Fallback. Bei außergewöhnlich kleinen Höhen oder vergrößerter Schrift darf der Inhalt wachsen, statt abgeschnitten zu werden.
- Akkreditierung auf der Homepage: Text mit drei direkt nutzbaren PDF-Zeilen statt dekorativer großer Urkunde. Dezente Bewegungen bei Hover/Fokus, Reduced Motion berücksichtigt.
- Homepage-Fußzeile: „Diese Website wurde von Webvolley erstellt.“ mit normalem Link auf https://www.webvolley.de/.
- Leistungen, Akkreditierung, Kontakt, Impressum und Datenschutz im gemeinsamen Thomas-Kraus-Layout aufgebaut. Navigation entspricht der Originalseite.
- Fachtexte der Leistungen und Akkreditierung sowie Kontakttexte weitgehend wortgleich aus der Originalwebsite übernommen; Impressum aus dem bestehenden Kundenauftritt übernommen. Keine unabhängige rechtliche Freigabe.
- Bereits bestehende Zusatzrouten /ueber-uns/, /einblicke/, /leistungen/musterleistung/ und /kontakt/erfolg/ erhalten, mit belegten Inhalten aus dem Kundenauftritt gefüllt und nicht in die Hauptnavigation aufgenommen. Die alte Musterleistungs-URL ist bewusst nicht ohne gesonderte Routenfreigabe umbenannt worden.
- Kontakt wie das Original ohne Formular, mit Telefon und E-Mail. Kein Versanddienst eingerichtet. Die alte Erfolgsroute behauptet keinen erfolgten Versand mehr.
- Kundendaten in src/_data; lokale PDFs unter src/assets/documents. Gemeinsame Includes für Dokumentlinks und Kontaktabschluss.

## Quellen
Am 25.09.2026 gelesen: https://probenahme-bayern.de/ sowie /leistungen/, /akkreditierung/, /kontakt/, /impressum/, /datenschutz/.
Quell-Snapshots liegen in reports/original. Die drei vom Nutzer gelieferten PDFs wurden unverändert kopiert, Hashes stehen in reports/pdf-integrity.json. Die Urkunde umfasst Deckblatt und Rückseite, nicht die erwähnte Anlage; Linktitel deshalb Akkreditierungsurkunde, nicht vollständiger Geltungsbereich. Die LGL-Liste bleibt vollständig (129 Seiten).

## Datenschutz und Betrieb
Dani bestätigt IONOS ohne Tracking. IONOS WebAnalytics und WP Statistics wurden aus dem Datenschutzentwurf entfernt; keine entsprechenden Skripte eingebaut. Kein Kontaktformular, keine externen Fonts und keine durch den Build gesetzten Cookies oder Browser-Speicher. Der Hostingvertrag/AVV und die endgültigen Servereinstellungen müssen fachlich bestätigt werden. Original-Rechtstexte wurden nur für diesen Kundenauftritt als Grundlage verwendet; keine allgemeine Freigabe behauptet. client.legal.approved bleibt false, templateMode bleibt true, alle Seiten bleiben noindex. Bestehende Netlify-Konfiguration ist keine Aussage über das freigegebene Hosting; es wurde nichts dort eingerichtet oder veröffentlicht.

## Nachweise
- L0: Quellen, lokale PDF-Inhalte, Architektur und bestehende Dateien geprüft. Kein Git-Repository in diesem Ordner; WIP lässt sich deshalb nicht per Git abgrenzen.
- L1: PORT=8194 npm.cmd run check erfolgreich: Build, JS-Syntax, Daten- und Outputprüfung. git diff --check nicht verfügbar.
- L2: 36 Browserprüfungen bestanden, darunter zehn Routen auf Desktop und Mobile, Tastatur, Reduced Motion, PDF-Inhalt/MIME, Tracking-/Speicherprüfung und 320-px-Overflow. Header+Hero bei 1440x900, 1920x1080, 1366x768, 1024x768, 768x1024, 390x844 und 320x760 geprüft; untere Hero-Kante entspricht der Viewporthöhe. Zusätzliche No-JS-Navigation sichtbar. Screenshots: reports/*-v2.png. Messwerte: reports/site-browser-metrics.json.
- L3: Nicht veröffentlicht, keine Live-Prüfung des neuen Builds. Production-Gate bleibt wegen ausstehender Freigabe gesperrt.

Lokale Review-Adresse dieser Sitzung: http://127.0.0.1:8195/
