import { useI18n } from "../../i18n/i18n";
import { benefitsPublicContent } from "../../data/publicPageContent";
import heroImage from "../../assets/pages/benefits/hero.jpg";
import sanitationImage from "../../assets/pages/benefits/sanitation.jpg";
import qualityImage from "../../assets/pages/benefits/quality-of-life.jpg";
import staffImage from "../../assets/pages/benefits/hospital-staff.jpg";
import "./Benefits.css";

function Benefits() {
  const { lang } = useI18n();
  const copy = benefitsPublicContent[lang];
  const [cost, sanitation, quality, better] = copy.sections;

  return (
    <>
      <section className="public-hero benefits-hero" style={{ "--page-hero": `url(${heroImage})` }}>
        <div className="public-hero__shade" />
        <div className="public-hero__copy"><h1>{copy.hero[0]}</h1><p>{copy.hero[1]}</p></div>
      </section>

      <section className="benefit-copy"><div className="container benefit-copy__row"><h2>{cost[0]}</h2><p>{cost[1]}</p></div></section>

      <section className="benefit-split">
        <img src={sanitationImage} width="958" height="1554" alt={copy.alt[0]} loading="lazy" decoding="async" />
        <div><h2>{sanitation[0]}</h2><p>{sanitation[1]}</p></div>
      </section>

      <section className="benefit-split benefit-split--reverse">
        <div><h2>{quality[0]}</h2><p>{quality[1]}</p></div>
        <img src={qualityImage} width="958" height="1554" alt={copy.alt[1]} loading="lazy" decoding="async" />
      </section>

      <section className="benefit-better">
        <div className="container benefit-copy__row"><h2>{better[0]}</h2><p>{better[1]}</p></div>
        <img src={staffImage} width="1464" height="960" alt={copy.alt[2]} loading="lazy" decoding="async" />
      </section>
    </>
  );
}

export default Benefits;
