import Section from "../../components/Section/Section";
import { useI18n } from "../../i18n/i18n";
import "./Company.css";

function Company() {
  const { t } = useI18n(); const c = t.company;
  return <>
    <section className="company-hero"><div className="container"><p className="eyebrow">{c.hero[0]}</p><h1>{c.hero[1]}</h1><p>{c.hero[2]}</p></div></section>
    <Section id="who-we-are" className="company-section"><div className="company-intro"><div><p className="eyebrow">{c.who[0]}</p><h2>{c.who[1]}</h2></div><p className="section-sub">{c.who[2]}</p></div><div className="company-statement">{c.who[3]}</div></Section>
    <Section id="focus" alt className="company-section"><div className="company-intro"><div><p className="eyebrow">{c.focus[0]}</p><h2>{c.focus[1]}</h2></div><p className="section-sub">{c.focus[2]}</p></div><div className="focus-grid">{c.focusAreas.map((area, index) => <div key={area}><span>0{index + 1}</span><strong>{area}</strong></div>)}</div></Section>
    <Section id="approach" className="company-section"><div className="company-intro"><div><p className="eyebrow">{c.approach[0]}</p><h2>{c.approach[1]}</h2></div><p className="section-sub">{c.approach[2]}</p></div><div className="capability-grid">{c.capabilities.map((capability) => <div key={capability}><span aria-hidden="true">+</span>{capability}</div>)}</div></Section>
    <Section id="vision" alt className="company-section"><div className="company-intro"><div><p className="eyebrow">{c.vision[0]}</p><h2>{c.vision[1]}</h2></div><p className="section-sub">{c.vision[2]}</p></div><div className="vision-flow"><div>{c.visionFlow[0]}</div><b aria-hidden="true">→</b><div>{c.visionFlow[1]}</div><b aria-hidden="true">→</b><div>{c.visionFlow[2]}</div></div></Section>
    <Section id="values" className="company-section company-section--closing"><p className="eyebrow">{c.values[0]}</p><h2>{c.values[1]}</h2><p className="section-sub">{c.values[2]}</p></Section>
  </>;
}
export default Company;
