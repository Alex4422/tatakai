import {
  ADMIN_FORM_SUBMIT,
  MINT_NFT_SUCCESS,
  INIT_MARKET,
  SEED_MARKET,
  SHOW_ALERT,
  HIDE_ALERT,
} from "../actions/types";

enum AlertType {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
}

export const initialState = {
  isLoading: false,
  type: AlertType.Success,
  message: "This is a notification",
  isVisible: true,
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
