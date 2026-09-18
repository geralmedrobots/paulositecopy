import "./ProductCard.css";

function ProductCard({ image, alt, title, children, reverse = false }) {
  return (
    <div className={`product-card ${reverse ? "product-card--reverse" : ""}`}>
      <div className="product-card__text">
        {title && <h3>{title}</h3>}
        {children}
      </div>
      <div className="product-card__media">
        <img src={image} alt={alt} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

export default ProductCard;
