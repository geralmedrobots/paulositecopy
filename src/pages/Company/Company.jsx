import Section from "../../components/Section/Section";
import { useI18n } from "../../i18n/i18n";
import "./Company.css";

function Company() {
  const { t } = useI18n(); const c = t.company;
  return <>
    <section className="company-hero"><div className="container"><p className="eyebrow">{c.hero.eyebrow}</p><h1>{c.hero.title}</h1><p>{c.hero.description}</p></div></section>
    <Section id="who-we-are" className="company-section"><div className="company-intro"><div><p className="eyebrow">{c.who.eyebrow}</p><h2>{c.who.title}</h2></div><p className="section-sub">{c.who.description}</p></div><div className="company-statement">{c.who.statement}</div></Section>
    <Section id="focus" alt className="company-section"><div className="company-intro"><div><p className="eyebrow">{c.focus.eyebrow}</p><h2>{c.focus.title}</h2></div><p className="section-sub">{c.focus.description}</p></div><div className="focus-grid">{c.focusAreas.map((area, index) => <div key={area}><span>0{index + 1}</span><strong>{area}</strong></div>)}</div></Section>
    <Section id="approach" className="company-section"><div className="company-intro"><div><p className="eyebrow">{c.approach.eyebrow}</p><h2>{c.approach.title}</h2></div><p className="section-sub">{c.approach.description}</p></div><div className="capability-grid">{c.capabilities.map((capability) => <div key={capability}><span aria-hidden="true">+</span>{capability}</div>)}</div></Section>
    <Section id="vision" alt className="company-section"><div className="company-intro"><div><p className="eyebrow">{c.vision.eyebrow}</p><h2>{c.vision.title}</h2></div><p className="section-sub">{c.vision.description}</p></div><div className="vision-flow"><div>{c.visionFlow[0]}</div><b aria-hidden="true">→</b><div>{c.visionFlow[1]}</div><b aria-hidden="true">→</b><div>{c.visionFlow[2]}</div></div></Section>
    <Section id="values" className="company-section company-section--closing"><p className="eyebrow">{c.values.eyebrow}</p><h2>{c.values.title}</h2><p className="section-sub">{c.values.description}</p></Section>
  </>;
}
export default Company;
