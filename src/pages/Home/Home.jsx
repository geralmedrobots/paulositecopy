import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import { useI18n } from "../../i18n/i18n";
import "./Home.css";

function Home() {
  const { t, path } = useI18n();
  const c = t.home;
  return <>
    <Hero className="hero--home" kicker={c.hero.eyebrow} title={c.hero.title} lead={c.hero.description} primaryCta={{ to: path("/solutions"), label: c.hero.primaryCta }} secondaryCta={{ to: path("/contact"), label: c.hero.secondaryCta }} />
    <Section id="challenge" className="home-section home-section--challenge"><div className="section-intro"><div><p className="eyebrow">{c.challenge.eyebrow}</p><h2>{c.challenge.title}</h2></div><p className="section-sub">{c.challenge.description}</p></div><div className="logistics-stream" aria-label={c.challenge.eyebrow}>{c.logistics.map((item, index) => <div className="logistics-stream__item" key={item}><span>0{index + 1}</span>{item}<i aria-hidden="true">↗</i></div>)}</div></Section>
    <Section id="approach" alt className="home-section"><div className="section-intro"><div><p className="eyebrow">{c.approach.eyebrow}</p><h2>{c.approach.title}</h2></div><p className="section-sub">{c.approach.description}</p></div><div className="approach-grid">{c.layers.map(([title, description], index) => <FeatureCard key={title} title={<><span className="feature-card__number">0{index + 1}</span>{title}</>} description={description} />)}</div></Section>
    <Section id="pharmarobot" className="home-section home-section--pharma"><div className="pharma-layout"><div><p className="eyebrow">{c.pharma.eyebrow}</p><h2>PharmaRobot</h2><p className="pharma-layout__tagline">{c.pharma.title}</p><p className="section-sub">{c.pharma.description}</p><Button to={path("/projects/pharmarobot")} variant="outline">{c.pharma.action}</Button></div><div className="mission-flow" aria-label={c.pharma.title}><div className="mission-flow__line" aria-hidden="true" />{c.mission.map((step, index) => <div className="mission-flow__step" key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}</div></div></Section>
    <Section id="infrastructure" alt className="home-section"><div className="section-intro"><div><p className="eyebrow">{c.vision.eyebrow}</p><h2>{c.vision.title}</h2></div><p className="section-sub">{c.vision.description}</p></div><div className="evolution" aria-label={c.vision.title}>{c.evolution.map((item, index) => <div className="evolution__step" key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 3 && <b aria-hidden="true">→</b>}</div>)}</div></Section>
    <Section id="value" className="home-section home-section--value"><div className="value-layout"><div><p className="eyebrow">{c.value.eyebrow}</p><h2>{c.value.title}</h2></div><div className="value-list">{c.values.map((item) => <div key={item}><span>+</span>{item}</div>)}</div></div></Section>
    <section className="home-cta"><div className="container"><p className="eyebrow">{c.cta.eyebrow}</p><h2>{c.cta.title}</h2><Button to={path("/contact")}>{c.cta.action}</Button></div></section>
  </>;
}
export default Home;
