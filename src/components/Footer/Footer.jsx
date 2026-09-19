import { Link } from "react-router-dom";
import { navItems, footerLinks } from "../../data/navigation";
import Media from "../Media/Media";
import ContactInfo from "../ContactInfo/ContactInfo";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer" lang="en">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Media name="medrobots-footer" alt="Med Robots" />
          <Link to="/projeto">
            <Media name="funding" />
          </Link>
        </div>
        <div>
          <Link className="footer__heading" to="/faq">
            FAQ
          </Link>
        </div>
        <nav aria-label="Footer">
          <h2>MENU</h2>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2>CONTACTS</h2>
          <ContactInfo footer />
        </div>
      </div>
      <div className="container footer__bottom">
        <p>Copyright © 2026 All Rights reserved.</p>
        <nav aria-label="Legal">
          {footerLinks.legal.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
