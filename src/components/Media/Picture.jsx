import assets from "../../data/assets.json";
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
