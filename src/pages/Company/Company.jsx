import { useEffect } from "react";
import Section from "../../components/Section/Section";
import { companyContent } from "../../data/products";
import "./Company.css";

const focusAreas = ["Hospital robotics", "Autonomous logistics", "System integration", "Intelligent software"];
const capabilities = ["Robotics engineering", "Software", "Autonomous navigation", "Systems integration", "Hospital workflow knowledge", "Research & development"];

function Company() {
  useEffect(() => { document.title = "Med Robots | Company"; }, []);
  return <>
    <section className="company-hero"><div className="container"><p className="eyebrow">Med Robots</p><h1>Technology for the logistics of care.</h1><p>Med Robots is a technology company focused on robotics for healthcare environments.</p></div></section>
    <Section id="who-we-are" className="company-section"><div className="company-intro"><div><p className="eyebrow">Who we are</p><h2>Building capability around real hospital needs.</h2></div><p className="section-sub">We develop and integrate robotic solutions that support hospital operations and help reduce repetitive logistics workloads. The objective is to support healthcare professionals — not replace them.</p></div><div className="company-statement">{companyContent.mission}</div></Section>
    <Section id="focus" alt className="company-section"><div className="company-intro"><div><p className="eyebrow">Our focus</p><h2>A focused technology platform.</h2></div><p className="section-sub">Med Robots brings the relevant disciplines together around the hospital environment.</p></div><div className="focus-grid">{focusAreas.map((area, index) => <div key={area}><span>0{index + 1}</span><strong>{area}</strong></div>)}</div></Section>
    <Section id="approach" className="company-section"><div className="company-intro"><div><p className="eyebrow">Our approach</p><h2>From engineering to operational integration.</h2></div><p className="section-sub">Credible hospital robotics requires more than a hardware component. It requires a clear understanding of how a system fits into its environment and workflow.</p></div><div className="capability-grid">{capabilities.map((capability) => <div key={capability}><span aria-hidden="true">+</span>{capability}</div>)}</div></Section>
    <Section id="vision" alt className="company-section"><div className="company-intro"><div><p className="eyebrow">Our vision</p><h2>From autonomous robots to robotic hospital infrastructure.</h2></div><p className="section-sub">{companyContent.vision}</p></div><div className="vision-flow"><div>Autonomous robots</div><b aria-hidden="true">→</b><div>Connected robotic systems</div><b aria-hidden="true">→</b><div>Robotic hospital infrastructure</div></div></Section>
    <Section id="values" className="company-section company-section--closing"><p className="eyebrow">R&amp;D positioning</p><h2>Technology developed with care, capability and continuous improvement.</h2><p className="section-sub">{companyContent.values}</p></Section>
  </>;
}
export default Company;
