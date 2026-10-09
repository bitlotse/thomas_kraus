const fs = require("node:fs");
const path = require("node:path");
const { imageSize } = require("image-size");

const root = path.resolve("output");
const production = process.env.BUILD_CONTEXT === "production";
const errors = [];
const warnings = [];
const htmlFiles = [];
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
  const full = path.join(dir, entry.name);
  if (entry.isDirectory()) walk(full);
  else if (entry.name.endsWith(".html")) htmlFiles.push(full);
});
if (!fs.existsSync(root)) throw new Error("output fehlt. Zuerst den Build ausführen.");
walk(root);

const count = (html, regex) => (html.match(regex) || []).length;
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}=["']([^"']+)["']`, "i")) || [])[1];
const routeFor = (file) => {
  const relative = path.relative(root, file).replace(/\\/g, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -10)}`;
  return `/${relative}`;
};
const resolvesInternal = (href) => {
  const pathname = href.split(/[?#]/)[0];
  if (!pathname || pathname.startsWith("mailto:") || pathname.startsWith("tel:") || pathname.startsWith("http")) return true;
  const clean = decodeURIComponent(pathname);
  const candidate = clean.endsWith("/") ? path.join(root, clean, "index.html") : path.join(root, clean);
  const fallback = path.join(root, clean, "index.html");
  return fs.existsSync(candidate) || fs.existsSync(fallback);
};

for (const file of htmlFiles) {
  const route = routeFor(file);
  const html = fs.readFileSync(file, "utf8");
  if (count(html, /<main\b/gi) !== 1) errors.push(`${route}: genau ein main erforderlich`);
  if (count(html, /<h1\b/gi) !== 1) errors.push(`${route}: genau ein H1 erforderlich`);
  if (!/<title>[^<]{8,}<\/title>/i.test(html)) errors.push(`${route}: Title fehlt/zu kurz`);
  if (!/<meta\s+name=["']description["']\s+content=["'][^"']{50,}["']/i.test(html)) errors.push(`${route}: Description fehlt/zu kurz`);
  if (!/<link\s+rel=["']canonical["']\s+href=["']https:\/\/[^"']+["']/i.test(html)) errors.push(`${route}: HTTPS-Canonical fehlt`);
  if (!/<meta\s+name=["']robots["']\s+content=["'][^"']+["']/i.test(html)) errors.push(`${route}: Robots-Meta fehlt`);
  const placeholders = html.match(/TODO_CLIENT|example\.invalid|Musterunternehmen|00000/g) || [];
  if (placeholders.length) (production ? errors : warnings).push(`${route}: ${placeholders.length} Template-Platzhalter`);
  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${route}: JSON-LD nicht parsebar (${error.message})`); }
  }
  if (!/type=["']application\/ld\+json["']/.test(html)) errors.push(`${route}: JSON-LD fehlt`);
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) if (!resolvesInternal(match[1])) errors.push(`${route}: interner Link fehlt: ${match[1]}`);
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = attr(tag, "src");
    if (!src || !attr(tag, "width") || !attr(tag, "height")) errors.push(`${route}: Bild ohne src/width/height`);
    if (src && src.startsWith("/")) {
      const imagePath = path.join(root, src);
      if (!fs.existsSync(imagePath)) errors.push(`${route}: Bild fehlt: ${src}`);
      else {
        const dimensions = imageSize(fs.readFileSync(imagePath));
        const declaredWidth = Number(attr(tag, "width"));
        const declaredHeight = Number(attr(tag, "height"));
        if (dimensions.width !== declaredWidth || dimensions.height !== declaredHeight) errors.push(`${route}: falsche Bilddimensionen für ${src} (${declaredWidth}x${declaredHeight}, Datei ${dimensions.width}x${dimensions.height})`);
      }
    }
    if (!/\salt=["'][^"']*["']/i.test(tag)) errors.push(`${route}: Bild ohne alt`);
  }
}

const required = ["robots.txt", "sitemap.xml", "site.webmanifest", "404.html"];
required.forEach((name) => { if (!fs.existsSync(path.join(root, name))) errors.push(`Systemdatei fehlt: ${name}`); });
const contact = fs.readFileSync(path.join(root, "kontakt", "index.html"), "utf8");
if (!contact.includes('mailto:kraus@probenahme-bayern.de') || !contact.includes('tel:+4986561625')) errors.push("Kontakt: Telefon- oder E-Mail-Link fehlt");
if (/<form\b/i.test(contact)) errors.push("Kontakt soll wie die Originalseite ohne Formular auskommen");
const allSource = fs.readdirSync("src", { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => fs.readFileSync(path.join(entry.parentPath || entry.path, entry.name), "utf8")).join("\n");
for (const forbidden of ["websolut"]) if (allSource.toLowerCase().includes(forbidden)) errors.push(`Verbotener Referenzrest in src: ${forbidden}`);

if (warnings.length) console.warn(`Template-Hinweise (${warnings.length}):\n- ${warnings.join("\n- ")}`);
if (errors.length) { console.error(`Output-Prüfung fehlgeschlagen (${errors.length}):\n- ${errors.join("\n- ")}`); process.exit(1); }
console.log(`Output-Prüfung bestanden: ${htmlFiles.length} HTML-Routen, Links, Metadaten, Assets, JSON-LD und Formularstruktur.`);
