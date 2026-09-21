import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { useI18n } from "../../i18n/i18n";
import "./Benefits.css";

function Benefits() {
  const { t, path } = useI18n(); const c = t.solutions;
  return <>
    <section className="solutions-hero"><div className="container"><p className="eyebrow">{c.hero.eyebrow}</p><h1>{c.hero.title}</h1><p>{c.hero.description}</p></div></section>
    <Section id="system" className="solutions-section"><div className="section-intro"><div><p className="eyebrow">{c.system.eyebrow}</p><h2>{c.system.title}</h2></div><p className="section-sub">{c.system.description}</p></div><div className="system-stack">{c.layers.map(([title, text], index) => <div className="system-stack__layer" key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></div>)}</div></Section>
    <Section id="navigation" alt className="solutions-section"><div className="section-intro"><div><p className="eyebrow">{c.navigation.eyebrow}</p><h2>{c.navigation.title}</h2></div><p className="section-sub">{c.navigation.description}</p></div><div className="stage-flow">{c.stages.map((stage, index) => <div className="stage-flow__item" key={stage}><span>0{index + 1}</span><strong>{stage}</strong>{index < c.stages.length - 1 && <b aria-hidden="true">↓</b>}</div>)}</div></Section>
    <Section id="integration" className="solutions-section"><div className="section-intro"><div><p className="eyebrow">{c.integration.eyebrow}</p><h2>{c.integration.title}</h2></div><p className="section-sub">{c.integration.description}</p></div><div className="integration-grid">{c.areas.map(([title, status]) => <div className="integration-card" key={title}><span className="integration-card__mark" aria-hidden="true">+</span><strong>{title}</strong><small>{status}</small></div>)}</div></Section>
    <Section id="workflows" alt className="solutions-section"><div className="section-intro"><div><p className="eyebrow">{c.workflows.eyebrow}</p><h2>{c.workflows.title}</h2></div><p className="section-sub">{c.workflows.description}</p></div><div className="workflow-domains">{c.domains.map((domain, index) => <div key={domain}><span>0{index + 1}</span>{domain}</div>)}</div><Button to={path("/projects/pharmarobot")}>{c.workflows.action}</Button></Section>
  </>;
}
export default Benefits;
