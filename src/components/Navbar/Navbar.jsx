import { useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navItems } from "../../data/navigation";
import Media from "../Media/Media";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import "./Navbar.css";
export default function Navbar() {
  const { pathname } = useLocation();
  const [openPath, setOpenPath] = useState(null);
  const toggle = useRef(null);
  const isOpen = openPath === pathname;
  const close = () => setOpenPath(null);
  return (
    <header
      className="navbar"
      lang="en"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          close();
          toggle.current.focus();
        }
      }}
    >
      <div className="container navbar__bar">
        <Link
          to="/"
          className="navbar__logo"
          onClick={close}
          aria-label="Med Robots — Home"
        >
          <Media name="medrobots-horizontal" alt="Med Robots" eager />
        </Link>
        <button
          ref={toggle}
          className="navbar__toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setOpenPath(isOpen ? null : pathname)}
        >
          {isOpen ? "×" : "☰"}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main"
          className={`navbar__nav ${isOpen ? "navbar__nav--open" : ""}`}
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} onClick={close}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
