import content from "../../data/content.json";
import { Hero } from "../../components/Hero/Hero.jsx";
import { Section } from "../../components/Section/Section.jsx";
import { ContactCTA } from "../../components/ContactCTA/ContactCTA.jsx";
import { jobs } from "../../data/site.js";
import { pagePath } from "../../data/routes.js";
export function Recruitment({ data, lang }) {
  return (
    <>
      <Hero
        title={data.title}
        lead={data.lead}
        image={data.image}
        lang={lang}
      />
      <Section section={data.sections[0]} />
      <section className="section section-soft">
        <div className="container">
          <h2>{data.opportunities}</h2>
          <div className="jobs-grid">
            {jobs.map((id) => (
              <article className="job-card" key={id}>
                <p>{data.location}</p>
                <h3>
                  <a href={pagePath(id, lang)}>
                    {content[lang][id].title}
                    <span aria-hidden="true"> →</span>
                  </a>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Section section={data.sections[1]} />
      <ContactCTA lang={lang} />
    </>
  );
}
