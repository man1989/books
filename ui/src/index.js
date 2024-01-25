import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.js";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);
root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
);
  
