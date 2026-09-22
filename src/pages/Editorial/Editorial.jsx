import content from "../../data/content.json";
import { Hero } from "../../components/Hero/Hero.jsx";
import { Section } from "../../components/Section/Section.jsx";
import { ContactCTA } from "../../components/ContactCTA/ContactCTA.jsx";
import { pagePath } from "../../data/routes.js";
export function Editorial({ data, lang, id }) {
  return (
    <>
      <Hero
        title={
          id === "healthcare-industry-1" && lang === "pt"
            ? "Setor da Saúde"
            : data.title
        }
        kicker={
          id === "healthcare-industry-1" && lang === "pt"
            ? data.title
            : undefined
        }
        lead={data.lead}
        image={data.image}
        lang={lang}
      />
      {data.sections.map((section, index) => (
        <Section key={section.title} section={section} index={index} />
      ))}
      {id === "thecompany" && (
        <Section section={content[lang].recruitment.sections[1]} index={1}>
          <a className="text-link" href={pagePath("recruitment", lang)}>
            {content[lang].recruitment.title} →
          </a>
        </Section>
      )}
      <ContactCTA lang={lang} />
    </>
  );
}
