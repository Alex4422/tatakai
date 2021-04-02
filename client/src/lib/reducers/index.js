import { combineReducers } from "redux";
import contracts from "./contracts";
import storage from "./storage";

export default combineReducers({
  storage,
  contracts,
  /* additional reducers here */
});
