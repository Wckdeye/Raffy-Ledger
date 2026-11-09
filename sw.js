// Raffy's Ledger service worker: lets the app open with no internet,
// and always picks up the newest version when there is internet.
const VERSION = "ledger-v13";
const SHELL = ["./", "./index.html", "./app.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
const APP_FILES = /\/(index\.html|app\.js|manifest\.webmanifest)?$/;

self.addEventListener("install", e => {
  // cache: "reload" skips the phone's HTTP cache so a new version never installs old files.
  e.waitUntil(caches.open(VERSION)
    .then(c => Promise.all(SHELL.map(u => fetch(new Request(u, {cache: "reload"})).then(r => { if (r.ok) return c.put(u, r); }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Network first (fresh files, bypassing the HTTP cache), saved copy if offline or slow.
function networkFirst(req, key) {
  return caches.open(VERSION).then(async cache => {
    const cached = await cache.match(key);
    const net = fetch(new Request(req.url, {cache: "no-cache", credentials: "same-origin"}))
      .then(res => { if (res.ok) cache.put(key, res.clone()); return res; });
    const timeout = new Promise(r => setTimeout(() => r(null), cached ? 3000 : 15000));
    try { const res = await Promise.race([net, timeout]); if (res) return res; } catch {}
    return cached || net;
  });
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!sameOrigin && !isFont) return;
  if (req.mode === "navigate") return e.respondWith(networkFirst(req, "./index.html"));
  if (sameOrigin && APP_FILES.test(url.pathname)) return e.respondWith(networkFirst(req, req));
  // Icons and fonts: saved copy right away, refreshed in the background.
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(req);
    const network = fetch(req).then(res => {
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    }).catch(() => cached);
    return cached || network;
  }));
});
