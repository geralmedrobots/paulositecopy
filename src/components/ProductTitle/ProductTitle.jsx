import { useId, useRef, useState } from "react";
import { assets } from "../../data/assets";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import Media from "../Media/Media";
import "./ProductTitle.css";
export default function ProductTitle() {
  const id = useId();
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  return (
    <div className="product-title">
      <h2 className="sr-only">UltraBot</h2>
      <div className="product-title__art" aria-hidden="true">
        <Media name="ultrabot-title-poster" alt="" />
        {!reduced && (
          <video
            ref={ref}
            src={assets["ultrabot-title"].src}
            preload="none"
            muted
            loop
            playsInline
            poster={assets["ultrabot-title-poster"].src}
            onError={() => setPlaying(false)}
          />
        )}
        <svg viewBox="0 0 1000 220" preserveAspectRatio="none">
          <defs>
            <mask id={id}>
              <rect width="1000" height="220" fill="white" />
              <text
                x="500"
                y="168"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontWeight="900"
                fontSize="178"
                fill="black"
              >
                ULTRABOT
              </text>
            </mask>
          </defs>
          <rect width="1000" height="220" fill="white" mask={`url(#${id})`} />
        </svg>
      </div>
      {!reduced && (
        <button
          className="product-title__play"
          aria-label={playing ? "Pause Text Mask" : "Play Text Mask"}
          onClick={async () => {
            if (playing) {
              ref.current.pause();
              setPlaying(false);
            } else {
              try {
                await ref.current.play();
                setPlaying(true);
              } catch {
                setPlaying(false);
              }
            }
          }}
        >
          {playing ? "Ⅱ" : "▶"}
        </button>
      )}
    </div>
  );
}
