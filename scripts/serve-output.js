const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve("output");
const port = Number(process.env.PORT || 8080);
// Serve the local hero video with its media type during browser checks.
const types = { ".pdf": "application/pdf", ".webp": "image/webp", ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".webmanifest": "application/manifest+json; charset=utf-8" };
http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  let file = path.resolve(root, `.${pathname}`);
  if (!file.startsWith(root)) { response.writeHead(400); return response.end("Bad request"); }
  if (pathname.endsWith("/")) file = path.join(file, "index.html");
  if (!path.extname(file) && fs.existsSync(`${file}.html`)) file = `${file}.html`;
  let status = 200;
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { file = path.join(root, "404.html"); status = 404; }
  response.writeHead(status, { "Content-Type": path.extname(file) === ".mp4" ? "video/mp4" : types[path.extname(file)] || "application/octet-stream", "Content-Length": fs.statSync(file).size, "Cache-Control": "no-store" });
  fs.createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${port}`));

