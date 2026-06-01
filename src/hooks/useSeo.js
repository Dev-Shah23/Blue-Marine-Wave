import { useEffect } from "react";

/**
 * Dependency-free per-route SEO. Sets the document title and upserts the meta
 * description, canonical link, and OpenGraph tags so each route has its own
 * metadata (the static index.html only carries the homepage's).
 *
 * NOTE: this is client-side metadata. It fixes per-route titles/sharing, but
 * because the app is a client-rendered SPA, crawlers that don't execute JS still
 * see the empty shell. The real SEO win is prerendering/SSG (react-snap, or a
 * migration to a framework with SSG) — tracked as a follow-up.
 *
 *   useSeo({ title, description, canonical, image });
 */
const SITE = "https://bluewavemarine.in";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  if (!href) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo({ title, description, canonical, image } = {}) {
  useEffect(() => {
    if (title) document.title = title;
    const url = canonical ? (canonical.startsWith("http") ? canonical : SITE + canonical) : undefined;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    if (image) upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertCanonical(url);
  }, [title, description, canonical, image]);
}

export default useSeo;
