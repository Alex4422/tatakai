import { combineReducers } from "redux";

//import your reducers
import contract from "./contract";
import storage from "./storage";
import admin from "./admin";

export default combineReducers({
  contract,
  storage,
  admin,
});
