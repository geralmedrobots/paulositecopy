import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import { ultraBotFeatures, companyContent } from "../../data/products";
import "./Home.css";

function Home() {
  return (
    <>
      <Hero
        kicker="We work to make the greatest technological advances to reach hospitals, where it can be most beneficial."
        title="Robotic disinfection solutions for healthcare facilities"
        lead="Introducing the UltraBot — the ultimate UV-C light disinfection robot engineered for healthcare environments."
        primaryCta={{ to: "/contacts", label: "Order Now" }}
        secondaryCta={{ to: "/ultrabot", label: "Learn more" }}
      />

      <Section id="ultrabot-preview">
        <p className="eyebrow">Product</p>
        <h2>UltraBot</h2>
        <p className="section-sub">
          Introducing the UltraBot, the ultimate UV-C light disinfection robot engineered for
          healthcare environments.
        </p>

        <div className="home__grid-4">
          {ultraBotFeatures.map((feature) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
          ))}
        </div>

        <Button to="/ultrabot">Order Now</Button>
      </Section>

      <Section alt id="innovation">
        <div className="home__grid-2">
          <div>
            <p className="eyebrow">Innovation</p>
            <h2>Innovation</h2>
            <p className="section-sub">
              At Med Robots we are strongly committed to a strategy of constant innovation, where
              the product, in addition to design and quality, seeks to respond to the trends and
              needs of the worldwide hospital disinfection market.
            </p>
          </div>
        </div>
      </Section>

      <Section id="objective">
        <p className="eyebrow">Objective</p>
        <h2>What We Do</h2>
        <p className="section-sub">
          We aim to identify needs in the healthcare disinfection sector that can be met with
          robotic products. Our mission is to present innovative and differentiating solutions
          for a safer hospital environment.
        </p>
        <p className="section-sub">{companyContent.vision}</p>
      </Section>
    </>
  );
}

export default Home;
