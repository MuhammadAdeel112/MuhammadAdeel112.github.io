import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./presentation/styles/app.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
