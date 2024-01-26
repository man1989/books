import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.js";
import UIkit from "uikit";
import "uikit/dist/css/uikit.min.css";
import Icons from 'uikit/dist/js/uikit-icons.js';

UIkit.use(Icons);


const rootEl = document.getElementById("root");
const root = createRoot(rootEl);
root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
);
  
