import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { pharmaRobotProject as p } from "../../data/products";
import { useI18n } from "../../i18n/i18n";
import "./Projects.css";

function Projects() {
  const { t, path } = useI18n(); const c = t.projects;
  const cards = [{ name: "PharmaRobot", route: "/projects/pharmarobot" }, { name: "UltraBot", route: "/ultrabot" }];
  return <>
    <section className="project-hero"><div className="container"><p className="eyebrow">{c.hero[0]}</p><h1>PharmaRobot</h1><p>{c.hero[1]}</p></div></section>
    <Section id="project-overview" className="project-section"><div className="project-intro"><div><p className="eyebrow">{c.overview[0]}</p><h2>{c.overview[1]}</h2></div><p className="section-sub">{c.overview[2]}</p></div><div className="project-callout">{c.overview[3]}</div></Section>
    <Section id="project-mission" alt className="project-section"><div className="section-intro"><div><p className="eyebrow">{c.missionHeader[0]}</p><h2>{c.missionHeader[1]}</h2></div><p className="section-sub">{c.missionHeader[2]}</p></div><div className="mission-timeline">{c.mission.map((step, index) => <div className="mission-timeline__step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < c.mission.length - 1 && <b aria-hidden="true">↓</b>}</div>)}</div></Section>
    <Section id="project-architecture" className="project-section"><div className="section-intro"><div><p className="eyebrow">{c.architectureHeader[0]}</p><h2>{c.architectureHeader[1]}</h2></div><p className="section-sub">{c.architectureHeader[2]}</p></div><div className="architecture-grid">{c.architecture.map(([title, text], index) => <div className="architecture-block" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></Section>
    <Section id="hospital-environment" alt className="project-section"><div className="project-intro"><div><p className="eyebrow">{c.environment[0]}</p><h2>{c.environment[1]}</h2></div><p className="section-sub">{c.environment[2]}</p></div><div className="environment-strip">{c.environmentItems.map((item) => <span key={item}>{item}</span>)}</div></Section>
    <Section id="project-information" className="project-section"><div className="section-intro"><div><p className="eyebrow">{c.info[0]}</p><h2>{c.info[1]}</h2></div><p className="section-sub">{c.info[2]}</p></div><div className="project-box"><dl><dt>{c.labels[0]}</dt><dd>{p.name}</dd><dt>{c.labels[1]}</dt><dd>{c.synthesis}</dd><dt>{c.labels[2]}</dt><dd>{c.scientificArea}</dd><dt>{c.labels[3]}</dt><dd>{p.executionPeriod}</dd></dl><dl><dt>{c.labels[4]}</dt><dd>{p.reference}</dd><dt>{c.labels[5]}</dt><dd>{p.fundingProgram}</dd><dt>{c.labels[6]}</dt><dd>{p.participants.join(" · ")}</dd><dt>{c.labels[7]}</dt><dd>{p.euSupport}</dd></dl><div className="project-box__funded">{t.footer.funded} · {p.fundingInstitution} · {c.labels[8]}: {p.totalEligibleCost}</div></div></Section>
    <Section id="project-portfolio" alt className="project-section"><div className="section-intro"><div><p className="eyebrow">{c.portfolio[0]}</p><h2>{c.portfolio[1]}</h2></div><p className="section-sub">{c.portfolio[2]}</p></div><div className="project-portfolio">{cards.map((project, index) => <article className="portfolio-card" key={project.name}><span>{c.cards[index][0]}</span><h3>{project.name}</h3><p>{c.cards[index][1]}</p><p className="portfolio-card__description">{c.cards[index][2]}</p><Button to={path(project.route)} variant="outline">{c.portfolio[3]}</Button></article>)}</div></Section>
    <section className="project-cta"><div className="container"><p className="eyebrow">{c.cta[0]}</p><h2>{c.cta[1]}</h2><Button to={path("/contact")}>{c.cta[2]}</Button></div></section>
  </>;
}
export default Projects;
