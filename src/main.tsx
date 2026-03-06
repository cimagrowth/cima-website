import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

if (rootElement.hasChildNodes()) {
  // Page was pre-rendered at build time — hydrate to preserve existing HTML
  hydrateRoot(rootElement, <App />);
} else {
  // SPA fallback (e.g. dynamic routes like /blog/:slug) — mount fresh
  createRoot(rootElement).render(<App />);
}
