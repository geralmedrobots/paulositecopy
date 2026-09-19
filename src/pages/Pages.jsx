import content from "../data/content.json";
import { Hero, Picture, Section } from "../components/Media.jsx";
import FAQ from "../components/FAQ.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { ContactInformation } from "../components/Navigation.jsx";
import { pagePath } from "../data/routes.js";
import { jobs, ui, site } from "../data/site.js";
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
function Capabilities() {
  return (
    <div className="capabilities" lang="en">
      {content.en.home.sections.slice(0, 4).map((section, index) => (
        <section
          className={index === 0 ? "capability safety" : "capability"}
          key={section.title}
        >
          <span className="section-number" aria-hidden="true">
            0{index + 1}
          </span>
          <div>
            <h2>{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
export function Home({ data, lang }) {
  return (
    <>
      <Hero
        title={data.lead}
        lead={data.intro.join(" ")}
        image="home-0"
        video="/assets/home.mp4"
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
      <Section
        section={{ ...content[lang].ultrabot.sections[3], image: undefined }}
        index={1}
      >
        <a className="text-link" href={pagePath("ultrabot", lang)}>
          UltraBot <span aria-hidden="true">→</span>
        </a>
      </Section>
      {data.sections.slice(4).map((section, index) => (
        <Section
          key={section.title}
          section={{
            ...section,
            image: `home-${index + 3}`,
            lang: index === 0 ? "en" : lang,
          }}
          index={index}
        />
      ))}
      <ContactCTA lang={lang} />
    </>
  );
}
export function Product({ data, lang }) {
  return (
    <>
      <Hero
        title="UltraBot"
        kicker={lang === "pt" ? data.title : undefined}
        lead={data.lead}
        image={data.image}
        video="/assets/ultrabot.mp4"
        lang={lang}
      />
      <section className="section">
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
      <Section section={data.sections[0]} index={1} />
      <section className="section">
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
const jobHeadings = [
  "Introdução",
  "Responsabilidades",
  "Requisitos",
  "O que nós oferecemos",
  "Modelo",
  "Experiência",
  "Horas",
  "Introduction",
  "Responsibilities",
  "Requirements",
  "What We Offer",
  "Local",
  "Type",
  "Experience",
  "Hours",
];
export function Job({ data, lang }) {
  const nodes = [];
  for (let i = 0; i < data.blocks.length; i++) {
    const b = data.blocks[i];
    if (b.tag === "li") {
      const list = [b.text];
      while (data.blocks[i + 1]?.tag === "li") list.push(data.blocks[++i].text);
      nodes.push(
        <ul key={i}>
          {list.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>,
      );
    } else if (jobHeadings.includes(b.text))
      nodes.push(<h2 key={i}>{b.text}</h2>);
    else nodes.push(<p key={i}>{b.text}</p>);
  }
  return (
    <>
      <Hero title={data.title} lang={lang} />
      <section className="section">
        <div className="container reading job-details">
          {nodes}
          <a
            className="button"
            href={`mailto:${site.email}?subject=${encodeURIComponent(data.title)}`}
          >
            {ui[lang].contact}
          </a>
        </div>
      </section>
    </>
  );
}
export function Project({ data, lang }) {
  return (
    <>
      <Hero title={data.title} lead={data.lead} lang={lang} />
      <section className="section" lang="pt">
        <div className="container project-grid">
          <div className="project-facts">
            {data.paragraphs.map((text, i) => {
              const clean = text
                .replace("{email}", site.email)
                .replace("{mobileInternational}", `+351 ${site.mobile}`);
              if (i === 2) return <h2 key={text}>{text}</h2>;
              const colon = clean.indexOf(":");
              if (colon > 0)
                return (
                  <dl key={text}>
                    <dt>{clean.slice(0, colon)}:</dt>
                    <dd>{clean.slice(colon + 1)}</dd>
                  </dl>
                );
              return <p key={text}>{clean}</p>;
            })}
            {data.originalPt.length > 0 && (
              <section className="stack">
                <h2>{data.originalPt[0]}</h2>
                <p>{data.originalPt[1]}</p>
              </section>
            )}
          </div>
          <a href="/assets/projeto-0.webp" className="project-poster">
            <Picture name="projeto-0" />
          </a>
        </div>
      </section>
      <ContactCTA lang={lang} />
    </>
  );
}
export function Contacts({ data, lang }) {
  return (
    <>
      <Hero title={data.title} lang={lang} />
      <section className="section">
        <div className="container contact-grid">
          <div className="stack">
            <Picture name="contacts-0" className="contact-image" />
            <ContactInformation lang={lang} />
          </div>
          <ContactForm data={data} lang={lang} />
        </div>
      </section>
    </>
  );
}
export function Questions({ data, lang }) {
  return (
    <>
      <Hero title={data.title} lang={lang} />
      <section className="section">
        <div className="container reading">
          <FAQ items={data.items} />
        </div>
      </section>
      <ContactCTA lang={lang} />
    </>
  );
}
export function Legal({ data, lang, id }) {
  return (
    <>
      <Hero title={data.title} titleLang={data.contentLanguage} lang={lang} />
      <section className="section">
        <div
          className="container reading legal-copy"
          lang={data.contentLanguage || lang}
        >
          {data.paragraphs.map((text, i) =>
            /^(I+ -|What are|How can|Which entities|O que são|Como pode|Que entidades)/.test(
              text,
            ) ? (
              <h2 key={i}>{text}</h2>
            ) : (
              <p key={i}>{text}</p>
            ),
          )}
          {id === "genderequality" && (
            <Picture name="genderequality-0" className="signatures" />
          )}
        </div>
      </section>
    </>
  );
}
