import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import storage from "../middlewares/storage";
import connectWeb3 from "../middlewares/utils";
declare const window: any;

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 });

const contractsMiddlewares = [storage];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...contractsMiddlewares))
);

connectWeb3(store);
export default store;
