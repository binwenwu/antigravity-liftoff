#!/usr/bin/env node

import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 5173);

const MIME_TYPES = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath).replace(/^\/+/, "");
  const resolved = path.resolve(ROOT, decoded);
  return resolved.startsWith(ROOT) ? resolved : null;
}

async function fileStats(filePath) {
  try {
    const info = await stat(filePath);
    return info.isFile() ? info : null;
  } catch {
    return null;
  }
}

function sendFile(req, res, filePath, info) {
  const type = MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
  const range = req.headers.range;

  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (match) {
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Number(match[2]) : info.size - 1;
      if (start <= end && end < info.size) {
        res.writeHead(206, {
          "Accept-Ranges": "bytes",
          "Content-Length": end - start + 1,
          "Content-Range": `bytes ${start}-${end}/${info.size}`,
          "Content-Type": type,
        });
        createReadStream(filePath, { start, end }).pipe(res);
        return;
      }
    }
  }

  res.writeHead(200, {
    "Accept-Ranges": "bytes",
    "Content-Length": info.size,
    "Content-Type": type,
  });
  createReadStream(filePath).pipe(res);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "127.0.0.1"}`);

  if (url.pathname === "/docs/get-started") {
    res.writeHead(302, { Location: `/docs/getting-started${url.search}` });
    res.end();
    return;
  }

  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = safePath(requestedPath);
  const info = filePath ? await fileStats(filePath) : null;

  if (info) {
    sendFile(req, res, filePath, info);
    return;
  }

  if (url.pathname.startsWith("/assets/") || path.extname(url.pathname)) {
    console.log(`404 ${url.pathname}`);
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const indexPath = path.join(ROOT, "index.html");
  const indexInfo = await stat(indexPath);
  sendFile(req, res, indexPath, indexInfo);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Serving Google Antigravity replica at http://127.0.0.1:${PORT}/`);
});
