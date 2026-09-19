import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { resolveRoute } from "./data/routes.js";
import { applySEO } from "./data/seo.js";
const url =
  window.location.pathname + window.location.search + window.location.hash;
const route = resolveRoute(url);
if (route.redirect) window.location.replace(route.redirect);
else {
  applySEO(url);
  const root = document.getElementById("root");
  const app = (
    <StrictMode>
      <App url={url} />
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
