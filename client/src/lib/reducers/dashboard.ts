import {
  ADMIN_FORM_SUBMIT,
  MINT_NFT_SUCCESS,


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
    case MINT_NFT_SUCCESS:
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
