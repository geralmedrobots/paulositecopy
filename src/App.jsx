import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import UltraBot from "./pages/UltraBot/UltraBot";
import Benefits from "./pages/Benefits/Benefits";
import Company from "./pages/Company/Company";
import Projects from "./pages/Projects/Projects";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ultrabot" element={<UltraBot />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/thecompany" element={<Company />} />
        <Route path="/projeto" element={<Projects />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contacts" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
