import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import ImageSection from "../../components/ImageSection/ImageSection";
import Content from "../../components/Content/Content";
import Media from "../../components/Media/Media";
import content from "../../data/content.json";
const data = content.solutions;
const blocks = (value) =>
  value
    .split("\n")
    .filter(Boolean)
    .map((text) => ({ type: "paragraph", text }));
export default function Solutions() {
  return (
    <>
      <Hero title={data[1]} lead={data[0]} media="ultrabot-hero" />
      <Section>
        <div className="prose">
          <h2>{data[2]}</h2>
          <p>{data[3]}</p>
          <div className="two-columns">
            {[4, 6].map((i) => (
              <div key={i}>
                <h3 className="ruled-title">{data[i]}</h3>
                <p>{data[i + 1]}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Media name="ultrabot-engineering" className="full-image" />
      <Section>
        <div className="prose">
          <h2>{data[8]}</h2>
          <Content blocks={blocks(data[9])} />
          <Media name="ultrabot-product" alt="UltraBot" />
        </div>
      </Section>
      <ImageSection
        title={data[10]}
        blocks={blocks(data[11])}
        image="medical-professional"
        reverse
      >
        <h3>{data[12]}</h3>
        <p>{data[13]}</p>
      </ImageSection>
      <ImageSection
        title={data[14]}
        blocks={blocks(data[15])}
        image="logistics-robot"
      />
      <ImageSection
        title={data[16]}
        blocks={blocks(data[17])}
        image="robotics-research"
        reverse
      >
        <p>{data[18]}</p>
      </ImageSection>
      <ImageSection
        title={data[19]}
        blocks={blocks(data[20])}
        image="social-robot"
      >
        <h3>{data[21]}</h3>
        <Content blocks={blocks(data[22])} />
      </ImageSection>
      <ImageSection
        title={data[23]}
        blocks={blocks(data[24])}
        image="social-robot-engineering"
        reverse
      />
    </>
  );
}
