import {
  ADMIN_FORM_SUBMIT,
  ADMIN_FORM_HANDLECHANGE,
  MINT_NFT_SUCCESS,
  ADMIN_FORM_HANDLECHANGE_FILE,
  IS_MINTING,
} from "../actions/types";

export const initialState = {
  nft: {
    name: null,
    age: null,
    file: null,
    supply: 1,
    nationality: null,
    saison: null,
    type: null,
    price: 100,
  },
  isLoading: false,
  isFullfilled: false,
};

const admin = (
  oldState: IAdminState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case ADMIN_FORM_HANDLECHANGE:
      return {
        ...oldState,
        nft: { ...oldState.nft, ...payload },
      };
    case ADMIN_FORM_SUBMIT:
      return {
        ...oldState,
        isLoading: true,
      };
    case IS_MINTING:
      return {
        ...oldState,
        isLoading: true,
      };
    case MINT_NFT_SUCCESS:
      return {
        nft: {},
        isLoading: false,
        isFullfilled: true,
      };
    default:
      return {
        ...oldState,
      };
  }
};

export default admin;
