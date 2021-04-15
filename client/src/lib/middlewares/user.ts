import { GET_USER_NFTS, GET_TAK, SWAP_ETH_TAK, IMPORT_TAK_METAMASK_WALLET, GET_BALANCES } from "../actions/types";
import {seedUserNFTS, seedBalances} from "../actions/user";
import {toggleNewUser} from "../actions/dashboard";
import {API_URL} from "./utils/Constantes"

import {addTAKToken} from "./utils/TakToken"

import axios from 'axios';


const user = () => ({ dispatch, getState }: any) => (
  next: any
) =>  async (action: IAction) => {
  const {
    user: { accounts, web3, provider },
    contract: {Marketplace},
  } = getState();
  switch (action.type) {

    /*******************************/
  /* GET USER NFTS /
  /*******************************/

    case GET_USER_NFTS: { 
        const config: Object = {
          method: 'get',
          url: `${API_URL}accounts/${accounts[0]}`,
        }
        axios(config)
          .then(res => {
            console.log("response Api", res.data.cards);
            dispatch(seedUserNFTS(res.data.cards));
          })
          .catch(err => console.error(err))
        next(action)
        break;
    }
      
   /*******************************/
  /* IMPORT TAK TOKEN TO METAMASK WALLET /
  /*******************************/

  case IMPORT_TAK_METAMASK_WALLET: {
    console.log("Passe par le MW GET USER NFTS")  
    try {
       const promise: any =  addTAKToken(provider);
      if(promise) {
        console.log("Wallet updated !", promise)
        dispatch(toggleNewUser());
        //TOAST
      }
    } catch (error) {
      console.error(error);
    }
    next(action)
    break;
  }

     /*******************************/
  /* GET TAK /
  /*******************************/

  case GET_TAK: { 
     const config: Object = {
      method: 'post',
      url: `${API_URL}faucet/`,
      body: {
       address: accounts[0]
      },
      data: {
        address: accounts[0]
       },
    }
      axios(config)
        .then(res => console.log("response Api", res))
        .catch(err => console.log('err', err))
    next(action);
    break;
  }

     /*******************************/
  /* GET BALANCES /
  /*******************************/

  case GET_BALANCES: { 
     const config: Object = {
      method: 'get',
      url: `${API_URL}accounts/${accounts[0]}`,
    }
    try{
      const response: any = await axios(config);
      const balanceEther: any = await web3.eth.getBalance(accounts[0])
      console.log("response get balance", response.data, balanceEther)
      const {balance, cards} = response.data;
      dispatch(seedBalances(parseInt(balance, 10), cards, parseInt(balanceEther,10)));
    } catch (error) {
      console.error(error);
    }
    break;
  }

      /*******************************/
  /* SWAP ETHER TAK /
  /*******************************/

  case SWAP_ETH_TAK: { 
    console.log("Passe par le MW SWAP_ETH_TAK")    
    const value = action.payload;
    console.log('value à swap:', value)
    console.log("adress:", Marketplace.options.address)
    console.log("from: ", accounts[0])
    try {
      web3.eth.sendTransaction({
        from: accounts[0],
        to: Marketplace.options.address, 
        value: value, 
        }, (error: any, result:any) => {
          console.log("resultat de la transac:", result)
        })
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

export default user();
