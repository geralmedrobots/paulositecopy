import { useEffect, useRef, useState } from "react";
import { assets } from "../../data/assets";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import Media from "../Media/Media";
import "./Hero.css";
export default function Hero({ title, lead, media, home = false }) {
  const video = useRef(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!video.current) return;
    if (reducedMotion || paused) video.current.pause();
    else video.current.play().catch(() => setPaused(true));
  }, [reducedMotion, paused, media]);
  const asset = assets[media];
  return (
    <section className={`hero ${home ? "hero--home" : ""}`}>
      <div className="hero__background" aria-hidden="true">
        <Media name={`${media}-poster`} alt="" eager />
        {!reducedMotion && !failed && asset && (
          <video
            ref={video}
            src={asset.src}
            poster={assets[`${media}-poster`]?.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div className="container hero__content">
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
      {!reducedMotion && !failed && asset && (
        <button
          className="hero__pause"
          onClick={() => setPaused(!paused)}
          aria-label={
            paused ? "Play background video" : "Pause background video"
          }
        >
          {paused ? "▶" : "Ⅱ"}
        </button>
      )}
    </section>
  );
}
