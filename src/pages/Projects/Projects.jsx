import Section from "../../components/Section/Section";
import Content from "../../components/Content/Content";
import Media from "../../components/Media/Media";
import content from "../../data/content.json";
export default function Projects() {
  const data = content.project;
  return (
    <Section>
      <article className="prose project" lang="pt">
        <h1>{data.title[0].text}</h1>
        <Content blocks={data.title.slice(1)} />
        <Media name="pharmarobot-project" eager />
        <Content blocks={data.details} document />
      </article>
    </Section>
  );
}
