import { INIT_MARKET, SEED_MARKET, SELECT_CURRENT, IS_LOADING } from "../actions/types";

export const initialState = {
  items: null,
  current: null,
  isLoading: true,
};

const marketplace = (
  oldState: IMarketplaceState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case IS_LOADING:
      return {
        ...oldState,
        isLoading: true,
      };

    case INIT_MARKET:
      return {
        ...oldState,
        isLoading: true,
      };
    case SEED_MARKET:
      return {
        ...oldState,
        ...payload,
        isLoading: false,
      };
    case SELECT_CURRENT: {
      return {
        ...oldState,
        ...payload,
      };
    }
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
