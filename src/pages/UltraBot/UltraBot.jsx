import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useI18n } from "../../i18n/i18n";
import "./UltraBot.css";

const ULTRABOT_ACTION_IMG = "https://static.wixstatic.com/media/7498c2_a2bf6e5068e14567a70aa8f001b9f180~mv2.jpg";

function UltraBot() {
  const { t, path } = useI18n(); const c = t.ultrabot;
  return <><Section id="ultrabot"><p className="eyebrow">{c.eyebrow}</p><h2>UltraBot</h2><p className="section-sub">{c.subtitle}</p><div className="ultrabot__intro">{c.intro.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div><Button to={path("/contact")}>{c.order}</Button></Section><Section alt id="ultrabot-how"><ProductCard image={ULTRABOT_ACTION_IMG} alt={c.alt} title={c.howTitle}>{c.how.map((text) => <p key={text}>{text}</p>)}<Button to={path("/contact")}>{c.order}</Button></ProductCard></Section><Section id="ultrabot-247"><div className="ultrabot__grid-4">{c.features.map(([title, description]) => <div key={title} className="ultrabot__feature"><h3>{title}</h3><p>{description}</p></div>)}</div><div className="ultrabot__day"><h3>24 / 7</h3>{c.day.map((text) => <p key={text}>{text}</p>)}</div></Section></>;
}
export default UltraBot;
