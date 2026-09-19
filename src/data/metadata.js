import content from "./content.json" with { type: "json" };
import { findRoute } from "./routes.js";
const summaries = {
  home: content.home.tagline,
  ultrabot: content.ultrabot.intro,
  benefits: content.benefits.intro,
  company: content.company.intro,
  healthcare: content.healthcare.intro,
  recruitment: content.recruitment.intro,
  project: content.project.title,
  privacy: content.privacy.document.slice(1),
  cookies: content.cookies.document.slice(2),
  genderequality: content.genderequality.document.slice(1),
};
export function metadataFor(pathname, origin = "https://www.medrobots.pt") {
  const route = findRoute(pathname);
  const blocks =
    summaries[route?.key] || content[route?.key]?.description?.slice(1);
  const description =
    blocks
      ?.map((block) => block.text)
      .join(" ")
      .slice(0, 200) ||
    (route?.key === "contact"
      ? "Thank you for getting in touch with us. We will get back to you as soon as possible."
      : route?.title || "Page not found.");
  return {
    title: `${route?.title || "404"} | Medrobots`,
    description,
    canonical: new URL(
      route?.path || `/${pathname.replace(/^\/+/, "")}`,
      origin,
    ).href,
    language: route?.language || "en",
    noindex: !route || Boolean(route.noindex),
  };
}
export function siteOrigin(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.origin
      : "https://www.medrobots.pt";
  } catch {
    return "https://www.medrobots.pt";
  }
}
