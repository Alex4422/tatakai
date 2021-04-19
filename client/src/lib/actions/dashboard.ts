import {
  GET_USER_STORAGE,
  SEED_USER_STORAGE,
  INIT_NEW_USER,
  TOGGLE_NEW_USER,
  TOGGLE_TO_WISHLIST,
  IS_LOADING,
  SUBSCRIBE_EVENTS,
  SHOW_ALERT,
  HIDE_ALERT,
  GET_HISTORY,
} from "./types";
import {AlertType} from "../middlewares/utils/enums"


export const getUserStorage = () => ({
  type: GET_USER_STORAGE,
});

export const seedUserStorage = (data: Array<any>) => ({
    type: SEED_USER_STORAGE,
    payload: data,
  });

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

export const showAlert = (message: string, type: AlertType) => ({
  type: SHOW_ALERT,
  payload: {message, type}
})

export const hideAlert = () => ({
  type: HIDE_ALERT,
})

export const getHistory = (id: any) => ({
  type: GET_HISTORY,
  payload: id,
})