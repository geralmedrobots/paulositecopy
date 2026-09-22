import content from "../../data/content.json";
import { Hero } from "../../components/Hero/Hero.jsx";
import { Picture } from "../../components/Media/Picture.jsx";
import { Section } from "../../components/Section/Section.jsx";
import { ContactCTA } from "../../components/ContactCTA/ContactCTA.jsx";
import { Capabilities } from "../../components/Capabilities/Capabilities.jsx";
import { site } from "../../data/site.js";
import { ui } from "../../data/site.js";
export function UltraBot({ data, lang }) {
  return (
    <>
      <Hero
        title="UltraBot"
        kicker={lang === "pt" ? data.title : undefined}
        lead={data.lead}
        image={data.image}
        lang={lang}
      />
      <Section section={data.sections[0]} />
      <section className="section ultrabot-explanation">
        <Picture name="ultrabot-1" decorative className="explanation-image" />
        <div className="container two-column">
          {data.sections.slice(1, 3).map((section) => (
            <div className="stack ruled" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className="section ultrabot-overview">
        <div className="container media-grid">
          <Picture name="ultrabot-2" />
          <div className="stack" lang="en">
            <h2>UltraBot</h2>
            <p className="lead">{content.en.home.description}</p>
            <a
              className="button"
              href={`mailto:${site.email}?subject=UltraBot`}
            >
              {ui[lang].order}
            </a>
          </div>
        </div>
      </section>
      <Section section={data.sections[3]} index={1} id="how-it-works" />
      <section className="section">
        <div className="container">
          <Capabilities lang={lang} />
        </div>
      </section>
      <Section section={data.sections[4]} index={1} />
      <ContactCTA lang={lang} />
    </>
  );
}
