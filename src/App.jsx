import content from "./data/content.json";
import { resolveRoute } from "./data/routes.js";
import { ui, jobs } from "./data/site.js";
import { isIncomplete } from "./data/seo.js";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { UltraBot } from "./pages/UltraBot/UltraBot.jsx";
import { Editorial } from "./pages/Editorial/Editorial.jsx";
import { Recruitment } from "./pages/Recruitment/Recruitment.jsx";
import { Job } from "./pages/Job/Job.jsx";
import { Project } from "./pages/Project/Project.jsx";
import { Contact } from "./pages/Contact/Contact.jsx";
import { FAQPage } from "./pages/FAQ/FAQPage.jsx";
import { Legal } from "./pages/Legal/Legal.jsx";
import { NotFound } from "./pages/NotFound/NotFound.jsx";
import "./App.css";
const pageComponents = {
  home: Home,
  ultrabot: UltraBot,
  benefits: Editorial,
  "healthcare-industry-1": Editorial,
  thecompany: Editorial,
  recruitment: Recruitment,
  projeto: Project,
  contacts: Contact,
  faq: FAQPage,
  privacy: Legal,
  cookies: Legal,
  genderequality: Legal,
  ...Object.fromEntries(jobs.map((id) => [id, Job])),
};
export default function App({ url }) {
  const route = resolveRoute(url);
  const { id, lang } = route;
  const Page = pageComponents[id] || NotFound;
  const partial = isIncomplete(route.path);
  return (
    <>
      <a className="skip-link" href="#main">
        {ui[lang].skip}
      </a>
      <Navbar route={route} />
      <main id="main" className={`page-${id}`} tabIndex={-1}>
        {partial && (
          <p className="language-notice container">{ui[lang].partial}</p>
        )}
        <Page data={content[lang][id]} lang={lang} id={id} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
