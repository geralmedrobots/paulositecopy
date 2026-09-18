import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ultraBotFeatures } from "../../data/products";
import "./UltraBot.css";

const ULTRABOT_ACTION_IMG =
  "https://static.wixstatic.com/media/7498c2_a2bf6e5068e14567a70aa8f001b9f180~mv2.jpg";

function UltraBot() {
  return (
    <>
      <Section id="ultrabot">
        <p className="eyebrow">Product</p>
        <h2>UltraBot</h2>
        <p className="section-sub">
          The technological evolution of an industry as we know it.
        </p>

        <div className="ultrabot__intro">
          <div>
            <h3>UV-C</h3>
            <p>
              Ultraviolet germicidal irradiation (UVGI) is a disinfection method that uses
              short-wavelength ultraviolet (ultraviolet C or UV-C, commonly referred to
              wavelengths between 200 – 280 nm) light to kill or inactivate microorganisms by
              destroying nucleic acids and disrupting their DNA, leaving them unable to perform
              vital cellular functions.
            </p>
          </div>
          <div>
            <h3>What is UV-C disinfection?</h3>
            <p>
              UV-C disinfection utilises UV-C light at wave lengths of 200 to 300 nm to destroy
              the DNA structure of viruses, bacteria, yeasts and fungi in seconds, leaving the
              microorganisms inactive and unable to spread, preventing further infection.
            </p>
          </div>
          <div>
            <h3>Why use a UV-C robot?</h3>
            <p>
              There are several options available for facilities and businesses when it comes to
              UV-C disinfection, but shadowing must be considered. The UltraBot combines UV-C
              disinfection technology with an autonomous robot, becoming a reliable solution that
              significantly reduces the likelihood of shadowing.
            </p>
          </div>
        </div>

        <Button to="/contacts">Order Now</Button>
      </Section>

      <Section alt id="ultrabot-how">
        <ProductCard image={ULTRABOT_ACTION_IMG} alt="UltraBot em funcionamento" title="How does the UltraBot work?">
          <p>
            The UltraBot has industry-leading navigation technology, high-precision positioning,
            memory-based mapping, recording personnel routes, autonomous movement, smart obstacle
            avoidance, and long-term stable operation in a responsible environment.
          </p>
          <p>
            The UltraBot is fully autonomous and will make its way around corridors and rooms and
            any obstacles disinfecting with UV-C light. This disinfecting light is harmful to
            humans so as soon as the UltraBot detects a human 3 meters away, it stops the
            radiation.
          </p>
          <Button to="/contacts">Order Now</Button>
        </ProductCard>
      </Section>

      <Section id="ultrabot-247">
        <div className="ultrabot__grid-4">
          {ultraBotFeatures.map((feature) => (
            <div key={feature.title} className="ultrabot__feature">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="ultrabot__day">
          <h3>24 / 7</h3>
          <p>
            Modern hospitals operate 24 hours a day, 365 days a year and disinfection processes
            need to increasingly become automated. This is in response to changes in lifestyles
            and demographics which are putting pressure on healthcare facilities as never before.
          </p>
          <p>
            Relying on advanced AI and manufacturing technology, deep technical advances have been
            built in the fields of positioning and navigation, motion control, multi-machine
            scheduling, perception and obstacle avoidance.
          </p>
          <p>
            When the UltraBot's batteries need to be charged, it automatically returns to the
            charging dock. When the batteries are ready, it goes back to work making healthcare
            structures safer environments for all.
          </p>
        </div>
      </Section>
    </>
  );
}

export default UltraBot;
