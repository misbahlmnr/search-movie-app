import React from "react";
import ReactDOM from "react-dom/client";
import AppContainer from "./components/app-container.tsx";
import "./index.css";
import { StoreProvider } from "./services/context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <AppContainer />
    </StoreProvider>
  </React.StrictMode>
);
