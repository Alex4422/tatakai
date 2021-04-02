import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import web3Middleware from "../middlewares/web3Middleware";
import SimpleStorage from "../../contracts/SimpleStorage.json";

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  }) || compose;

const contracts = [SimpleStorage]; /* add contracts json in array */

const middlewares = applyMiddleware(web3Middleware(contracts));
export default createStore(rootReducer, composeEnhancer(middlewares));
