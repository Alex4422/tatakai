import { createStore, applyMiddleware } from "redux";

import rootReducer from "../reducers";
import contract from "../middlewares/contract";
import storage from "../middlewares/storage";

declare const window: any;

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 });

const contracts = [contract(), storage()];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...contracts))
);

// on l'exporte par défaut
export default store;
