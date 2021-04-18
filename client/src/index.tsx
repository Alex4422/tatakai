import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ModalProvider from "./hooks/useModal";
import store from "./lib/store";
import App from "./containers";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from "./styles/theme"


const rootReactElement = (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalProvider>
          <App />
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

const target = document.getElementById("root");
render(rootReactElement, target);
