import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Home | Med Robots",
      "/solutions": "Solutions | Med Robots",
      "/projects": "Projects | Med Robots",
      "/projects/pharmarobot": "PharmaRobot | Med Robots",
      "/company": "Med Robots | Company",
      "/contact": "Contact | Med Robots",
      "/ultrabot": "UltraBot | Med Robots",
      "/faq": "FAQ | Med Robots",
    };
    if (titles[pathname]) document.title = titles[pathname];
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
