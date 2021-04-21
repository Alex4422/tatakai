import { GET_USER_STORAGE, TOGGLE_TO_WISHLIST, GET_HISTORY  } from "../actions/types";
import { seedUserStorage, initNewUser, seedHistory } from "../actions/dashboard";
import {API_URL} from "./utils/Constantes"
import axios from "axios";

const dashboard = () => ({ dispatch, getState }: any) => (
  next: any
) => (action: IAction) => {

  switch (action.type) {
    /*******************************/
    /* GET_USER_STORAGE /
  /*******************************/
    case GET_USER_STORAGE: {
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
