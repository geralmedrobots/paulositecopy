import { useState } from "react";
import { assets } from "../../data/assets";
export default function Media({ name, alt, eager = false, className = "" }) {
  const [failed, setFailed] = useState(false);
  const asset = assets[name];
  const description = alt ?? asset?.alt ?? "";
  if (!asset || failed)
    return description ? (
      <div className="media-fallback" role="img" aria-label={description}>
        {description}
      </div>
    ) : null;
  return (
    <img
      className={className}
      src={asset.src}
      alt={description}
      width={asset.width}
      height={asset.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
