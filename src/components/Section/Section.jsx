import "./Section.css";

/**
 * Generic section wrapper. `alt` applies the alternate (mist) background
 * used to separate consecutive sections, matching the original site.
 */
function Section({ id, alt = false, children, className = "" }) {
  return (
    <section id={id} className={`section ${alt ? "section--alt" : ""} ${className}`.trim()}>
      <div className="container">{children}</div>
    </section>
  );
}

export default Section;
