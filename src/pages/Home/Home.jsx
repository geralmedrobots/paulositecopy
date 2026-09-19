import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import ImageSection from "../../components/ImageSection/ImageSection";
import Content from "../../components/Content/Content";
import Media from "../../components/Media/Media";
import content from "../../data/content.json";
import { text } from "../../utils/content";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import ProductTitle from "../../components/ProductTitle/ProductTitle";
import OrderButton from "../../components/OrderButton/OrderButton";
import "./Home.css";
const data = content.home;
export default function Home() {
  return (
    <>
      <Hero
        title={text(data.tagline)}
        lead={text(data.intro)}
        media="home-hero"
        home
      />
      <Section id="ultrabot-preview">
        <ProductTitle />
        <div className="home__product-intro">
          <Content blocks={data.productIntro} />
        </div>
        <Media
          name="ultrabot-overview"
          alt="UltraBot"
          className="home__product"
        />
        <div className="home__order">
          <OrderButton />
        </div>
        <div className="home__features">
          {["safety", "navigation", "coverage", "charging"].map((key) => (
            <FeatureCard
              key={key}
              title={text(data[`${key}Title`])}
              description={text(data[key])}
            />
          ))}
        </div>
      </Section>
      <Section id="innovation" className="home__innovation">
        <Media name="innovation-engineering" />
        <h2>{text(data.innovationTitle)}</h2>
        <Content blocks={data.innovation} />
      </Section>
      <ImageSection
        id="objective"
        title={text(data.objectiveTitle)}
        blocks={data.objective}
        image="hospital-objective"
        reverse
      />
      <ImageSection
        id="activity"
        title={text(data.activityTitle)}
        blocks={data.activity}
        image="engineering-team"
        wide
      />
    </>
  );
}
