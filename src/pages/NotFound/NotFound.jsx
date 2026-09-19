import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
export default function NotFound() {
  return (
    <Section>
      <div className="prose">
        <h1>404</h1>
        <p>Page not found.</p>
        <Button to="/">Home</Button>
      </div>
    </Section>
  );
}
