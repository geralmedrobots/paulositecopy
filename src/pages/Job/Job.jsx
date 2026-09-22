import { Hero } from "../../components/Hero/Hero.jsx";
import { site } from "../../data/site.js";
import { ui } from "../../data/site.js";
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
