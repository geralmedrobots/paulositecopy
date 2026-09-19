import Media from "../Media/Media";
import Content from "../Content/Content";
import "./ImageSection.css";
export default function ImageSection({
  id,
  title,
  blocks,
  image,
  alt,
  reverse = false,
  children,
  wide = false,
}) {
  return (
    <section
      id={id}
      className={`image-section ${reverse ? "image-section--reverse" : ""} ${wide ? "image-section--wide" : ""}`}
    >
      <div className="container image-section__grid">
        <div className="image-section__copy">
          {title && <h2>{title}</h2>}
          <Content blocks={blocks} />
          {children}
        </div>
        {image && (
          <Media name={image} alt={alt} className="image-section__image" />
        )}
      </div>
    </section>
  );
}
