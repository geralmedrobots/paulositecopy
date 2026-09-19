import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import ImageSection from "../../components/ImageSection/ImageSection";
import Content from "../../components/Content/Content";
import content from "../../data/content.json";
import { text } from "../../utils/content";
const data = content.benefits;
export default function Benefits() {
  return (
    <>
      <Hero
        title={text(data.title)}
        lead={text(data.intro)}
        media="benefits-hero"
      />
      <Section>
        <div className="prose">
          <h2>{text(data.costTitle)}</h2>
          <Content blocks={data.cost} />
        </div>
      </Section>
      <ImageSection
        title={text(data.sanitationTitle)}
        blocks={data.sanitation}
        image="hospital-sanitation"
        reverse
      />
      <ImageSection
        title={text(data.qualityTitle)}
        blocks={data.quality}
        image="hospital-patient"
      />
      <ImageSection
        title={text(data.healthcareTitle)}
        blocks={data.healthcare}
        image="hospital-staff"
        wide
      />
    </>
  );
}
