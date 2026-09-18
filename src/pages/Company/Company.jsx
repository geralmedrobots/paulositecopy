import Section from "../../components/Section/Section";
import { companyContent } from "../../data/products";
import "./Company.css";

const ENGINEERS_IMG =
  "https://static.wixstatic.com/media/7498c2_2c41891153014669afeafac0bdab96ec~mv2.jpg";
const TEAM_IMG =
  "https://static.wixstatic.com/media/7498c2_f700da0ea9cf4b71a4f90f896294a0e8~mv2.jpg";

function Company() {
  return (
    <Section id="company">
      <p className="eyebrow">Who we are</p>
      <h2>The Company</h2>
      <p className="section-sub">The values and vision that move us forward every day.</p>

      <div className="company__row">
        <div>
          <h3>Vision</h3>
          <p>{companyContent.vision}</p>
        </div>
        <div className="company__media">
          <img src={ENGINEERS_IMG} alt="Engenheiro a trabalhar" loading="lazy" decoding="async" />
        </div>
      </div>

      <div className="company__row company__row--reverse">
        <div className="company__media">
          <img src={TEAM_IMG} alt="Equipa de engenharia" loading="lazy" decoding="async" />
        </div>
        <div>
          <h3>Values</h3>
          <p>{companyContent.values}</p>
          <h3>Mission</h3>
          <p>{companyContent.mission}</p>
        </div>
      </div>

      <div className="company__goals">
        <h3>Goals</h3>
        <p>{companyContent.goals}</p>
      </div>
    </Section>
  );
}

export default Company;
