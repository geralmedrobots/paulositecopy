import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import ImageSection from "../../components/ImageSection/ImageSection";
import Content from "../../components/Content/Content";
import content from "../../data/content.json";
import { text } from "../../utils/content";
import { Link } from "react-router-dom";
import { jobKeys } from "../../data/jobs";
const data = content.recruitment;
export default function Recruitment() {
  return (
    <>
      <Hero
        title={text(data.title)}
        lead={text(data.intro)}
        media="recruitment-hero"
      />
      <Section>
        <div className="prose">
          <h2>{text(data.workingTitle)}</h2>
          <Content blocks={data.working} />
        </div>
      </Section>
      <Section>
        <h2>{text(data.opportunitiesTitle)}</h2>
        <div className="opportunities">
          {jobKeys.map((key, i) => (
            <article className="opportunity" key={key}>
              <h3>
                <Link to={`/${key}`}>{text(content[key].title)}</Link>
              </h3>
              <Content blocks={data[`location${i + 1}`]} />
            </article>
          ))}
        </div>
      </Section>
      <ImageSection
        title={text(data.teamTitle)}
        blocks={data.team}
        image="recruitment-engineers"
        reverse
      />
    </>
  );
}
