import { pharmaRobotProject as project } from "../../data/products";
import { useI18n } from "../../i18n/i18n";
import operationSheet from "../../assets/pages/project/pharmarobot-operation-sheet.png";
import "./Projects.css";

function Fact({ label, children }) {
  return <div className="project-fact"><dt>{label}</dt><dd>{children}</dd></div>;
}

function Projects() {
  const { t } = useI18n();
  const copy = t.projects;

  return (
    <>
      <section className="project-heading">
        <div className="container">
          <h1>{project.name}</h1>
          <p>{project.tagline}</p>
        </div>
      </section>
      <section className="project-presentation">
        <div className="container">
          <p className="project-reference">{copy.labels.reference}: {project.reference}</p>
          <h2>{copy.presentation}</h2>
          <div className="project-presentation__grid">
            <div>
              <h3>{copy.labels.objective}</h3>
              <p>{project.objective}</p>
            </div>
            <div>
              <h3>{copy.labels.projectSummary}</h3>
              <p>{project.synthesis}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="project-information">
        <div className="container project-information__grid">
          <div>
            <p className="eyebrow">{copy.info.eyebrow}</p>
            <h2>{copy.info.title}</h2>
            <dl className="project-facts">
              <Fact label={copy.labels.scientificArea}>{project.scientificArea}</Fact>
              <Fact label={copy.labels.interventionArea}>{project.interventionArea}</Fact>
              <Fact label={copy.labels.researchers}>{project.ucResearcher}</Fact>
              <Fact label={copy.labels.organicUnit}>{project.ucUnit}</Fact>
              <Fact label={copy.labels.participants}>{project.participants.join(" · ")}</Fact>
              <Fact label={copy.labels.fundingInstitution}>{project.fundingInstitution}</Fact>
              <Fact label={copy.labels.fundingProgramme}>{project.fundingProgram}</Fact>
              <Fact label={copy.labels.executionPeriod}>{project.executionPeriod}</Fact>
              <Fact label={copy.labels.totalEligibleCost}>{project.totalEligibleCost}</Fact>
              <Fact label={copy.labels.euSupport}>{project.euSupport}</Fact>
              <Fact label={copy.labels.projectTechnician}>{project.projectTechnician}</Fact>
              <Fact label={copy.labels.contact}>{project.contact}</Fact>
            </dl>
          </div>
          <figure className="project-sheet">
            <img src={operationSheet} width="1240" height="1753" alt={copy.operationSheetAlt} loading="lazy" decoding="async" />
            <figcaption>{copy.operationSheetCaption}</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}

export default Projects;
