import { Link } from "react-router-dom";
import { navigationPaths, footerLinks } from "../../data/navigation";
import { contactInfo } from "../../data/products";
import { useI18n } from "../../i18n/i18n";
import "./Footer.css";

function Footer() {
  const { t, path } = useI18n();
  const labels = [t.nav.home, t.nav.solutions, t.nav.projects, t.nav.company, t.nav.contact];
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <h4>MEDROBOTS</h4>
          <p className="footer__blurb">
            {t.footer.blurb}
          </p>
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
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>{t.footer.copyright}</span>
        <span>{t.footer.funded}</span>
      </div>
    </footer>
  );
}

export default Footer;
