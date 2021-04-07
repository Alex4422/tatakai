import { GET_AUTH_METAMASK, GET_USER_NFTS } from "../actions/types";
import {seedAuthMetamask, seedUserNFTS} from "../actions/user";
import getAccount from "./utils"
import getWeb3 from "./utils/getWeb3";
import axios from 'axios';

const URL = "http://localhost:8080/api/";

const customMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const {
    user: { accounts },
  } = getState();
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
        const balance = await web3.eth.getBalance(accounts[0])
        console.log("balance", balance)
        dispatch(seedAuthMetamask(web3, accounts, balance));
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
      break;

    /*******************************/
  /* GET USER NFTS /
  /*******************************/

    case GET_USER_NFTS:
        console.log("Passe par le MW GET USER NFTS")  
        console.log("user account", accounts[0])    
        const config: Object = {
          method: 'get',
          url: `${URL}users/${accounts[0]}`,
        }
        try {
          const response: any = await axios(config);
          console.log("response Api", response)
          //dispatch(seedUserNFTS(response.data))
        } catch (error) {
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
