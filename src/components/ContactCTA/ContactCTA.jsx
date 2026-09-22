import content from "../../data/content.json";
import { pagePath } from "../../data/routes.js";
import { ui } from "../../data/site.js";
export function ContactCTA({ lang }) {
  return (
    <aside className="cta-band">
      <div className="container">
        <h2>Med Robots</h2>
        <div className="button-row">
          <a className="button" href={pagePath("contacts", lang)}>
            {ui[lang].contact}
          </a>
          <a className="button button-outline" href={pagePath("faq", lang)}>
            {content[lang].faq.title}
          </a>
        </div>
      </div>
    </aside>
  );
}
