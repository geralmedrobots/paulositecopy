import Section from "../../components/Section/Section";
import Content from "../../components/Content/Content";
import Media from "../../components/Media/Media";
import content from "../../data/content.json";
export default function Legal({ page }) {
  const blocks = content[page].document;
  return (
    <Section>
      <article className="prose">
        <h1>{blocks[0].text}</h1>
        <Content blocks={blocks.slice(1)} document />
        {page === "genderequality" && (
          <Media name="administration-signatures" />
        )}
      </article>
    </Section>
  );
}
