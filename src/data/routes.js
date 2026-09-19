export const routes = [
  { path: "/", key: "home", title: "Home", language: "en" },
  { path: "/ultrabot", key: "ultrabot", title: "UltraBot", language: "en" },
  { path: "/benefits", key: "benefits", title: "Benefits", language: "en" },
  {
    path: "/healthcare",
    key: "healthcare",
    title: "Healthcare Industry",
    language: "en",
  },
  { path: "/thecompany", key: "company", title: "The Company", language: "en" },
  {
    path: "/recruitment",
    key: "recruitment",
    title: "Recruitment",
    language: "en",
  },
  { path: "/projeto", key: "project", title: "PharmaRobot", language: "pt" },
  { path: "/faq", key: "faq", title: "FAQ", language: "en" },
  { path: "/contacts", key: "contact", title: "Contact", language: "en" },
  { path: "/privacy", key: "privacy", title: "Privacy Policy", language: "en" },
  {
    path: "/cookies",
    key: "cookies",
    title: "About the Cookies",
    language: "en",
  },
  {
    path: "/genderequality",
    key: "genderequality",
    title: "Gender Equality",
    language: "en",
  },
  {
    path: "/mechanicalengineer",
    key: "mechanicalengineer",
    title: "Mechanical Engineer",
    language: "en",
  },
  {
    path: "/roboticssoftwareengineer",
    key: "roboticssoftwareengineer",
    title: "Robotics Software Engineer",
    language: "en",
  },
  {
    path: "/seniorroboticsengineer",
    key: "seniorroboticsengineer",
    title: "Senior Robotics Engineer",
    language: "en",
  },
  {
    path: "/computerengineer",
    key: "computerengineer",
    title: "Computer Engineer",
    language: "en",
  },
  {
    path: "/original-home",
    key: "originalHome",
    title: "Copy of Home Original",
    language: "en",
    noindex: true,
  },
  {
    path: "/solutions",
    key: "solutions",
    title: "Copy of Solutions",
    language: "en",
    noindex: true,
  },
];
export const redirects = {
  "/portugal2030": "/projeto",
  "/healthcare-industry-1": "/healthcare",
  "/copy-of-the-company": "/recruitment",
  "/copy-of-home": "/original-home",
  "/copy-of-ultrabot": "/solutions",
};
export function findRoute(pathname) {
  return routes.find(
    (route) => route.path === (pathname.replace(/\/+$/, "") || "/"),
  );
}
