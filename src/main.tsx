import "./index.css";
import App from "./App.tsx";
import "antd/dist/reset.css"; // for antd v5+
// import "antd/dist/antd.css"; // for antd v4
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import AppProvider from "./context/AppProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </StrictMode>
);
