import { jobs } from "./site.js";
export const pageIds = [
  "home",
  "ultrabot",
  "benefits",
  "healthcare-industry-1",
  "thecompany",
  "recruitment",
  "projeto",
  "contacts",
  "faq",
  "privacy",
  "cookies",
  "genderequality",
  ...jobs,
];
export const aliases = {
  "/copy-of-home": "home",
  "/copy-of-ultrabot": "ultrabot",
  "/copy-of-the-company": "recruitment",
  "/portugal2030": "projeto",
  "/index.html": "home",
};
export function pagePath(id, lang = "en") {
  return `${lang === "pt" ? "/pt" : ""}/${id === "home" ? "" : id}`;
}
export function resolveRoute(input) {
  const url = new URL(input, "https://www.medrobots.pt");
  const clean = url.pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  const lang =
    clean === "/pt" ||
    clean.startsWith("/pt/") ||
    url.searchParams.get("lang") === "pt"
      ? "pt"
      : "en";
  const bare = clean.replace(/^\/pt(?=\/|$)/, "") || "/";
  const id = aliases[bare] || (bare === "/" ? "home" : bare.slice(1));
  const found = pageIds.includes(id);
  const path = found ? pagePath(id, lang) : url.pathname;
  return {
    id: found ? id : "404",
    lang,
    path,
    found,
    redirect:
      found && (url.pathname !== path || url.searchParams.has("lang"))
        ? path + url.hash
        : null,
  };
}
