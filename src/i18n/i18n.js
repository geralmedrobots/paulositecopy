import { useLocation } from "react-router-dom";
import { content } from "./translations";
import { isPortuguesePath, localizePath } from "./routes";

export { equivalentPath, isPortuguesePath, localizePath } from "./routes";

export function useI18n() {
  const { pathname } = useLocation();
  const lang = isPortuguesePath(pathname) ? "pt" : "en";
  return { lang, t: content[lang], path: (value) => localizePath(value, lang), pathname };
}
