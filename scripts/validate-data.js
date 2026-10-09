const client = require("../src/_data/client");
const site = require("../src/_data/site");
const services = require("../src/_data/services");

const production = process.argv.includes("--production") || process.env.BUILD_CONTEXT === "production";
const issues = [];
const containsPlaceholder = (value) => typeof value === "string" && /TODO_CLIENT|Muster|example\.invalid|00000|000000/.test(value);
const walk = (value, path = "client") => {
  if (typeof value === "string" && containsPlaceholder(value)) issues.push(`${path}: ${value}`);
  if (Array.isArray(value)) value.forEach((item, index) => walk(item, `${path}[${index}]`));
  if (value && typeof value === "object" && !Array.isArray(value)) Object.entries(value).forEach(([key, item]) => walk(item, `${path}.${key}`));
};

walk(client);
walk(services, "services");
if (!/^https:\/\/[^/]+/.test(site.url) || site.url.includes("example.invalid")) issues.push("site.url braucht die echte HTTPS-Canonical-Domain");
if (!client.contact.email.includes("@") || client.contact.email.endsWith(".invalid")) issues.push("client.contact.email ist nicht produktionsfähig");
if (!client.profiles || !Array.isArray(client.profiles.social)) issues.push("client.profiles.social muss ein Array sein");

if (issues.length && production) {
  console.error("Production-Datenprüfung fehlgeschlagen:\n- " + [...new Set(issues)].join("\n- "));
  process.exit(1);
}
if (issues.length) console.warn(`Template-Modus: ${new Set(issues).size} bewusst offene Kundenangaben erkannt. Production-Gate bleibt gesperrt.`);
console.log(`Datenprüfung bestanden (${production ? "Production" : "Template"}-Modus).`);
