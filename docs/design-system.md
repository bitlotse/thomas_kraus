# Designsystem

`tokens.css` definiert Farbe, Typografie, Abstände, Radien, Schatten und Motion. `global.css` besitzt Elemente und globale Shells, `components.css` wiederverwendbare UI, `pages.css` Seitenfamilien/Kompositionen und `utilities.css` ausschließlich kleine Hilfen.

Die gelieferten Tokens sind ein ruhiger neutraler Ausgangspunkt, keine Kundenmarke. Pro Projekt werden Markenwirkung, Typografie, Kontrast und Bildsprache bewusst neu entschieden. Systemfonts sind Standard; Webfonts nur mit Lizenz-, Performance- und Datenschutzentscheidung.

Mobile-first bedeutet: Inhalt und Bedienung funktionieren zuerst bei 320–390 px, größere Layouts erweitern ab inhaltlich sinnvollen Breakpoints. Alle interaktiven Elemente brauchen sichtbaren `:focus-visible`; Bewegung muss einen Zweck haben und unter `prefers-reduced-motion` entfallen.

Bilder erhalten sinnvollen Alt-Text (oder leeren Alt-Text bei Dekoration), intrinsische `width`/`height`, passende Formate und Lazy Loading außerhalb des ersten Viewports. Video ist optional und benötigt mindestens Poster, stumme/autoplay-sichere Konfiguration, Controls falls inhaltlich sowie einen No-JS-Fallback.
