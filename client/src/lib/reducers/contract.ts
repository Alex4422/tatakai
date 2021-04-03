import { DEPLOY } from "../actions/types";

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
    case DEPLOY:
      return {
        ...oldState,
        ...payload,
        isLoading: true,
      };
    default:
      return {
        ...oldState,
      };
  }
};

export default contract;
