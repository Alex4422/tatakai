import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ModalProvider from "./hooks/useModal";
import store from "./lib/store";
import App from "./containers";

const rootReactElement = (
  <BrowserRouter>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </BrowserRouter>
);

const target = document.getElementById("root");
render(rootReactElement, target);
