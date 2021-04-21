import {
  ADMIN_FORM_SUBMIT,
  MINT_NFT_SUCCESS,
  INIT_MARKET,
  GET_USER_NFTS,
  SEED_MARKET,
  SHOW_ALERT,
  HIDE_ALERT,
  SEED_USER_NFTS, 
  GET_HISTORY,
  SEED_HISTORY,
  SELECT_CURRENT,
} from "../actions/types";
import {AlertType} from "../middlewares/utils/Constantes"

export const initialState = {
  isLoading: false,
  type: AlertType.Success,
  message: "This is a notification",
  isVisible: false,
  history: [],
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
    case SEED_HISTORY:
      return {
        ...oldState,
        history: [...payload],
      };
    case INIT_MARKET:
      return {
        ...oldState,
        isLoading: true,
      };
    case GET_USER_NFTS:
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
    case SHOW_ALERT:
      return {
        ...oldState,
        ...payload,
        isVisible: true,
      };
    case HIDE_ALERT:
      return {
        ...oldState,
        ...payload,
        isVisible: false,
      };
    default:
      return {
        ...oldState,
      };
  }
};

export default user;
