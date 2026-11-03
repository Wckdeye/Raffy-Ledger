// Raffy's Ledger service worker: lets the app open with no internet.
const VERSION = "ledger-v7";
const SHELL = ["./", "./index.html", "./app.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!sameOrigin && !isFont) return;
  if (req.mode === "navigate") {
    // Page loads: try the network briefly so updates show when online, fall back to the saved copy offline.
    e.respondWith(caches.open(VERSION).then(async cache => {
      const cached = await cache.match("./index.html");
      const net = fetch(req).then(res => { if (res.ok) cache.put("./index.html", res.clone()); return res; });
      const timeout = new Promise(r => setTimeout(() => r(null), 3000));
      try { const res = await Promise.race([net, timeout]); if (res) return res; } catch {}
      return cached || net;
    }));
    return;
  }
  // Everything else: serve from cache right away, refresh the cache in the background.
  e.respondWith(caches.open(VERSION).then(async cache => {
    const key = req.mode === "navigate" ? "./index.html" : req;
    const cached = await cache.match(key);
    const network = fetch(req).then(res => {
      if (res && (res.ok || res.type === "opaque")) cache.put(key, res.clone());
      return res;
    }).catch(() => cached);
    return cached || network;
  }));
});
