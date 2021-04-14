import { SEED_MARKET, SELECT_CURRENT, IS_LOADING } from "../actions/types";

export const initialState = {
  items: [],
  current: null,
};

const marketplace = (
  oldState: IMarketplaceState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case IS_LOADING:
      return {
        ...oldState,
      };


    case SEED_MARKET:
      return {
        ...oldState,
        ...payload,
      };
    case SELECT_CURRENT: {
      return {
        ...oldState,
        ...payload,
      };
    }

    default:
      return {
        ...oldState,
      };
  }
};

export default marketplace;
