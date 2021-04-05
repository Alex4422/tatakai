import { combineReducers } from "redux";
import contract from "./contract";
import storage from "./storage";
import admin from "./admin";
import marketplace from "./marketplace";
import user from "./user";


export default combineReducers({
  contract,
  storage,
  admin,
  marketplace,
  user,
});