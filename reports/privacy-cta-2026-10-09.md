# Datenschutz und Hero-CTA — 09.10.2026

- L0: Projektregeln, Datenquelle, Templates und Navigation geprüft. Kein Git-Repository vorhanden; daher kein Git-WIP-Vergleich möglich.
- L0: Sichtbaren Hinweis „Entwurf zur Prüfung vor Veröffentlichung“ aus dem Datenschutz-Template entfernt. Abschnitt 2 der Datenschutz-Datenquelle von IONOS auf Netlify umgestellt. Alle Inhalte außerhalb von Abschnitt 2 per Zeichenvergleich unverändert bestätigt, einschließlich bestehender Quellenangabe und Freigabevermerk am Textende.
- L0: Netlify-Text eigenständig formuliert anhand der offiziellen Datenschutzhinweise und des DPA vom 09.06.2026. Keine bestätigte Vertragsunterzeichnung, feste Log-Speicherdauer oder ausschließlich europäische Verarbeitung behauptet. Hosting-Angabe basiert auf Danis Vorgabe für den geplanten Betrieb.
- L0: Hero-CTA „Kontakt“ führt nun zu /kontakt/, „Leistungen“ zu /leistungen/. Bestehende Navigation und sonstige CTA-Ziele waren bereits korrekt.
- L1: npm.cmd run check erfolgreich im Template-Modus. Erzeugtes HTML zusätzlich auf beide CTA-Ziele, vorhandene Zielseiten, Netlify und Abwesenheit von IONOS/Entwurfsbanner geprüft.
- L2: 38 Browserprüfungen erfolgreich, einschließlich Datenschutz auf Desktop/Mobil und schmalen Ansichten. Keine neuen Screenshots erstellt.
- L3: Nicht veröffentlicht; kein Live-Nachweis. Bestehende fachliche Rechtsfreigabe und Produktionssperre wurden nicht geändert.

Quellen:
- https://www.netlify.com/pdf/netlify-dpa.pdf (Anbieteranschrift, Auftragsverarbeitung, Drittlandübermittlungen)
- https://www.netlify.com/gdpr-ccpa/ (Einbindung des DPA in Standardbedingungen)
- https://www.netlify.com/privacy/ (ergänzende Datenschutzhinweise)

Der erste Shell-Aufruf scheiterte am Sandbox-Setup. Die ausdrücklich freigegebenen Aufrufe außerhalb der Sandbox waren erfolgreich.
