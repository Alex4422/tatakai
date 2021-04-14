import {
  ADMIN_FORM_HANDLECHANGE,
  ADMIN_FORM_SUBMIT,
  MINT_NFT_SUCCESS,
  ADMIN_FORM_HANDLECHANGE_FILE,
} from "./types";

export const changeField = ({ target: { name, value } }: IEventType) => ({
  type: ADMIN_FORM_HANDLECHANGE,
  payload: { [name]: value },
});

export const changeFieldFile = ({ target: { name, files } }: IEventType) => ({
  type: ADMIN_FORM_HANDLECHANGE_FILE,
  payload: {[name] : files[0]},
});

export const submitValue = (data:any) => ({
  type: ADMIN_FORM_SUBMIT,
  data,
});

export const mintNFTSuccess = () => ({
  type: MINT_NFT_SUCCESS,
});
