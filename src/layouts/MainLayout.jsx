import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { equivalentPath, isPortuguesePath } from "../i18n/i18n";

const metadata = {
  "/": ["Home | Med Robots", "Med Robots develops and integrates autonomous robotic solutions for hospital logistics and healthcare environments."],
  "/solutions": ["Solutions | Med Robots", "Autonomous robotic systems, navigation, infrastructure integration and operational workflows for hospitals."],
  "/projects/pharmarobot": ["PharmaRobot | Med Robots", "PharmaRobot is an R&D project focused on autonomous medication logistics for hospitals."],
  "/company": ["Med Robots | Company", "Med Robots is a technology company focused on hospital robotics, autonomous logistics and systems integration."],
  "/contact": ["Contact | Med Robots", "Contact Med Robots about hospital robotics and autonomous logistics."],
  "/ultrabot": ["UltraBot | Med Robots", "UltraBot is part of Med Robots' existing robotics experience in healthcare environments."],
  "/faq": ["FAQ | Med Robots", "Frequently asked questions about Med Robots and hospital logistics robotics."],
};

const metadataPt = {
  "/": ["Início | Med Robots", "A Med Robots desenvolve e integra soluções robóticas autónomas para logística hospitalar e ambientes de saúde."],
  "/solutions": ["Soluções | Med Robots", "Sistemas robóticos autónomos, navegação, integração com infraestrutura e fluxos operacionais para hospitais."],
  "/projects/pharmarobot": ["PharmaRobot | Med Robots", "O PharmaRobot é um projeto de I&D focado na logística autónoma de medicamentos para hospitais."],
  "/company": ["Med Robots | Empresa", "A Med Robots é uma empresa tecnológica focada em robótica hospitalar, logística autónoma e integração de sistemas."],
  "/contact": ["Contacto | Med Robots", "Contacte a Med Robots sobre robótica hospitalar e logística autónoma."],
  "/ultrabot": ["UltraBot | Med Robots", "O UltraBot integra a experiência existente da Med Robots em robótica para ambientes de saúde."],
  "/faq": ["Perguntas Frequentes | Med Robots", "Perguntas frequentes sobre a Med Robots e robótica para logística hospitalar."],
};

function setLink(rel, href, hreflang) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.head.querySelector(selector);
  if (!link) { link = document.createElement("link"); link.rel = rel; if (hreflang) link.hreflang = hreflang; document.head.appendChild(link); }
  link.href = href;
}

function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pt = isPortuguesePath(pathname);
    const basePath = pt ? pathname.slice(3) || "/" : pathname;
    const page = (pt ? metadataPt : metadata)[basePath];
    document.documentElement.lang = pt ? "pt-PT" : "en";
    if (!page) {
      document.title = pt ? "Página não encontrada | Med Robots" : "Page not found | Med Robots";
      return;
    }
    const [title, description] = page;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) { ogDescription = document.createElement("meta"); ogDescription.setAttribute("property", "og:description"); document.head.appendChild(ogDescription); }
    ogDescription.setAttribute("content", description);
    const origin = "https://www.medrobots.pt";
    setLink("canonical", `${origin}${pathname === "/" ? "/" : pathname}`);
    setLink("alternate", `${origin}${equivalentPath(pathname, "en")}`, "en");
    setLink("alternate", `${origin}${equivalentPath(pathname, "pt")}`, "pt-PT");
    setLink("alternate", `${origin}${equivalentPath(pathname, "en")}`, "x-default");
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
