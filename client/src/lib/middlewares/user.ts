import { GET_USER_NFTS, GET_BALANCES, REFRESH_USER_NFTS } from "../actions/types";
import {seedUserNFTS, seedBalances} from "../actions/user";
import {API_URL, AlertType} from "./utils/Constantes"
import { showAlert} from "../actions/dashboard";
import axios from 'axios';

const user = () => ({ dispatch, getState }: any) => (
  next: any
) => (action: IAction) => {
  const {
    user: { accounts, web3},
  } = getState();
  switch (action.type) {

    /*******************************/
  /* GET USER NFTS /
  /*******************************/
    case REFRESH_USER_NFTS:
    case GET_USER_NFTS: {
      if (accounts) {
        const config: Object = {
          method: 'get',
          url: `${API_URL}accounts/${accounts[0]}`,
        }
            axios(config)
          .then(res => {
            dispatch(seedUserNFTS(res.data.cards));
          })
          .catch(err => { 
            console.error(err)
            dispatch(showAlert("Oops w've got a problem to load your data", AlertType.Error))
          })
        }
        next(action)
        break;
    }


     /*******************************/
  /* GET BALANCES /
  /*******************************/

  case GET_BALANCES: { 
     if (accounts) {
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
      }
    break;
  }
    default:
      return next(action);
  }
  return next(action);
};

export default user();
