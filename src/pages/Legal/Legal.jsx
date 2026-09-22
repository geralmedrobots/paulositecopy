import { Hero } from "../../components/Hero/Hero.jsx";
import { Picture } from "../../components/Media/Picture.jsx";
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
