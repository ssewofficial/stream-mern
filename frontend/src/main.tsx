import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { i18nMap } from "./locale/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <IntlProvider locale="en-US" messages={i18nMap["en-US"]}>
        <App />
      </IntlProvider>
    </BrowserRouter>
  </StrictMode>
);
