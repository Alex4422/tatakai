import React from "react";
import { render } from "react-dom";
import store from "./lib/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { deploy } from "./lib/actions/contracts";
import App from "./app";

const rootReactElement = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
store.dispatch(deploy());
render(rootReactElement, document.getElementById("root"));
