import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { NextUIProvider } from "@nextui-org/react";

const root = document.getElementById("root");

const reactRoot = createRoot(root);
reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <main className=" text-foreground bg-background">
          <App />
        </main>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
