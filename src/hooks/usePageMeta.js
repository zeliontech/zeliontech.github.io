import { useEffect } from "react";

// Per-route document metadata for a client-rendered site: the tab title, the
// meta description and the canonical URL follow the page the visitor is on.
// Crawlers that execute JavaScript pick these up; the static defaults in
// index.html remain for everything else. Values are restored on unmount so a
// page that sets nothing falls back to the defaults.

export const SITE_URL = "https://zeliontech.com";
export const SITE_NAME = "ZelionTech";

const ensureMeta = (name) => {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  return el;
};

const ensureLink = (rel) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  return el;
};

/**
 * @param {{ title: string, description?: string, path?: string }} meta
 *   title       full tab title, e.g. "ZEV, the Zelion Energy Validator | ZelionTech"
 *   description one or two sentences for the meta description
 *   path        canonical path ("/zev"); defaults to the current pathname
 */
export default function usePageMeta({ title, description, path }) {
  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const previousTitle = document.title;
    document.title = title;

    const descEl = ensureMeta("description");
    const previousDesc = descEl.getAttribute("content");
    if (description) descEl.setAttribute("content", description);

    const canonical = ensureLink("canonical");
    const previousHref = canonical.getAttribute("href");
    const pathname = path ?? window.location.pathname;
    canonical.setAttribute("href", SITE_URL + (pathname === "/" ? "/" : pathname.replace(/\/$/, "")));

    return () => {
      document.title = previousTitle;
      if (description && previousDesc !== null) descEl.setAttribute("content", previousDesc);
      if (previousHref) canonical.setAttribute("href", previousHref);
      else canonical.remove();
    };
  }, [title, description, path]);
}
