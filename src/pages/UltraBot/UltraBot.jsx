import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import ImageSection from "../../components/ImageSection/ImageSection";
import Content from "../../components/Content/Content";
import Media from "../../components/Media/Media";
import content from "../../data/content.json";
import { text } from "../../utils/content";
const data = content.ultrabot;
export default function UltraBot() {
  return (
    <>
      <Hero
        title={text(data.title)}
        lead={text(data.intro)}
        media="ultrabot-hero"
      />
      <Section>
        <div className="prose">
          <h2>{text(data.uvTitle)}</h2>
          <Content blocks={data.uv} />
          <div className="two-columns">
            {["disinfection", "why"].map((key) => (
              <div key={key}>
                <h3 className="ruled-title">{text(data[`${key}Title`])}</h3>
                <Content blocks={data[key]} />
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Media name="ultrabot-engineering" className="full-image" />
      <Section>
        <div className="prose">
          <h2>{text(data.howTitle)}</h2>
          <Content blocks={data.how} />
          <Media name="ultrabot-product" alt="UltraBot" />
        </div>
      </Section>
      <ImageSection
        title={text(data.continuousTitle)}
        blocks={data.continuous}
        image="medical-professional"
        reverse
      />
    </>
  );
}
