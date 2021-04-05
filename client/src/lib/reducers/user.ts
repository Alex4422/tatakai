import {
  GET_AUTH_METAMASK,
  SEED_AUTH_METAMASK,
} from "../actions/types";

export const initialState = {
  web3: null,
  accounts: null,
  isLoading: false,
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
        ...payload,
        isLoading: false,
      };
    default:
      return {
        ...oldState,
      };
  }
};

export default marketplace;
