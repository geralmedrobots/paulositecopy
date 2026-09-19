import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { routes, redirects } from "./data/routes";
import { jobKeys } from "./data/jobs";
const Home = lazy(() => import("./pages/Home/Home"));
const UltraBot = lazy(() => import("./pages/UltraBot/UltraBot"));
const Benefits = lazy(() => import("./pages/Benefits/Benefits"));
const Healthcare = lazy(() => import("./pages/Healthcare/Healthcare"));
const Company = lazy(() => import("./pages/Company/Company"));
const Recruitment = lazy(() => import("./pages/Recruitment/Recruitment"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Legal = lazy(() => import("./pages/Legal/Legal"));
const Job = lazy(() => import("./pages/Job/Job"));
const OriginalHome = lazy(() => import("./pages/OriginalHome/OriginalHome"));
const Solutions = lazy(() => import("./pages/Solutions/Solutions"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const pages = {
  home: Home,
  ultrabot: UltraBot,
  benefits: Benefits,
  healthcare: Healthcare,
  company: Company,
  recruitment: Recruitment,
  project: Projects,
  faq: FAQ,
  contact: Contact,
  originalHome: OriginalHome,
  solutions: Solutions,
};
function Redirect({ to }) {
  const { search, hash } = useLocation();
  return <Navigate to={to + search + hash} replace />;
}
export default function App() {
  return (
    <Suspense
      fallback={
        <p className="loading" role="status">
          Loading…
        </p>
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((route) => {
            const Page = pages[route.key];
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  Page ? (
                    <Page />
                  ) : jobKeys.includes(route.key) ? (
                    <Job job={route.key} />
                  ) : (
                    <Legal page={route.key} />
                  )
                }
              />
            );
          })}
          {Object.entries(redirects).map(([from, to]) => (
            <Route key={from} path={from} element={<Redirect to={to} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
