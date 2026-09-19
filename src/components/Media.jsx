import { useRef, useState } from "react";
import assets from "../data/assets.json";
import { ui } from "../data/site.js";
const descriptions = {
  "home-0": "Healthcare professionals at work",
  "home-2": "UltraBot UV-C disinfection robot",
  "home-3": "Engineer in a laboratory",
  "home-4": "Patient in a healthcare environment",
  "home-5": "Engineers working together",
  "ultrabot-0": "Electronic circuit board",
  "ultrabot-1": "Engineering technology",
  "ultrabot-2": "UltraBot UV-C disinfection robot",
  "ultrabot-3": "Medical professional",
  "benefits-0": "Healthcare environment",
  "benefits-1": "Healthcare professional",
  "benefits-2": "Patient lying in a hospital bed",
  "benefits-3": "Hospital staff",
  "healthcare-industry-1-0": "Healthcare technology",
  "healthcare-industry-1-1": "Paramedic",
  "healthcare-industry-1-2": "Healthcare professional",
  "healthcare-industry-1-3": "Nurse and patient",
  "thecompany-0": "Technology at work",
  "thecompany-1": "Engineer at work",
  "thecompany-2": "Engineering team",
  "copy-of-the-company-0": "Engineering workplace",
  "copy-of-the-company-1": "Engineer at work",
  "contacts-0": "Engineering workplace",
  "projeto-0": "PharmaRobot — funding information",
  "genderequality-0": "Signatures of the administration",
  logo: "Med Robots",
  "logo-footer": "Med Robots",
};
export function Picture({
  name,
  critical = false,
  decorative = false,
  className = "",
}) {
  const asset = assets[name];
  if (!asset) return null;
  return (
    <img
      className={className}
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={decorative ? "" : descriptions[name] || asset.alt}
      loading={critical ? "eager" : "lazy"}
      fetchPriority={critical ? "high" : undefined}
      decoding="async"
    />
  );
}
export function Hero({
  title,
  lead,
  image,
  video,
  lang,
  children,
  alignment = "center",
  kicker,
  titleLang,
}) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const t = ui[lang];
  async function toggleVideo() {
    const element = ref.current;
    if (playing) {
      element.pause();
      setPlaying(false);
      return;
    }
    if (!loaded) {
      element.src = video;
      setLoaded(true);
    }
    try {
      await element.play();
      setPlaying(true);
    } catch {
      setFailed(true);
      setPlaying(false);
    }
  }
  return (
    <section
      className={`hero ${image ? "hero-media" : "hero-plain"} hero-${alignment}`}
    >
      {image && (
        <Picture name={image} critical decorative className="hero-image" />
      )}
      {video && (
        <video
          ref={ref}
          className="hero-video"
          poster={assets[image]?.src}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
          onError={() => {
            setFailed(true);
            setPlaying(false);
          }}
          onPause={() => setPlaying(false)}
        />
      )}
      <div className="container hero-content">
        {kicker && <p className="kicker">{kicker}</p>}
        <h1 lang={titleLang}>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
      {video && !failed && (
        <button
          className="video-toggle"
          onClick={toggleVideo}
          aria-pressed={playing}
        >
          {playing ? t.pause : t.play}
        </button>
      )}
      {failed && (
        <p className="video-status" role="status">
          {t.videoError}
        </p>
      )}
    </section>
  );
}
export function Section({ section, index = 0, children, id }) {
  return (
    <section
      id={id}
      lang={section.lang}
      className={`section ${index % 2 ? "section-soft" : ""}`}
    >
      <div
        className={`container ${section.image ? `media-grid ${index % 2 ? "media-reverse" : ""}` : "reading"}`}
      >
        {section.image && (
          <Picture name={section.image} className="section-image" />
        )}
        <div className="stack">
          <h2>{section.title}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {children}
        </div>
      </div>
    </section>
  );
}
