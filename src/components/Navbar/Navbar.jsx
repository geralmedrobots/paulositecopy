import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navigationPaths } from "../../data/navigation";
import { equivalentPath, useI18n } from "../../i18n/i18n";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, t, path, pathname } = useI18n();
  const labels = [t.nav.home, t.nav.solutions, t.nav.projects, t.nav.company, t.nav.contact];

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__bar">
        <Link to={path("/")} className="navbar__logo" onClick={closeMenu}>
          MEDROBOTS
        </Link>

        <nav id="main-navigation" aria-label={t.nav.navigationLabel} className={`navbar__nav ${isOpen ? "navbar__nav--open" : ""}`}>
          <ul>
            {navigationPaths.map((itemPath, index) => (
              <li key={itemPath}>
                <NavLink
                  to={path(itemPath)}
                  end={itemPath === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {labels[index]}
                </NavLink>
              </li>
            ))}
            <li><Link className="navbar__language" to={equivalentPath(pathname, lang === "pt" ? "en" : "pt")} hrefLang={lang === "pt" ? "en" : "pt-PT"} lang={lang === "pt" ? "en" : "pt-PT"} aria-label={t.nav.languageLabel} onClick={closeMenu}>{t.nav.language}</Link></li>
          </ul>
        </nav>

        <button
          className="navbar__toggle"
          aria-label={isOpen ? t.nav.close : t.nav.open}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "\u2715" : "\u2630"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
