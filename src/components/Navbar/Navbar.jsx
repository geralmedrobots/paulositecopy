import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../../data/navigation";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__bar">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          MEDROBOTS
        </Link>

        <nav className={`navbar__nav ${isOpen ? "navbar__nav--open" : ""}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="navbar__toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "\u2715" : "\u2630"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
