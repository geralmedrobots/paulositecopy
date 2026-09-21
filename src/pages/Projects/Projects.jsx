import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { pharmaRobotProject as p } from "../../data/products";
import { useI18n } from "../../i18n/i18n";
import "./Projects.css";

function Projects() {
  const { t, path } = useI18n(); const c = t.projects;
  const cards = [{ name: "PharmaRobot", route: "/projects/pharmarobot" }, { name: "UltraBot", route: "/ultrabot" }];
  return <>
    <section className="project-hero"><div className="container"><p className="eyebrow">{c.hero.eyebrow}</p><h1>PharmaRobot</h1><p>{c.hero.title}</p></div></section>
    <Section id="project-overview" className="project-section"><div className="project-intro"><div><p className="eyebrow">{c.overview.eyebrow}</p><h2>{c.overview.title}</h2></div><p className="section-sub">{c.overview.description}</p></div><div className="project-callout">{c.overview.statement}</div></Section>
    <Section id="project-mission" alt className="project-section"><div className="section-intro"><div><p className="eyebrow">{c.missionHeader.eyebrow}</p><h2>{c.missionHeader.title}</h2></div><p className="section-sub">{c.missionHeader.description}</p></div><div className="mission-timeline">{c.mission.map((step, index) => <div className="mission-timeline__step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < c.mission.length - 1 && <b aria-hidden="true">↓</b>}</div>)}</div></Section>
    <Section id="project-architecture" className="project-section"><div className="section-intro"><div><p className="eyebrow">{c.architectureHeader.eyebrow}</p><h2>{c.architectureHeader.title}</h2></div><p className="section-sub">{c.architectureHeader.description}</p></div><div className="architecture-grid">{c.architecture.map(([title, text], index) => <div className="architecture-block" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></Section>
    <Section id="hospital-environment" alt className="project-section"><div className="project-intro"><div><p className="eyebrow">{c.environment.eyebrow}</p><h2>{c.environment.title}</h2></div><p className="section-sub">{c.environment.description}</p></div><div className="environment-strip">{c.environmentItems.map((item) => <span key={item}>{item}</span>)}</div></Section>
    <Section id="project-information" className="project-section"><div className="section-intro"><div><p className="eyebrow">{c.info.eyebrow}</p><h2>{c.info.title}</h2></div><p className="section-sub">{c.info.description}</p></div><div className="project-box"><dl><dt>{c.labels.projectName}</dt><dd>{p.name}</dd><dt>{c.labels.objective}</dt><dd>{c.synthesis}</dd><dt>{c.labels.scientificArea}</dt><dd>{c.scientificArea}</dd><dt>{c.labels.executionPeriod}</dt><dd>{p.executionPeriod}</dd></dl><dl><dt>{c.labels.reference}</dt><dd>{p.reference}</dd><dt>{c.labels.fundingProgramme}</dt><dd>{p.fundingProgram}</dd><dt>{c.labels.participants}</dt><dd>{p.participants.join(" · ")}</dd><dt>{c.labels.euSupport}</dt><dd>{p.euSupport}</dd></dl><div className="project-box__funded">{t.footer.funded} · {p.fundingInstitution} · {c.labels.totalEligibleCost}: {p.totalEligibleCost}</div></div></Section>
    <Section id="project-portfolio" alt className="project-section"><div className="section-intro"><div><p className="eyebrow">{c.portfolio.eyebrow}</p><h2>{c.portfolio.title}</h2></div><p className="section-sub">{c.portfolio.description}</p></div><div className="project-portfolio">{cards.map((project, index) => <article className="portfolio-card" key={project.name}><span>{c.cards[index].type}</span><h3>{project.name}</h3><p>{c.cards[index].tagline}</p><p className="portfolio-card__description">{c.cards[index].description}</p><Button to={path(project.route)} variant="outline">{c.portfolio.action}</Button></article>)}</div></Section>
    <section className="project-cta"><div className="container"><p className="eyebrow">{c.cta.eyebrow}</p><h2>{c.cta.title}</h2><Button to={path("/contact")}>{c.cta.action}</Button></div></section>
  </>;
}
export default Projects;
