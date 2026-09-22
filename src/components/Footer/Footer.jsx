import {
  navigation,
  secondaryNavigation,
  legalNavigation,
  ui,
} from "../../data/site.js";
import { pagePath } from "../../data/routes.js";
import { Picture } from "../Media/Picture.jsx";
import { ContactInformation } from "../ContactInformation/ContactInformation.jsx";
export function Footer({ lang }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-identity">
          <a href={pagePath("home", lang)}>
            <Picture name="logo-footer" />
          </a>
          <a className="funding" href={pagePath("projeto", lang)}>
            <span lang="pt">cofinanciado por:</span>
            <img
              src="/assets/funding.svg"
              alt="COMPETE 2030 · Portugal 2030 · Cofinanciado pela União Europeia"
              width="438"
              height="60"
              loading="lazy"
            />
          </a>
        </div>
        <nav aria-label={`${ui[lang].menu} — footer`}>
          <h2>MENU</h2>
          {[...navigation, ...secondaryNavigation].map((item) => (
            <a key={item.id} href={pagePath(item.id, lang)}>
              {item[lang]}
            </a>
          ))}
        </nav>
        <div>
          <h2>{lang === "pt" ? "CONTATOS" : "CONTACTS"}</h2>
          <ContactInformation lang={lang} />
        </div>
      </div>
      <div className="container footer-bottom">
        <small>
          Copyright © {new Date().getFullYear()} {ui[lang].copyright}
        </small>
        <nav
          aria-label={lang === "pt" ? "Informação legal" : "Legal information"}
        >
          {legalNavigation.map((item) => (
            <a href={pagePath(item.id, lang)} key={item.id}>
              {item[lang]}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
