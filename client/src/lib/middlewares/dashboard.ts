import { GET_USER_STORAGE  } from "../actions/types";
import { seedUserStorage, initNewUser } from "../actions/dashboard";
import MarketplaceInstanceCall from "./utils/Marketplace";
import CardItemInstanceCall from "./utils/cardItem";
import TakTokenInstanceCall from "./utils/TakToken";
import axios from "axios";


const URL = "http://localhost:8080/api/";

const dashboard = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const {
    user: { accounts, web3 },
    contract: {TakToken, Marketplace, CardItem}
  } = getState();

  switch (action.type) {
    /*******************************/
    /* GET_USER_STORAGE /
  /*******************************/
    case GET_USER_STORAGE: {
      console.log("Passe par le MW MarketPLace via GET USER STORAGE"); 
      const isNew = localStorage.getItem('isNew');
      if(!isNew){
        localStorage.setItem('isNew', "false");
        let wishlist: Array<any> = []
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
        dispatch(initNewUser())
      }
      else {
        let wishlist: Array<any> = JSON.parse(localStorage.getItem('wishlist')|| "rien ici");      
        dispatch.getItem(wishlist);
      }
      break;
    }

  

    default:
      return next(action);
  }
  return next(action);
};


export default dashboard();
