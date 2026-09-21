import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  useEffect(() => { document.title = "Page not found | Med Robots"; }, []);
  return <section className="not-found"><div className="container"><p className="eyebrow">404</p><h1>Page not found.</h1><p>The page you requested does not exist or may have moved.</p><Link className="btn btn--solid" to="/">Back to Home</Link></div></section>;
}

export default NotFound;
