import { GET_AUTH_METAMASK } from "../actions/types";

export const initialState = {
  admin: null,
  web3: null,
  accounts: null,
};

// reducer qui va gérer les recettes
const contract = (
  oldState: IContractState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    default:
      return {
        ...oldState,
      };
  }
};

export default contract;
