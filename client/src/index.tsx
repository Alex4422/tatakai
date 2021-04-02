import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';

import reportWebVitals from './reportWebVitals';

// store
import store from './store';
// Composants
import App from './containers/App';

const rootReactElement = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
const target = document.getElementById('root');
render(rootReactElement, target);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();