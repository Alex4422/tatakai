import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducers";
import marketplace from "../middlewares/marketplace";
import admin from "../middlewares/admin";
import connectWeb3 from "../middlewares/utils";
import user from "../middlewares/user";
import dashboard from "../middlewares/dashboard";
import interactProvider from "../middlewares/interactProvider";

declare const window: any;

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 });

const contractsMiddlewares = [admin, marketplace, user, dashboard, interactProvider];
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(...contractsMiddlewares)
    )
);

connectWeb3(store);
export default store;
