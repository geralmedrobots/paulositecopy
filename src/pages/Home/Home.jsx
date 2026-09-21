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
    <Hero className="hero--home" kicker={c.hero[0]} title={c.hero[1]} lead={c.hero[2]} primaryCta={{ to: path("/solutions"), label: c.hero[3] }} secondaryCta={{ to: path("/contact"), label: c.hero[4] }} />
    <Section id="challenge" className="home-section home-section--challenge"><div className="section-intro"><div><p className="eyebrow">{c.challenge[0]}</p><h2>{c.challenge[1]}</h2></div><p className="section-sub">{c.challenge[2]}</p></div><div className="logistics-stream" aria-label={c.challenge[0]}>{c.logistics.map((item, index) => <div className="logistics-stream__item" key={item}><span>0{index + 1}</span>{item}<i aria-hidden="true">↗</i></div>)}</div></Section>
    <Section id="approach" alt className="home-section"><div className="section-intro"><div><p className="eyebrow">{c.approach[0]}</p><h2>{c.approach[1]}</h2></div><p className="section-sub">{c.approach[2]}</p></div><div className="approach-grid">{c.layers.map(([title, description], index) => <FeatureCard key={title} title={<><span className="feature-card__number">0{index + 1}</span>{title}</>} description={description} />)}</div></Section>
    <Section id="pharmarobot" className="home-section home-section--pharma"><div className="pharma-layout"><div><p className="eyebrow">{c.pharma[0]}</p><h2>PharmaRobot</h2><p className="pharma-layout__tagline">{c.pharma[1]}</p><p className="section-sub">{c.pharma[2]}</p><Button to={path("/projects/pharmarobot")} variant="outline">{c.pharma[3]}</Button></div><div className="mission-flow" aria-label={c.pharma[1]}><div className="mission-flow__line" aria-hidden="true" />{c.mission.map((step, index) => <div className="mission-flow__step" key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}</div></div></Section>
    <Section id="infrastructure" alt className="home-section"><div className="section-intro"><div><p className="eyebrow">{c.vision[0]}</p><h2>{c.vision[1]}</h2></div><p className="section-sub">{c.vision[2]}</p></div><div className="evolution" aria-label={c.vision[1]}>{c.evolution.map((item, index) => <div className="evolution__step" key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 3 && <b aria-hidden="true">→</b>}</div>)}</div></Section>
    <Section id="value" className="home-section home-section--value"><div className="value-layout"><div><p className="eyebrow">{c.value[0]}</p><h2>{c.value[1]}</h2></div><div className="value-list">{c.values.map((item) => <div key={item}><span>+</span>{item}</div>)}</div></div></Section>
    <section className="home-cta"><div className="container"><p className="eyebrow">{c.cta[0]}</p><h2>{c.cta[1]}</h2><Button to={path("/contact")}>{c.cta[2]}</Button></div></section>
  </>;
}
export default Home;
