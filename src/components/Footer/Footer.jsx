import { Link } from "react-router-dom";
import { navigationPaths, footerLinks } from "../../data/navigation";
import { contactInfo } from "../../data/products";
import { equivalentPath, useI18n } from "../../i18n/i18n";
import footerLogo from "../../assets/brand/medrobots-footer-logo.png";
import "./Footer.css";

function Footer() {
  const { lang, t, path, pathname } = useI18n();
  const labels = lang === "pt"
    ? ["UltraBot", "Benefícios", "A Empresa", "Projeto", "Contactos"]
    : ["UltraBot", "Benefits", "The Company", "Project", "Contacts"];
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={footerLogo} width="144" height="54" alt="Med Robots" loading="lazy" decoding="async" />
          <Link className="footer__faq" to={path("/faq")}>FAQ</Link>
          <span className="footer__funding">Portugal 2030</span>
        </div>

        <div>
          <h4>{t.footer.menu}</h4>
          <ul>
            {navigationPaths.map((itemPath, index) => (
              <li key={itemPath}>
                <Link to={path(itemPath)}>{labels[index]}</Link>
              </li>
            ))}
          </ul>
        </div>

        {footerLinks.legal.length > 0 && <div>
          <h4>Legal</h4>
          <ul>{footerLinks.legal.map((item) => <li key={item.path}><Link to={item.path}>{item.label}</Link></li>)}</ul>
        </div>}

        <div>
          <h4>{t.footer.contacts}</h4>
          <ul>
            <li>Tel. {contactInfo.phone}</li>
            <li>Tlm. {contactInfo.mobile}</li>
            <li>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
            {contactInfo.addresses.map((address) => <li key={address}>{address}</li>)}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>{t.footer.copyright}</span>
        <span>{lang === "pt" ? "Política de Privacidade · Cookies · Igualdade de Género" : "Privacy Policy · Cookies · Gender Equality"}</span>
        <Link to={equivalentPath(pathname, lang === "pt" ? "en" : "pt")} hrefLang={lang === "pt" ? "en" : "pt-PT"}>{lang === "pt" ? "English" : "Português"}</Link>
      </div>
    </footer>
  );
}

export default Footer;
