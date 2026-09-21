import { Link } from "react-router-dom";
import { navItems, footerLinks } from "../../data/navigation";
import { contactInfo } from "../../data/products";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <h4>MEDROBOTS</h4>
          <p className="footer__blurb">
            Hospital robotics and autonomous logistics for the healthcare sector.
          </p>
        </div>

        <div>
          <h4>Menu</h4>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Legal</h4>
          <ul>
            {footerLinks.legal.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contacts</h4>
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
        <span>Copyright © 2026 All Rights reserved.</span>
        <span>Cofinanciado por Portugal 2030</span>
      </div>
    </footer>
  );
}

export default Footer;
