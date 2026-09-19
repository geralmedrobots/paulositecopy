import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import ImageSection from "../../components/ImageSection/ImageSection";
import Content from "../../components/Content/Content";
import Media from "../../components/Media/Media";
import content from "../../data/content.json";
import { text } from "../../utils/content";
const data = content.company;
export default function Company() {
  return (
    <>
      <Hero
        title={text(data.title)}
        lead={text(data.intro)}
        media="company-hero"
      />
      <Section>
        <div className="prose">
          <h2>{text(data.visionTitle)}</h2>
          <Content blocks={data.vision} />
        </div>
      </Section>
      <ImageSection
        title={text(data.valuesTitle)}
        blocks={data.values}
        image="company-engineer"
        reverse
      />
      <Section>
        <div className="prose">
          <h2>{text(data.missionTitle)}</h2>
          <Content blocks={data.mission} />
        </div>
      </Section>
      <div className="container">
        <Media name="company-team" className="full-image" />
      </div>
      <Section>
        <div className="prose">
          <h2>{text(data.goalsTitle)}</h2>
          <Content blocks={data.goals} />
        </div>
      </Section>
    </>
  );
}
