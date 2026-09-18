import Section from "../../components/Section/Section";
import { pharmaRobotProject as p } from "../../data/products";
import "./Projects.css";

function Projects() {
  return (
    <Section id="project">
      <p className="eyebrow">Financiamento &amp; I&amp;D</p>
      <h2>{p.name}</h2>
      <p className="section-sub">
        {p.tagline} — Referência: {p.reference}.
      </p>

      <div className="project-box">
        <dl>
          <dt>Objetivo</dt>
          <dd>{p.objective}</dd>
          <dt>Síntese</dt>
          <dd>{p.synthesis}</dd>
          <dt>Área de intervenção</dt>
          <dd>{p.interventionArea}</dd>
        </dl>

        <dl>
          <dt>Período de execução</dt>
          <dd>{p.executionPeriod}</dd>
          <dt>Custo total elegível</dt>
          <dd>{p.totalEligibleCost}</dd>
          <dt>Apoio financeiro da UE</dt>
          <dd>{p.euSupport}</dd>
          <dt>Instituições participantes</dt>
          <dd>{p.participants.join(" · ")}</dd>
        </dl>

        <div className="project-box__funded">
          Cofinanciado por Portugal 2030 · {p.fundingProgram} · {p.fundingInstitution}
        </div>
      </div>
    </Section>
  );
}

export default Projects;
