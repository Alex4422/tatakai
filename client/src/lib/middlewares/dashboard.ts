import { GET_USER_STORAGE, TOGGLE_TO_WISHLIST  } from "../actions/types";
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
        dispatch(seedUserStorage(wishlist));
      }
      break;
    }
     /*******************************/
    /* ADD_TO_WISHLIST /
  /*******************************/
  case TOGGLE_TO_WISHLIST: {
    let wishlist: Array<any> = JSON.parse(localStorage.getItem('wishlist')|| "rien ici");
    let id = action.payload
    let isInclude = wishlist.includes(id);
    if(isInclude){
      wishlist = wishlist.filter((item:any) => (item!==id))
    } else {
       wishlist = [...wishlist, id]
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    dispatch(seedUserStorage(wishlist));
    return next(action);
  }
    default:
      return next(action);
  }
  return next(action);
};


export default dashboard();
