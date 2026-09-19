import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import ImageSection from "../../components/ImageSection/ImageSection";
import Content from "../../components/Content/Content";
import Media from "../../components/Media/Media";
import content from "../../data/content.json";
import ProductTitle from "../../components/ProductTitle/ProductTitle";
const data = content.originalHome;
const blocks = (value) =>
  value
    .split("\n")
    .filter(Boolean)
    .map((text) => ({ type: "paragraph", text }));
export default function OriginalHome() {
  return (
    <>
      <Hero title={data[0]} lead={data[1]} media="home-hero" home />
      <Section>
        <ProductTitle />
        <div className="prose">
          <p>{data[2]}</p>
          <Media name="ultrabot-overview" alt="UltraBot" />
          <Content blocks={blocks(data[3])} />
        </div>
        <dl className="statistics">
          {[4, 6, 8, 10, 12, 14].map((i) => (
            <div key={i}>
              <dt>{data[i]}</dt>
              <dd>{data[i + 1]}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section>
        <div className="prose">
          <h2>{data[16]}</h2>
          <p>{data[17]}</p>
        </div>
      </Section>
      {[
        ["hospital-automation", 18],
        ["innovation-engineering", 20],
        ["hospital-objective", 22],
        ["engineering-team", 24],
      ].map(([image, i], n) => (
        <ImageSection
          key={i}
          title={data[i]}
          blocks={blocks(data[i + 1])}
          image={image}
          reverse={n % 2 === 0}
        />
      ))}
    </>
  );
}
