# Dauerhafte Projektregeln

- Vor Änderungen Architektur, Git-Status und bestehende WIP-Arbeit prüfen.
- Vorhandene Komponenten und Design-Tokens wiederverwenden; keine Komponentenbibliothek auf Vorrat bauen.
- Kundendaten und Inhalte in `src/_data` beziehungsweise Seiten-Frontmatter halten, Präsentation in Includes und CSS.
- Mobile-first und progressiv verbessern. Tastatur, Fokus, Reduced Motion und No-JS immer mitdenken.
- Niemals Kundenfakten, Preise, Ergebnisse, Bewertungen, Rechte oder SEO-Daten erfinden.
- Keine fremden Rechtsinhalte übernehmen. Rechtstext-Platzhalter brauchen fachliche Freigabe.
- Route, Canonical Host oder wesentlichen Scope nur nach Freigabe ändern.
- Unter Windows `npm.cmd` verwenden.
- L0/L1/L2/L3 getrennt dokumentieren; ein lokaler Erfolg ist kein Live-Nachweis.
- Keine externen Aktionen, Deployments, Formularsendungen oder Produktionsverknüpfungen ohne Danis Freigabe.
- `npm.cmd run check` ist das lokale Gate. `npm.cmd run check:production` muss vor Preview/Production mit echten Daten grün sein.
