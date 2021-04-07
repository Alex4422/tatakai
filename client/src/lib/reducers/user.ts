import {
  GET_AUTH_METAMASK,
  SEED_AUTH_METAMASK,
} from "../actions/types";

export const initialState = {
  web3: null,
  accounts: null,
  isLoading: false,
  isAdmin: false,
  cards: null,
  balanceWei: null,
  balanceTAK: null,
};

const marketplace = (
  oldState: IUserState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case GET_AUTH_METAMASK:
      return {
        ...oldState,
        isLoading: true,
      };
    case SEED_AUTH_METAMASK:
      return {
        ...oldState,
        web3: payload.web3,
        accounts: payload.accounts,
        balanceWei: payload.balanceWei,
        isLoading: false,
      };
    default:
      return {
        ...oldState,
      };
  }
};

export default marketplace;
