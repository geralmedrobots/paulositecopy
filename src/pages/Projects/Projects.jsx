import { useEffect } from "react";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { pharmaRobotProject as p } from "../../data/products";
import { projects } from "../../data/projects";
import "./Projects.css";

const missionSteps = ["Hospital pharmacy", "Medication loading", "Autonomous mission", "Hospital navigation", "Elevator / infrastructure interaction", "Clinical service / emergency department", "Delivery", "Return / next mission"];
const architecture = [
  ["Robot", "Mobile platform · Sensors · Payload / storage system · Safety systems"],
  ["Autonomy", "Localisation · Navigation · Obstacle detection · Mission execution"],
  ["Infrastructure", "Elevators · Doors · Charging · Hospital network"],
  ["Software", "Mission management · Fleet management · Monitoring · Logging"],
  ["Hospital workflow", "Pharmacy · Transport · Delivery point · Return mission"],
];

function Projects() {
  useEffect(() => { document.title = "Projects | Med Robots"; }, []);
  return <>
    <section className="project-hero"><div className="container"><p className="eyebrow">Current R&amp;D project</p><h1>PharmaRobot</h1><p>Autonomous Medication Logistics for Hospitals</p></div></section>
    <Section id="project-overview" className="project-section"><div className="project-intro"><div><p className="eyebrow">The objective</p><h2>Making urgent medication transport an autonomous mission.</h2></div><p className="section-sub">PharmaRobot is an R&amp;D project focused on an autonomous robot for medication distribution in hospital environments. The project information below is based on the existing public Med Robots project content.</p></div><div className="project-callout">{p.objective}</div></Section>
    <Section id="project-mission" alt className="project-section"><div className="section-intro"><div><p className="eyebrow">The mission</p><h2>A workflow people can understand at a glance.</h2></div><p className="section-sub">The exact operational configuration depends on the hospital environment and project development. This diagram shows the intended high-level mission logic.</p></div><div className="mission-timeline">{missionSteps.map((step, index) => <div className="mission-timeline__step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < missionSteps.length - 1 && <b aria-hidden="true">↓</b>}</div>)}</div></Section>
    <Section id="project-architecture" className="project-section"><div className="section-intro"><div><p className="eyebrow">System architecture</p><h2>Five layers, one operational system.</h2></div><p className="section-sub">A high-level view of the capabilities that must work together for hospital medication logistics. It intentionally avoids proprietary implementation detail.</p></div><div className="architecture-grid">{architecture.map(([title, text], index) => <div className="architecture-block" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></Section>
    <Section id="hospital-environment" alt className="project-section"><div className="project-intro"><div><p className="eyebrow">Hospital environment</p><h2>Robotics for a demanding operational context.</h2></div><p className="section-sub">Hospitals combine dynamic pedestrian traffic, narrow corridors, moving trolleys, temporary obstacles, restricted areas, multiple floors, elevators and continuous operations.</p></div><div className="environment-strip"><span>Dynamic traffic</span><span>Shared spaces</span><span>Multiple floors</span><span>Restricted areas</span><span>Continuous operations</span></div></Section>
    <Section id="project-information" className="project-section"><div className="section-intro"><div><p className="eyebrow">Institutional project information</p><h2>Research, development and collaboration.</h2></div><p className="section-sub">Verified project and funding information is separated from the product narrative below.</p></div><div className="project-box"><dl><dt>Project name</dt><dd>{p.name}</dd><dt>Objective</dt><dd>{p.synthesis}</dd><dt>Scientific area</dt><dd>{p.scientificArea}</dd><dt>Execution period</dt><dd>{p.executionPeriod}</dd></dl><dl><dt>Reference</dt><dd>{p.reference}</dd><dt>Funding programme</dt><dd>{p.fundingProgram}</dd><dt>Participants</dt><dd>{p.participants.join(" · ")}</dd><dt>EU support</dt><dd>{p.euSupport}</dd></dl><div className="project-box__funded">Cofinanciado por Portugal 2030 · {p.fundingInstitution} · Total eligible cost: {p.totalEligibleCost}</div></div></Section>
    <Section id="project-portfolio" alt className="project-section"><div className="section-intro"><div><p className="eyebrow">Project portfolio</p><h2>Current work and accumulated experience.</h2></div><p className="section-sub">The project architecture is ready to grow as new validated R&amp;D work is made public.</p></div><div className="project-portfolio">{projects.map((project) => <article className="portfolio-card" key={project.slug}><span>{project.type}</span><h3>{project.name}</h3><p>{project.tagline}</p><p className="portfolio-card__description">{project.description}</p><Button to={project.route} variant="outline">View project</Button></article>)}</div></Section>
    <section className="project-cta"><div className="container"><p className="eyebrow">Research and integration</p><h2>Talk to Med Robots about hospital logistics.</h2><Button to="/contact">Contact Us</Button></div></section>
  </>;
}
export default Projects;
