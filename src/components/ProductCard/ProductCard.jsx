import "./ProductCard.css";

function ProductCard({ image, imageSrcSet, imageSizes, imageWidth, imageHeight, alt, title, children, reverse = false }) {
  return (
    <div className={`product-card ${reverse ? "product-card--reverse" : ""}`}>
      <div className="product-card__text">
        {title && <h2>{title}</h2>}
        {children}
      </div>
      <div className="product-card__media">
        <img
          src={image}
          srcSet={imageSrcSet}
          sizes={imageSizes}
          width={imageWidth}
          height={imageHeight}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default ProductCard;
