import Section from "../../components/Section/Section";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import { benefits } from "../../data/products";
import "./Benefits.css";

function Benefits() {
  return (
    <Section id="benefits">
      <p className="eyebrow">Why robotics in healthcare</p>
      <h2>Benefits</h2>
      <p className="section-sub">
        Key points on why is beneficial to include robotics in healthcare facilities.
      </p>

      <div className="benefits__grid">
        {benefits.map((item) => (
          <FeatureCard key={item.title} title={item.title} description={item.description} />
        ))}
      </div>
    </Section>
  );
}

export default Benefits;
