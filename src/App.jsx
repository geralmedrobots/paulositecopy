import { Navigate, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import UltraBot from "./pages/UltraBot/UltraBot";
import Benefits from "./pages/Benefits/Benefits";
import Company from "./pages/Company/Company";
import Projects from "./pages/Projects/Projects";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ultrabot" element={<UltraBot />} />
        <Route path="/solutions" element={<Benefits />} />
        <Route path="/projects" element={<Navigate to="/projects/pharmarobot" replace />} />
        <Route path="/projects/pharmarobot" element={<Projects />} />
        <Route path="/company" element={<Company />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pt" element={<Home />} />
        <Route path="/pt/ultrabot" element={<UltraBot />} />
        <Route path="/pt/solutions" element={<Benefits />} />
        <Route path="/pt/projects" element={<Navigate to="/pt/projects/pharmarobot" replace />} />
        <Route path="/pt/projects/pharmarobot" element={<Projects />} />
        <Route path="/pt/company" element={<Company />} />
        <Route path="/pt/faq" element={<FAQ />} />
        <Route path="/pt/contact" element={<Contact />} />
        <Route path="/benefits" element={<Navigate to="/solutions" replace />} />
        <Route path="/projeto" element={<Navigate to="/projects/pharmarobot" replace />} />
        <Route path="/thecompany" element={<Navigate to="/company" replace />} />
        <Route path="/contacts" element={<Navigate to="/contact" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
