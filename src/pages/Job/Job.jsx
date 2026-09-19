import Section from "../../components/Section/Section";
import Content from "../../components/Content/Content";
import ApplyButton from "../../components/ApplyButton/ApplyButton";
import content from "../../data/content.json";
import { text } from "../../utils/content";
export default function Job({ job }) {
  const data = content[job];
  return (
    <Section>
      <h1>{text(data.title)}</h1>
      <div className="job-layout">
        <div className="prose">
          <Content blocks={data.description} document />
        </div>
        <aside className="job-details">
          <Content blocks={data.details} />
          <ApplyButton />
        </aside>
      </div>
    </Section>
  );
}
