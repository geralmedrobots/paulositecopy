import { useLocation } from "react-router-dom";
import { findRoute } from "../../data/routes";
// Enable equivalent-language links only when an approved translation exists.
export default function LanguageSwitcher() {
  const route = findRoute(useLocation().pathname);
  const language = route?.language || "en";
  return (
    <div className="language-switcher" aria-label="Content language">
      {["pt", "en"].map((code) =>
        code === language ? (
          <span key={code} aria-current="true" lang={code}>
            {code.toUpperCase()}
          </span>
        ) : (
          <button
            key={code}
            disabled
            title={`${code.toUpperCase()} translation unavailable`}
            aria-label={`${code.toUpperCase()} translation unavailable`}
          >
            {code.toUpperCase()}
          </button>
        ),
      )}
    </div>
  );
}
