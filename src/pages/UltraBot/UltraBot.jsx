import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useI18n } from "../../i18n/i18n";
import ultraBotImage800 from "../../assets/products/ultrabot-operation-800.webp";
import ultraBotImage1600 from "../../assets/products/ultrabot-operation-1600.webp";
import "./UltraBot.css";

function UltraBot() {
  const { t, path } = useI18n();
  const copy = t.ultrabot;

  return (
    <>
      <Section id="ultrabot">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="section-page-title">UltraBot</h1>
        <p className="section-sub">{copy.subtitle}</p>
        <div className="ultrabot__intro">
          {copy.intro.map(([title, text]) => <div key={title}><h2>{title}</h2><p>{text}</p></div>)}
        </div>
        <Button to={path("/contact")}>{copy.order}</Button>
      </Section>
      <Section alt id="ultrabot-how">
        <ProductCard
          image={ultraBotImage1600}
          imageSrcSet={`${ultraBotImage800} 800w, ${ultraBotImage1600} 1600w`}
          imageSizes="(max-width: 860px) calc(100vw - 32px), 42vw"
          imageWidth={1600}
          imageHeight={1068}
          alt={copy.alt}
          title={copy.howTitle}
        >
          {copy.how.map((text) => <p key={text}>{text}</p>)}
          <Button to={path("/contact")}>{copy.order}</Button>
        </ProductCard>
      </Section>
      <Section id="ultrabot-247">
        <div className="ultrabot__grid-4">
          {copy.features.map(([title, description]) => <div key={title} className="ultrabot__feature"><h2>{title}</h2><p>{description}</p></div>)}
        </div>
        <div className="ultrabot__day"><h2>24 / 7</h2>{copy.day.map((text) => <p key={text}>{text}</p>)}</div>
      </Section>
    </>
  );
}

export default UltraBot;
