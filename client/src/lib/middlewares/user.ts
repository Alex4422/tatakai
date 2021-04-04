import { GET_AUTH_METAMASK } from "../actions/types";
import {seedAuthMetamask} from "../actions/user";
import getAccount from "./utils"
import getWeb3 from "./utils/getWeb3";
import axios from 'axios';

const URL = "http://localhost:8080/"

const customMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {

  switch (action.type) {

  /*******************************/
  /* GET USER ACCOUNT in UTILS via web3/
  /*******************************/
    case GET_AUTH_METAMASK:
     try {
        const web3: any = await getWeb3();
        console.log("web3",web3)
        const accounts = await web3.eth.getAccounts();
        console.log("accounts", accounts)
        dispatch(seedAuthMetamask(web3, accounts));
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
      break;
  
    default:
      return next(action);
  }
  return next(action);
};
const user = () => customMiddleware();
export default user();
