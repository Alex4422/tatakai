import { GET_AUTH_METAMASK, GET_USER_NFTS, GET_TAK, IMPORT_TAK_METAMASK_WALLET } from "../actions/types";
import {seedAuthMetamask, seedUserNFTS} from "../actions/user";
import detectEthereumProvider from '@metamask/detect-provider';
import getAccount from "./utils"
import {balanceTAK, addTAKToken} from "./utils/TakToken"
import getWeb3 from "./utils/getWeb3";
import axios from 'axios';

const URL = "http://localhost:8080/api/";

const customMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const {
    user: { accounts, Web3, provider },
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
        const provider: any = await detectEthereumProvider()
        const resBalanceTAK: any = await balanceTAK(web3, provider, accounts[0])
        console.log("balancetak", resBalanceTAK)
        dispatch(seedAuthMetamask(web3, accounts, balance, provider, resBalanceTAK));
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

    case GET_USER_NFTS: {
        console.log("Passe par le MW GET USER NFTS")  
        console.log("user account", accounts[0])    
        const config: Object = {
          method: 'get',
          url: `${URL}accounts/${accounts[0]}`,
        }
        try {
          const response: any = await axios(config);
          console.log("response Api", response)
          //dispatch(seedUserNFTS(response.data))
        } catch (error) {
          console.error(error);
        }
        break;
    }
      
   /*******************************/
  /* IMPORT TAK TOKEN TO METAMASK WALLET /
  /*******************************/

  case IMPORT_TAK_METAMASK_WALLET: {
    console.log("Passe par le MW GET USER NFTS")  
    try {
       const promise: any = await addTAKToken(provider);
      if(promise) {
        console.log("Wallet updated !", promise)
      }
    } catch (error) {
      console.error(error);
    }
    break;
  }

     /*******************************/
  /* GET TAK /
  /*******************************/

  case GET_TAK: { 
    console.log("Passe par le MW GET TAK")     
    try {
    //Ask Faucet try
     const config: Object = {
      method: 'post',
      url: `${URL}faucet/`,
      body: {
       address: accounts[0]
      },
      data: {
        address: accounts[0]
       },
    }
      const response: any = await axios(config);
      console.log("response Api", response) 
      //dispatch(seedUserNFTS(response.data))
    } catch (error) {
      console.error(error);
    }
    break;
  }
    
  
    default:
      return next(action);
  }
  return next(action);
};
const user = () => customMiddleware();
export default user();
