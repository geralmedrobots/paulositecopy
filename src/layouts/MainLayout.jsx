import SEO from "../components/SEO/SEO";
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
export default function MainLayout() {
  const { pathname, hash } = useLocation();
  const main = useRef(null);
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "instant" });
      main.current?.focus({ preventScroll: true });
      previous.current = pathname;
    }
    if (hash) {
      let id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* Preserve malformed fragment without crashing navigation. */
      }
      document.getElementById(id)?.scrollIntoView();
    }
  }, [pathname, hash]);
  return (
    <>
      <SEO />
      <a href="#main" className="skip-link">
        Skip to Main Content
      </a>
      <Navbar />
      <main id="main" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
