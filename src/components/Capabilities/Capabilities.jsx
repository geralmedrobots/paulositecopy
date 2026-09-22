import content from "../../data/content.json";
export function Capabilities() {
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
