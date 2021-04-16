import { GET_USER_NFTS, GET_TAK, SWAP_ETH_TAK, IMPORT_TAK_METAMASK_WALLET, GET_BALANCES } from "../actions/types";
import {seedUserNFTS, seedBalances, getBalances} from "../actions/user";
import {toggleNewUser} from "../actions/dashboard";
import {API_URL} from "./utils/Constantes"
import {addTAKToken} from "./utils/TakToken"

import axios from 'axios';


const user = () => ({ dispatch, getState }: any) => (
  next: any
) => (action: IAction) => {
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
      axios(config)
        .then( async res => {
          const {balance, cards} = res.data;      
          const balanceEther: any = await web3.eth.getBalance(accounts[0])
          dispatch(seedBalances(parseInt(balance, 10), cards, parseInt(balanceEther,10)));
        })
    break;
  }
    default:
      return next(action);
  }
  return next(action);
};

export default user();
