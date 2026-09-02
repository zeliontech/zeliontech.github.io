import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Warm the current route's lazy chunk immediately so it downloads in
// parallel with React boot instead of after first render. Dynamic import
// dedupes, so React.lazy resolves from this same in-flight request.
const routeWarmup = {
  "/": () => import("./pages/Index.jsx"),
  "/tokenomics": () => import("./pages/TokenomicsPage.jsx"),
  "/technology": () => import("./pages/Technology.jsx"),
  "/whitepaper": () => import("./pages/Whitepaper.jsx"),
  "/legal": () => import("./pages/Legal.jsx"),
  "/privacy": () => import("./pages/PrivacyPolicy.jsx"),
  "/contact": () => import("./pages/ContactUs.jsx"),
};

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const warm = routeWarmup[path];
if (warm) warm();

createRoot(document.getElementById("root")).render(<App />);
