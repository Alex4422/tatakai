import {
  ADMIN_FORM_SUBMIT,
  MINT_NFT_SUCCESS,
  INIT_MARKET,
  SEED_MARKET,


} from "../actions/types";

export const initialState = {
  
  isLoading: false,

  
};

const user = (
  oldState: IDashboardState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case ADMIN_FORM_SUBMIT:
      return {
        ...oldState,
        isLoading: true,
      };
    case INIT_MARKET:
      return {
        ...oldState,
        isLoading: true,
      };
    case MINT_NFT_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
      };
    case SEED_MARKET:
      return {
        ...oldState,
        isLoading: false,
      };
  
    default:
      return {
        ...oldState,
      };
  }
};

export default user;
