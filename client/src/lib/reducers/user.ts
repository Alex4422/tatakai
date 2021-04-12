import {
  GET_AUTH_METAMASK,
  SEED_AUTH_METAMASK,
  SEED_BALANCES,
  INIT_NEW_USER,
  TOGGLE_NEW_USER,
  SEED_USER_STORAGE,
  SEED_USER_NFTS,
  IS_LOADING,
} from "../actions/types";

export const initialState = {
  web3: null,
  provider: null,
  accounts: null,
  isLoading: false,
  isAdmin: false,
  isNew: false,
  cards: [],
  wishlist: [],
  balanceWei: null,
  balanceTAK: null,
};

const user = (
  oldState: IUserState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case GET_AUTH_METAMASK:
      return {
        ...oldState,
        isLoading: true,
      };
    case IS_LOADING:
      return {
        ...oldState,
        isLoading: true,
      };
    case INIT_NEW_USER :
      return {
        ...oldState,
        isNew: true,
      };
    case SEED_USER_STORAGE :
      return {
        ...oldState,
        wishlist: [...payload],
      };
    case SEED_USER_NFTS :
      return {
        ...oldState,
        cards: payload,
        isLoading: false,
      };
    case TOGGLE_NEW_USER :
      return {
        ...oldState,
        isNew: false,
      };
    case SEED_AUTH_METAMASK:
      return {
        ...oldState,
        web3: payload.web3,
        accounts: payload.accounts,
        balanceWei: payload.balanceWei,
        provider: payload.provider,
        balanceTAK: payload.balanceTAK,
        isAdmin: payload.isAdmin,
        isLoading: false,
      };
    case SEED_BALANCES:
      return {
        ...oldState,
        balanceWei: payload.balanceWei,
        balanceTAK: payload.balanceTAK,
        cards: payload.cards,
      };
    default:
      return {
        ...oldState,
      };
  }
};

export default user;
