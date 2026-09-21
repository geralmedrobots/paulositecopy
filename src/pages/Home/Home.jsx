import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/i18n";
import { homePageContent } from "../../data/homePage";
import heroImage from "../../assets/home/hospital-hero.jpg";
import medicalStrip from "../../assets/home/medical-strip.jpg";
import ultraBotImage from "../../assets/home/ultrabot-hero.webp";
import innovationImage from "../../assets/home/innovation.jpg";
import objectiveImage from "../../assets/home/objective.jpg";
import engineersImage from "../../assets/home/engineers.jpg";
import "./Home.css";

function Home() {
  const { lang, path } = useI18n();
  const copy = homePageContent[lang];

  return (
    <>
      <section className="legacy-hero" style={{ "--hero-image": `url(${heroImage})` }}>
        <div className="legacy-hero__overlay" />
        <div className="legacy-hero__content">
          <h1>{copy.hero.title}</h1>
          <p>{copy.hero.lineOne}<br />{copy.hero.lineTwo}</p>
        </div>
      </section>

      <section className="legacy-product">
        <div className="legacy-product__strip" style={{ "--strip-image": `url(${medicalStrip})` }} />
        <div className="container legacy-product__intro">
          <h2>{copy.product.title}</h2>
          <p>{copy.product.description}</p>
        </div>
        <div className="container legacy-product__visual">
          <img src={ultraBotImage} width="1958" height="856" alt={copy.product.imageAlt} decoding="async" />
          <Link className="legacy-button" to={path("/contact")}>{copy.product.action}</Link>
        </div>
        <div className="container legacy-features">
          {copy.features.map(([title, description]) => (
            <article key={title}><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>

      <section className="legacy-split">
        <img src={innovationImage} width="1084" height="1024" alt={copy.innovation.imageAlt} loading="lazy" decoding="async" />
        <div className="legacy-split__copy"><h2>{copy.innovation.title}</h2><p>{copy.innovation.text}</p></div>
      </section>

      <section className="legacy-editorial">
        <div className="legacy-editorial__objective">
          <img src={objectiveImage} width="954" height="1324" alt={copy.objective.imageAlt} loading="lazy" decoding="async" />
          <div><h2>{copy.objective.title}</h2><p>{copy.objective.text}</p></div>
        </div>
        <div className="legacy-editorial__work">
          <div><h2>{copy.whatWeDo.title}</h2><p>{copy.whatWeDo.text}</p></div>
          <img src={engineersImage} width="1472" height="1067" alt={copy.whatWeDo.imageAlt} loading="lazy" decoding="async" />
        </div>
      </section>
    </>
  );
}

export default Home;
