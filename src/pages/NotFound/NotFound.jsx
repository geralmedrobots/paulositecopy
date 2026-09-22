import { Hero } from "../../components/Hero/Hero.jsx";
import { ui } from "../../data/site.js";
import { pagePath } from "../../data/routes.js";
export function NotFound({ lang }) {
  return (
    <Hero title={ui[lang].missing} lead={ui[lang].missingHelp} lang={lang}>
      <a className="button" href={pagePath("home", lang)}>
        {ui[lang].home}
      </a>
    </Hero>
  );
}
