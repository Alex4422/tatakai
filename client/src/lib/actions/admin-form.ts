import {
  ADMIN_FORM_HANDLECHANGE,
  ADMIN_FORM_SUBMIT,
  MINT_NFT_SUCCESS,
} from "./types";

export const changeField = ({ target: { name, value } }: IEventType) => ({
  type: ADMIN_FORM_HANDLECHANGE,
  payload: { [name]: value },
});
export const submitValue = () => ({
  type: ADMIN_FORM_SUBMIT,
});
export const mintNFTSuccess = () => ({
  type: MINT_NFT_SUCCESS,
});
