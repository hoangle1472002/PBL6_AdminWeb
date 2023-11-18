/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import App from "App";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

Sentry.init({
  dsn: "https://8bd82929423d439195b7b1d2784a27b4@o4504106872209408.ingest.sentry.io/4504219172470784",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <HashRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </HashRouter>,
  document.getElementById("root")
);
