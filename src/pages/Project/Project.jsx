import { Picture } from "../../components/Media/Picture.jsx";
import { site } from "../../data/site.js";

export function Project({ data }) {
  return (
    <>
      <header className="project-heading container" lang="pt">
        <img
          src="/assets/project-funding.svg"
          alt="COMPETE 2030 · Portugal 2030 · Cofinanciado pela União Europeia"
          width="760"
          height="67"
        />
        <h1>{data.title}</h1>
        <p>{data.lead}</p>
      </header>
      <section className="project-content" lang="pt">
        <div className="project-copy container">
          {data.paragraphs.map((text, index) => {
            const rendered = text
              .replace("{email}", site.email)
              .replace("{mobileInternational}", `+351 ${site.mobile}`);
            return index === 2 ? (
              <h2 key={text}>{rendered}</h2>
            ) : (
              <p key={text}>{rendered}</p>
            );
          })}
          {data.originalPt.length > 0 && (
            <section className="project-original">
              <h2>{data.originalPt[0]}</h2>
              <p>{data.originalPt[1]}</p>
            </section>
          )}
        </div>
        <a href="/assets/projeto-0.webp" className="project-poster">
          <Picture name="projeto-0" />
        </a>
      </section>
    </>
  );
}
