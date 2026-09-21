import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { getPageMetadata } from "../i18n/routes";

function setMeta(selector, attribute, value) {
  document.head.querySelector(selector)?.setAttribute(attribute, value);
}

function setLink(rel, href, hreflang) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.head.querySelector(selector);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    if (hreflang) link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  link.href = href;
}

function removeSeoLinks() {
  document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((link) => link.remove());
}

function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getPageMetadata(pathname);
    document.documentElement.lang = page.lang === "pt" ? "pt-PT" : "en";
    document.title = page.title;
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);

    if (!page.valid) {
      setMeta('meta[property="og:url"]', "content", "");
      removeSeoLinks();
      return;
    }

    let ogUrl = document.head.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", page.canonical);
    setLink("canonical", page.canonical);
    setLink("alternate", page.alternates.en, "en");
    setLink("alternate", page.alternates.pt, "pt-PT");
    setLink("alternate", page.alternates.default, "x-default");
  }, [pathname]);

  return <><Navbar /><main><Outlet /></main><Footer /></>;
}

export default MainLayout;
