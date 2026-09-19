import Hero from "../../components/Hero/Hero";
import ImageSection from "../../components/ImageSection/ImageSection";
import content from "../../data/content.json";
import { text } from "../../utils/content";
const data = content.healthcare;
export default function Healthcare() {
  return (
    <>
      <Hero
        title={text(data.title)}
        lead={text(data.intro)}
        media="healthcare-hero"
      />
      <ImageSection
        title={text(data.technologyTitle)}
        blocks={data.overview}
        image="healthcare-paramedic"
      />
      <ImageSection
        title={text(data.eraTitle)}
        blocks={data.era}
        image="healthcare-technology"
        reverse
      />
      <ImageSection
        title={text(data.betterTitle)}
        blocks={data.better}
        image="nurse-and-patient"
        wide
      />
    </>
  );
}
