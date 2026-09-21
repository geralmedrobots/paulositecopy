import { useEffect } from "react";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { integrationAreas, navigationStages, solutionSystemLayers, workflowDomains } from "../../data/solutions";
import "./Benefits.css";

function Benefits() {
  useEffect(() => { document.title = "Solutions | Med Robots"; }, []);
  return <>
    <section className="solutions-hero"><div className="container"><p className="eyebrow">Systems approach</p><h1>Autonomous Logistics for Hospitals</h1><p>Med Robots develops and integrates autonomous robotic systems designed to support hospital logistics operations.</p></div></section>
    <Section id="system" className="solutions-section"><div className="section-intro"><div><p className="eyebrow">The system</p><h2>Useful robotics is an integrated capability.</h2></div><p className="section-sub">A mobile robot is only one part of the solution. The operational value comes from connecting autonomy, infrastructure, software and hospital workflows.</p></div><div className="system-stack">{solutionSystemLayers.map((layer) => <div className="system-stack__layer" key={layer.title}><span>{layer.label}</span><strong>{layer.title}</strong><p>{layer.text}</p></div>)}</div></Section>
    <Section id="navigation" alt className="solutions-section"><div className="section-intro"><div><p className="eyebrow">Autonomous navigation</p><h2>Designed for dynamic shared environments.</h2></div><p className="section-sub">Hospitals bring together people, beds, trolleys, medical equipment and logistics staff. Navigation must respond to the environment while keeping the mission in view.</p></div><div className="stage-flow">{navigationStages.map((stage, index) => <div className="stage-flow__item" key={stage}><span>0{index + 1}</span><strong>{stage}</strong>{index < navigationStages.length - 1 && <b aria-hidden="true">↓</b>}</div>)}</div></Section>
    <Section id="integration" className="solutions-section"><div className="section-intro"><div><p className="eyebrow">Hospital integration</p><h2>The environment around the robot matters.</h2></div><p className="section-sub">The following areas represent integration contexts within a hospital robotics architecture. Their deployment status depends on the specific environment and project scope.</p></div><div className="integration-grid">{integrationAreas.map((item) => <div className="integration-card" key={item.title}><span className="integration-card__mark" aria-hidden="true">+</span><strong>{item.title}</strong><small>{item.status}</small></div>)}</div></Section>
    <Section id="workflows" alt className="solutions-section"><div className="section-intro"><div><p className="eyebrow">Application domains</p><h2>Automation in service of hospital workflows.</h2></div><p className="section-sub">These are application domains for hospital logistics systems. They are not presented as a list of currently deployed services.</p></div><div className="workflow-domains">{workflowDomains.map((domain, index) => <div key={domain}><span>0{index + 1}</span>{domain}</div>)}</div><Button to="/projeto">See PharmaRobot</Button></Section>
  </>;
}
export default Benefits;
