import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import { pharmaRobotProject as pharma } from "../../data/products";
import "./Home.css";

const approachLayers = [
  ["01", "Autonomous mobile robots", "Robotic platforms designed for repeatable internal transport missions."],
  ["02", "Hospital infrastructure", "A physical environment of corridors, lifts, doors, charging and handover points."],
  ["03", "Intelligent software", "Mission planning, fleet visibility and the operational logic that coordinates movement."],
  ["04", "Operational integration", "A deployment approach shaped around hospital and pharmacy workflows."],
];
const valuePoints = ["24/7 autonomous operation", "Predictable logistics workflows", "Traceability", "Scalable architecture", "Integration with hospital infrastructure"];

function Home() {
  return <>
    <Hero className="hero--home" kicker="Hospital robotics · Autonomous logistics" title="The Future of Hospital Logistics" lead="Med Robots develops and integrates autonomous robotic solutions for the complex logistics of hospital operations." primaryCta={{ to: "/benefits", label: "Explore Our Solutions" }} secondaryCta={{ to: "/contacts", label: "Contact Us" }} />
    <Section id="challenge" className="home-section home-section--challenge"><div className="section-intro"><div><p className="eyebrow">The challenge</p><h2>Hospitals move more than people.</h2></div><p className="section-sub">Medication, medical supplies, laboratory materials, sterile materials, food and equipment move continuously through hospital environments. That logistics work should support care — not compete with it.</p></div><div className="logistics-stream" aria-label="Examples of hospital logistics flows">{["Medication", "Medical supplies", "Laboratory materials", "Sterile materials", "Food", "Equipment"].map((item, index) => <div className="logistics-stream__item" key={item}><span>0{index + 1}</span>{item}<i aria-hidden="true">↗</i></div>)}</div></Section>
    <Section id="approach" alt className="home-section"><div className="section-intro"><div><p className="eyebrow">Our approach</p><h2>From robot to integrated capability.</h2></div><p className="section-sub">Med Robots does not simply provide a robot. We think in systems: the machine, the environment, the software and the operational reality of a hospital.</p></div><div className="approach-grid">{approachLayers.map(([number, title, description]) => <FeatureCard key={number} title={<><span className="feature-card__number">{number}</span>{title}</>} description={description} />)}</div></Section>
    <Section id="pharmarobot" className="home-section home-section--pharma"><div className="pharma-layout"><div><p className="eyebrow">Current R&amp;D project</p><h2>PharmaRobot</h2><p className="pharma-layout__tagline">Autonomous medication logistics for hospitals.</p><p className="section-sub">{pharma.synthesis}</p><Button to="/projeto" variant="outline">Explore PharmaRobot</Button></div><div className="mission-flow" aria-label="PharmaRobot mission workflow"><div className="mission-flow__line" aria-hidden="true" />{["Hospital pharmacy", "Autonomous transport", "Clinical service / emergency department", "Return / next mission"].map((step, index) => <div className="mission-flow__step" key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}</div></div></Section>
    <Section id="infrastructure" alt className="home-section"><div className="section-intro"><div><p className="eyebrow">Long-term vision</p><h2>A connected hospital logistics infrastructure.</h2></div><p className="section-sub">The long-term opportunity is a coordinated system that supports multiple workflows and missions as hospital needs evolve.</p></div><div className="evolution" aria-label="Evolution from one robot to connected hospital logistics">{["One robot", "Multiple missions", "Robotic fleet", "Connected hospital logistics"].map((item, index) => <div className="evolution__step" key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 3 && <b aria-hidden="true">→</b>}</div>)}</div></Section>
    <Section id="value" className="home-section home-section--value"><div className="value-layout"><div><p className="eyebrow">Operational value</p><h2>Designed for the way hospitals work.</h2></div><div className="value-list">{valuePoints.map((item) => <div key={item}><span>+</span>{item}</div>)}</div></div></Section>
    <section className="home-cta"><div className="container"><p className="eyebrow">The next shift in hospital operations</p><h2>Building the autonomous hospital infrastructure of tomorrow.</h2><Button to="/contacts">Talk to Med Robots</Button></div></section>
  </>;
}
export default Home;
