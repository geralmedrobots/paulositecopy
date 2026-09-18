import Button from "../Button/Button";
import "./Hero.css";

function Hero({ kicker, title, lead, primaryCta, secondaryCta }) {
  return (
    <section className="hero">
      <div className="container">
        {kicker && <p className="hero__kicker">{kicker}</p>}
        <h1>{title}</h1>
        {lead && <p className="hero__lead">{lead}</p>}
        <div className="hero__ctas">
          {primaryCta && <Button to={primaryCta.to}>{primaryCta.label}</Button>}
          {secondaryCta && (
            <Button to={secondaryCta.to} variant="ghost">
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
