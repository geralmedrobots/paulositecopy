import { useEffect, useRef, useState } from "react";
import { navigation, secondaryNavigation, ui } from "../../data/site.js";
import { pagePath } from "../../data/routes.js";
import { Picture } from "../Media/Picture.jsx";
export function Navbar({ route }) {
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const toggle = useRef(null);
  const moreToggle = useRef(null);
  const header = useRef(null);
  const { lang, id } = route;
  const t = ui[lang];
  const close = () => {
    setOpen(false);
    setMore(false);
  };
  useEffect(() => {
    function escape(e) {
      if (e.key === "Escape" && (open || more)) {
        close();
        (open ? toggle : moreToggle).current?.focus();
      }
    }
    function outside(e) {
      if (!header.current?.contains(e.target)) close();
    }
    const media = window.matchMedia("(min-width: 64rem)");
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", close);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", close);
    };
  }, [open, more]);
  const link = (item) => (
    <a
      key={item.id}
      href={pagePath(item.id, lang)}
      aria-current={id === item.id ? "page" : undefined}
      onClick={close}
    >
      {item[lang]}
    </a>
  );
  return (
    <header
      className="site-header"
      ref={header}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) close();
      }}
    >
      <div className="container header-inner">
        <a
          className="brand"
          href={pagePath("home", lang)}
          aria-label={`Med Robots — ${t.home}`}
        >
          <Picture name="logo" critical />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => {
            setOpen(!open);
            setMore(false);
          }}
        >
          {open ? t.close : t.menu}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav
          id="main-navigation"
          className={`main-navigation ${open ? "is-open" : ""}`}
          aria-label={t.menu}
        >
          {navigation.map(link)}
          <div className="more-nav">
            <button
              ref={moreToggle}
              data-active={
                secondaryNavigation.some((item) => item.id === id) || undefined
              }
              aria-expanded={more}
              aria-controls="secondary-navigation"
              onClick={() => setMore(!more)}
            >
              {t.more} <span aria-hidden="true">⌄</span>
            </button>
            <div
              id="secondary-navigation"
              className="more-links"
              hidden={!more}
            >
              {secondaryNavigation.map(link)}
            </div>
          </div>
          <div className="language-switch" aria-label="Language / Idioma">
            {["en", "pt"].map((l) => (
              <a
                key={l}
                href={pagePath(route.found ? id : "home", l)}
                lang={l}
                hrefLang={l}
                aria-current={l === lang ? "true" : undefined}
              >
                {l.toUpperCase()}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
