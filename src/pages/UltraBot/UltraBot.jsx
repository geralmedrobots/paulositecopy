import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/i18n";
import { ultraBotPublicContent } from "../../data/publicPageContent";
import heroImage from "../../assets/products/ultrabot/hero.jpg";
import actionImage from "../../assets/products/ultrabot-operation-1600.webp";
import productImage from "../../assets/products/ultrabot/product.webp";
import medicalImage from "../../assets/products/ultrabot/medical-professional.jpg";
import "./UltraBot.css";

function UltraBot() {
  const { lang, path } = useI18n();
  const copy = ultraBotPublicContent[lang];

  return (
    <>
      <section className="public-hero" style={{ "--page-hero": `url(${heroImage})` }}>
        <div className="public-hero__shade" />
        <div className="public-hero__copy"><h1>{copy.hero[0]}</h1><p>{copy.hero[1]}</p></div>
      </section>

      <section className="ultra-copy"><div className="container ultra-copy__grid">
        {copy.intro.map(([title, text]) => <article key={title}><h2>{title}</h2><p>{text}</p></article>)}
        <Link className="public-button" to={path("/contact")}>{copy.action}</Link>
      </div></section>

      <section className="ultra-lab"><img src={actionImage} width="1600" height="1068" alt={copy.alt.action} loading="lazy" decoding="async" /></section>

      <section className="ultra-how"><div className="container ultra-how__grid">
        <div className="ultra-how__copy"><h2>{copy.howTitle}</h2>{copy.how.map(text => <p key={text}>{text}</p>)}<Link className="public-button public-button--dark" to={path("/contact")}>{copy.action}</Link></div>
        <img src={productImage} width="1434" height="700" alt={copy.alt.product} loading="lazy" decoding="async" />
      </div></section>

      <section className="ultra-day"><div className="ultra-day__grid">
        <img src={medicalImage} width="958" height="1554" alt={copy.alt.medical} loading="lazy" decoding="async" />
        <div className="ultra-day__copy"><h2>{copy.dayTitle}</h2>{copy.day.map(text => <p key={text}>{text}</p>)}</div>
      </div></section>
    </>
  );
}

export default UltraBot;
