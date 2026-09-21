export const PUBLIC_PATHS = [
  "/",
  "/solutions",
  "/projects/pharmarobot",
  "/company",
  "/contact",
  "/ultrabot",
  "/faq",
];

export const ROUTE_MATRIX = PUBLIC_PATHS.map((path) => ({
  en: path,
  pt: path === "/" ? "/pt" : `/pt${path}`,
}));

export const LEGACY_REDIRECTS = {
  "/benefits": "/solutions",
  "/projeto": "/projects/pharmarobot",
  "/thecompany": "/company",
  "/contacts": "/contact",
  "/projects": "/projects/pharmarobot",
  "/pt/projects": "/pt/projects/pharmarobot",
};

export const isPortuguesePath = (pathname) => pathname === "/pt" || pathname.startsWith("/pt/");

export const basePathFromPathname = (pathname) =>
  isPortuguesePath(pathname) ? pathname.slice(3) || "/" : pathname;

export const localizePath = (path, lang) => {
  const base = path === "/" ? "" : path;
  return lang === "pt" ? (base ? `/pt${base}` : "/pt") : path;
};

export const equivalentPath = (pathname, targetLang) =>
  localizePath(basePathFromPathname(pathname), targetLang);

const metadata = {
  en: {
    "/": { title: "Home | Med Robots", description: "Med Robots develops and integrates autonomous robotic solutions for hospital logistics and healthcare environments." },
    "/solutions": { title: "Benefits | Med Robots", description: "Key benefits of including robotics and autonomous disinfection technology in healthcare facilities." },
    "/projects/pharmarobot": { title: "PharmaRobot | Med Robots", description: "PharmaRobot is an R&D project focused on autonomous medication logistics for hospitals." },
    "/company": { title: "Med Robots | Company", description: "Med Robots is a technology company focused on hospital robotics, autonomous logistics and systems integration." },
    "/contact": { title: "Contact | Med Robots", description: "Contact Med Robots about hospital robotics and autonomous logistics." },
    "/ultrabot": { title: "UltraBot | Med Robots", description: "UltraBot is part of Med Robots' existing robotics experience in healthcare environments." },
    "/faq": { title: "FAQ | Med Robots", description: "Frequently asked questions about Med Robots and hospital logistics robotics." },
  },
  pt: {
    "/": { title: "Início | Med Robots", description: "A Med Robots desenvolve e integra soluções robóticas autónomas para logística hospitalar e ambientes de saúde." },
    "/solutions": { title: "Benefícios | Med Robots", description: "Principais benefícios da integração de robótica e tecnologia de desinfeção autónoma em instalações de saúde." },
    "/projects/pharmarobot": { title: "PharmaRobot | Med Robots", description: "O PharmaRobot é um projeto de I&D focado na logística autónoma de medicamentos para hospitais." },
    "/company": { title: "Med Robots | Empresa", description: "A Med Robots é uma empresa tecnológica focada em robótica hospitalar, logística autónoma e integração de sistemas." },
    "/contact": { title: "Contacto | Med Robots", description: "Contacte a Med Robots sobre robótica hospitalar e logística autónoma." },
    "/ultrabot": { title: "UltraBot | Med Robots", description: "O UltraBot integra a experiência existente da Med Robots em robótica para ambientes de saúde." },
    "/faq": { title: "Perguntas Frequentes | Med Robots", description: "Perguntas frequentes sobre a Med Robots e robótica para logística hospitalar." },
  },
};

export function getPageMetadata(pathname) {
  const lang = isPortuguesePath(pathname) ? "pt" : "en";
  const page = metadata[lang][basePathFromPathname(pathname)];
  if (!page) {
    return {
      lang,
      valid: false,
      title: lang === "pt" ? "Página não encontrada | Med Robots" : "Page not found | Med Robots",
      description: lang === "pt" ? "A página solicitada não foi encontrada." : "The requested page was not found.",
    };
  }
  const origin = "https://www.medrobots.pt";
  return {
    ...page,
    lang,
    valid: true,
    canonical: `${origin}${pathname}`,
    alternates: {
      en: `${origin}${equivalentPath(pathname, "en")}`,
      pt: `${origin}${equivalentPath(pathname, "pt")}`,
      default: `${origin}${equivalentPath(pathname, "en")}`,
    },
  };
}
