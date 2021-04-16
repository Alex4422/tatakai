import {
  GET_USER_STORAGE,
  SEED_USER_STORAGE,
  INIT_NEW_USER,
  TOGGLE_NEW_USER,
  TOGGLE_TO_WISHLIST,
  IS_LOADING,
  SUBSCRIBE_EVENTS,
} from "./types";

export const getUserStorage = () => ({
  type: GET_USER_STORAGE,
});

export const seedUserStorage = (data: Array<any>) => {
  return ({
    type: SEED_USER_STORAGE,
    payload: data,
  });
}


export const initNewUser = () => ({
  type: INIT_NEW_USER,
});

export const toggleNewUser = () => ({
  type : TOGGLE_NEW_USER,
})

export const toggleToWishlist = (id: number) => ({
  type: TOGGLE_TO_WISHLIST,
  payload: id,
})

export const isLoading = () => ({
  type: IS_LOADING,
})

export const subscribeEvents = () => ({
  type: SUBSCRIBE_EVENTS,
})