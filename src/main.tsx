import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import { StateContextProvider } from "./context";
import { ThirdwebProvider } from "@thirdweb-dev/react";
const activeChain = "sepolia"; // Replace with your desired chain (e.g., "polygon", "goerli")
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <StateContextProvider>
        <Router>
          <App />
        </Router>
      </StateContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
