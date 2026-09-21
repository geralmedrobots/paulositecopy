import { useLocation } from "react-router-dom";
import { content } from "./translations";

export const isPortuguesePath = (pathname) => pathname === "/pt" || pathname.startsWith("/pt/");

export const localizePath = (path, lang) => {
  const base = path === "/" ? "" : path;
  return lang === "pt" ? (base ? `/pt${base}` : "/pt") : path;
};

export const equivalentPath = (pathname, targetLang) => {
  const base = isPortuguesePath(pathname) ? pathname.slice(3) || "/" : pathname;
  return localizePath(base, targetLang);
};

export function useI18n() {
  const { pathname } = useLocation();
  const lang = isPortuguesePath(pathname) ? "pt" : "en";
  return { lang, t: content[lang], path: (value) => localizePath(value, lang), pathname };
}
