import { SEED_CONTRACTS } from "../actions/types";

export const initialState = {
  TakToken : null,
  Marketplace : null,
  CardItem : null,
};

// reducer qui va gérer les recettes
const contract = (
  oldState: IContractState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case SEED_CONTRACTS:
      return {
        ...oldState,
        ...payload,
      };
    default:
      return {
        ...oldState,
      };
  }
};

export default contract;
