import content from "./data/content.json";
import { resolveRoute, pagePath } from "./data/routes.js";
import { ui, jobs } from "./data/site.js";
import { Navbar, Footer } from "./components/Navigation.jsx";
import { Hero } from "./components/Media.jsx";
import {
  Home,
  Product,
  Editorial,
  Recruitment,
  Job,
  Project,
  Contacts,
  Questions,
  Legal,
} from "./pages/Pages.jsx";
import "./App.css";
export default function App({ url }) {
  const route = resolveRoute(url);
  const { id, lang } = route;
  const data = content[lang][id];
  const props = { data, lang, id };
  const partial =
    (lang === "pt" && ["home", "ultrabot", "genderequality"].includes(id)) ||
    (lang === "en" && id === "projeto");
  let page;
  if (id === "home") page = <Home {...props} />;
  else if (id === "ultrabot") page = <Product {...props} />;
  else if (id === "recruitment") page = <Recruitment {...props} />;
  else if (jobs.includes(id)) page = <Job {...props} />;
  else if (id === "projeto") page = <Project {...props} />;
  else if (id === "contacts") page = <Contacts {...props} />;
  else if (id === "faq") page = <Questions {...props} />;
  else if (["privacy", "cookies", "genderequality"].includes(id))
    page = <Legal {...props} />;
  else if (data) page = <Editorial {...props} />;
  else
    page = (
      <Hero title={ui[lang].missing} lead={ui[lang].missingHelp} lang={lang}>
        <a className="button" href={pagePath("home", lang)}>
          {ui[lang].home}
        </a>
      </Hero>
    );
  return (
    <>
      <a className="skip-link" href="#main">
        {ui[lang].skip}
      </a>
      <Navbar route={route} />
      <main id="main" tabIndex={-1}>
        {partial && (
          <p className="language-notice container">{ui[lang].partial}</p>
        )}
        {page}
      </main>
      <Footer lang={lang} />
    </>
  );
}
