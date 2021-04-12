import {
  GET_USER_STORAGE,
  SEED_USER_STORAGE,
  INIT_NEW_USER,
  TOGGLE_NEW_USER,
} from "./types";

export const getUserStorage = () => ({
  type: GET_USER_STORAGE,
});

export const seedUserStorage = () => ({
  type: SEED_USER_STORAGE,
});

export const initNewUser = () => ({
  type: SEED_USER_STORAGE,
});

export const toggleNewUser = () => ({
  type : TOGGLE_NEW_USER,
})
