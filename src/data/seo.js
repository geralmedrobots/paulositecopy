import content from "./content.json" with { type: "json" };
import { site, ui } from "./site.js";
import { resolveRoute, pagePath } from "./routes.js";
const incomplete = new Set([
  "/pt/",
  "/pt/ultrabot",
  "/pt/genderequality",
  "/projeto",
]);
export const isIncomplete = (path) => incomplete.has(path);
const fallbackSocialImage = "/assets/home-2.webp";
export const socialImages = {
  home: fallbackSocialImage,
  ultrabot: "/assets/ultrabot-2.webp",
  benefits: "/assets/benefits-0.webp",
  "healthcare-industry-1": "/assets/healthcare-industry-1-0.webp",
  thecompany: "/assets/thecompany-0.webp",
  recruitment: "/assets/copy-of-the-company-0.webp",
  contacts: "/assets/contacts-0.webp",
};
export function getSEO(url) {
  const route = resolveRoute(url);
  const data = content[route.lang][route.id];
  const indexable = route.found && !incomplete.has(route.path);
  const title =
    route.id === "home"
      ? data.lead
      : route.id === "ultrabot"
        ? "UltraBot"
        : data?.title || ui[route.lang].missing;
  const summary =
    route.id === "genderequality" && route.lang === "pt"
      ? `Conteúdo original em inglês. ${data.description}`
      : route.id === "home"
        ? data.lead
        : route.id === "projeto" && route.lang === "pt"
          ? data.originalPt[1]
          : data?.description || ui[route.lang].missingHelp;
  return {
    title: `${title} | ${site.name}${route.lang === "pt" ? " — PT" : ""}`,
    description: data ? `${data.title} — ${summary}` : summary,
    canonical: site.origin + route.path,
    lang: route.lang,
    robots: indexable ? "index, follow" : "noindex, follow",
    alternates:
      indexable &&
      !incomplete.has(pagePath(route.id, route.lang === "pt" ? "en" : "pt"))
        ? ["en", "pt"].map((lang) => ({
            lang,
            href: site.origin + pagePath(route.id, lang),
          }))
        : [],
    image: site.origin + (socialImages[route.id] || fallbackSocialImage),
  };
}
export function applySEO(url) {
  const meta = getSEO(url);
  document.documentElement.lang = meta.lang;
  document.title = meta.title;
  const tags = [
    ["name", "description", meta.description],
    ["name", "robots", meta.robots],
    ["property", "og:title", meta.title],
    ["property", "og:description", meta.description],
    ["property", "og:url", meta.canonical],
    ["property", "og:type", "website"],
    ["property", "og:image", meta.image],
    ["property", "og:locale", meta.lang === "pt" ? "pt_PT" : "en_GB"],
  ];
  for (const [attribute, key, value] of tags) {
    let node = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attribute, key);
      document.head.append(node);
    }
    node.content = value;
  }
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.append(link);
  }
  link.href = meta.canonical;
}
