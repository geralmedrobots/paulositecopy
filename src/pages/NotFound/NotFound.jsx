import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/i18n";
import "./NotFound.css";

function NotFound() {
  const { t, path } = useI18n();
  return <section className="not-found"><div className="container"><p className="eyebrow">404</p><h1>{t.notFound[0]}</h1><p>{t.notFound[1]}</p><Link className="btn btn--solid" to={path("/")}>{t.notFound[2]}</Link></div></section>;
}
export default NotFound;
