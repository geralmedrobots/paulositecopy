import { Picture } from "../Media/Picture.jsx";
export function Section({ section, index = 0, children, id, className = "" }) {
  return (
    <section
      id={id}
      lang={section.lang}
      className={`section ${index % 2 ? "section-soft" : ""} ${className}`}
    >
      <div
        className={`container ${section.image ? `media-grid ${index % 2 ? "media-reverse" : ""}` : "reading"}`}
      >
        {section.image && (
          <Picture name={section.image} className="section-image" />
        )}
        <div className="stack">
          <h2>{section.title}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {children}
        </div>
      </div>
    </section>
  );
}
