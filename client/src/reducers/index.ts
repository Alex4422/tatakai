import { combineReducers } from "redux";

//import your reducers
import contract from "./contract";
import storage from "./storage";

export default combineReducers({
  contract,
  storage,
});
