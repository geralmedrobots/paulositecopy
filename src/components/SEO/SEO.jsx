import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { metadataFor, siteOrigin } from "../../data/metadata";
// Update the existing head nodes, also emitted at build time for direct visits.
export default function SEO() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = metadataFor(
      pathname,
      siteOrigin(import.meta.env.VITE_SITE_URL),
    );
    document.title = meta.title;
    document.documentElement.lang = meta.language;
    const set = (selector, attribute, value) => {
      const node = document.head.querySelector(selector);
      if (node) node.setAttribute(attribute, value);
    };
    set('meta[name="description"]', "content", meta.description);
    set('link[rel="canonical"]', "href", meta.canonical);
    set('meta[property="og:title"]', "content", meta.title);
    set('meta[property="og:description"]', "content", meta.description);
    set('meta[property="og:url"]', "content", meta.canonical);
    set(
      'meta[property="og:locale"]',
      "content",
      meta.language === "pt" ? "pt_PT" : "en_GB",
    );
    set(
      'meta[name="robots"]',
      "content",
      meta.noindex ? "noindex,follow" : "index,follow",
    );
  }, [pathname]);
  return null;
}
