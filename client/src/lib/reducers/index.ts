import { combineReducers } from "redux";
import contract from "./contract";
import admin from "./admin";
import marketplace from "./marketplace";
import user from "./user";
import dashboard from "./dashboard";



export default combineReducers({
  contract,
  admin,
  marketplace,
  user,
  dashboard,
});
