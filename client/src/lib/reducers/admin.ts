import {
  ADMIN_FORM_SUBMIT,
  ADMIN_FORM_HANDLECHANGE,
  MINT_NFT_SUCCESS,
} from "../actions/types";

export const initialState = {
  token: { tokenName: null, age: null, file: null, supply: null, nationalité: null, saison: null, type: null },
  isLoading: false,
};

const admin = (
  oldState: IAdminState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case ADMIN_FORM_HANDLECHANGE:
      return {
        ...oldState,
        token: { ...oldState.token, ...payload },
      };
    case ADMIN_FORM_SUBMIT:
      return {
        ...oldState,
        isLoading: true,
      };
    case MINT_NFT_SUCCESS:
      return {
        token: {},
        isLoading: false,
      };
    default:
      return {
        ...oldState,
      };
  }
};

export default admin;
