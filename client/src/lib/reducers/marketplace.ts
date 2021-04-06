import { bindActionCreators } from "redux";
import {
  INIT_MARKET,
  SEED_MARKET,
} from "../actions/types";

export const initialState = {
  NFTS: null,
  isLoading: false,
};

const marketplace = (
  oldState: IMarketplaceState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case INIT_MARKET:
      return {
        ...oldState,
        isLoading: true,
      };
    case SEED_MARKET:
      return {
        NFTS: payload,
        isLoading: false,
      };
    default:
      return {
        ...oldState,
      };
  }
};

export default marketplace;
