import content from "../../data/content.json";
import { Hero } from "../../components/Hero/Hero.jsx";
import { Picture } from "../../components/Media/Picture.jsx";
import { Section } from "../../components/Section/Section.jsx";
import { ContactCTA } from "../../components/ContactCTA/ContactCTA.jsx";
import { Capabilities } from "../../components/Capabilities/Capabilities.jsx";
import { pagePath } from "../../data/routes.js";
import { site } from "../../data/site.js";
import { ui } from "../../data/site.js";
export function Home({ data, lang }) {
  return (
    <>
      <Hero
        title={data.lead}
        lead={data.intro.join(" ")}
        image="home-0"
        lang={lang}
      />
      <section className="section product-intro">
        <div className="container">
          <div className="centered reading">
            <h2 className="product-name">{data.title}</h2>
            <p className="lead" lang="en">
              {data.description}
            </p>
          </div>
          <a
            className="product-image"
            href={pagePath("ultrabot", lang)}
            aria-label="UltraBot"
          >
            <Picture name="home-2" />
          </a>
          <div className="button-row centered">
            <a
              className="button"
              href={`mailto:${site.email}?subject=UltraBot`}
            >
              {ui[lang].order}
            </a>
            <a
              className="button button-outline"
              href={pagePath("ultrabot", lang)}
            >
              UltraBot <span aria-hidden="true">→</span>
            </a>
          </div>
          <Capabilities lang={lang} />
        </div>
      </section>
      {data.sections.slice(4).map((section, index) => (
        <Section
          key={section.title}
          section={{
            ...section,
            image: `home-${index + 3}`,
            lang: index === 0 ? "en" : lang,
          }}
          index={index}
          className={
            ["section-innovation", "section-objective", "section-what"][index]
          }
        />
      ))}
      <Section
        section={{ ...content[lang].ultrabot.sections[3], image: undefined }}
        index={1}
        className="section-operation"
      >
        <a className="text-link" href={pagePath("ultrabot", lang)}>
          UltraBot <span aria-hidden="true">→</span>
        </a>
      </Section>
      <ContactCTA lang={lang} />
    </>
  );
}
