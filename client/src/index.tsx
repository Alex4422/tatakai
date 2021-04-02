import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// store
import store from "./store";
// Composants
import App from "./containers";

const rootReactElement = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
const target = document.getElementById("root");
render(rootReactElement, target);
