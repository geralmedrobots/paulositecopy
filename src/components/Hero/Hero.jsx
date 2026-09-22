import { Picture } from "../Media/Picture.jsx";

export function Hero({
  title,
  lead,
  image,
  children,
  alignment = "center",
  kicker,
  titleLang,
}) {
  return (
    <section
      className={`hero ${image ? "hero-media" : "hero-plain"} hero-${alignment}`}
    >
      {image && (
        <Picture name={image} critical decorative className="hero-image" />
      )}
      <div className="container hero-content">
        {kicker && <p className="kicker">{kicker}</p>}
        <h1 lang={titleLang}>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
