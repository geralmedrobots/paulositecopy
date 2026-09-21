import { useI18n } from "../../i18n/i18n";
import heroImage from "../../assets/pages/company/engineering-soldering-hero.webp";
import valuesImage from "../../assets/pages/company/engineer-robotics-workshop.webp";
import missionImage from "../../assets/pages/company/engineer-laboratory.webp";
import "./Company.css";

function Company() {
  const { t } = useI18n();
  const copy = t.company;

  return (
    <>
      <section className="company-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="company-hero__overlay" />
        <div className="container company-hero__content">
          <h1>{copy.hero.title}</h1>
          <p>{copy.hero.description}</p>
        </div>
      </section>
      <section className="company-vision">
        <div className="container company-copy company-copy--centered">
          <h2>{copy.vision.title}</h2>
          {copy.vision.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className="company-split">
        <img src={valuesImage} width="960" height="1440" alt={copy.images.values} loading="lazy" decoding="async" />
        <div className="company-copy">
          <h2>{copy.values.title}</h2>
          <p>{copy.values.description}</p>
        </div>
      </section>
      <section className="company-split company-split--reverse">
        <img src={missionImage} width="1800" height="1201" alt={copy.images.mission} loading="lazy" decoding="async" />
        <div className="company-copy">
          <h2>{copy.mission.title}</h2>
          {copy.mission.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className="company-goals">
        <div className="container company-copy company-copy--centered">
          <h2>{copy.goals.title}</h2>
          <p>{copy.goals.description}</p>
        </div>
      </section>
    </>
  );
}

export default Company;
