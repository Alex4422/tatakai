import {
  GET_USER_STORAGE,
  SEED_USER_STORAGE,
  INIT_NEW_USER,
  TOGGLE_NEW_USER,
  TOGGLE_TO_WISHLIST,
} from "./types";

export const getUserStorage = () => ({
  type: GET_USER_STORAGE,
});

export const seedUserStorage = (data: Array<any>) =>{
return ({
  type: SEED_USER_STORAGE,
  payload: data,
});
}


export const initNewUser = () => ({
  type: SEED_USER_STORAGE,
});

export const toggleNewUser = () => ({
  type : TOGGLE_NEW_USER,
})

export const toggleToWishlist = (id: number) => ({
  type: TOGGLE_TO_WISHLIST,
  payload: id,
})
