import {
  ADMIN_FORM_HANDLECHANGE,
  ADMIN_FORM_SUBMIT,
  MINT_NFT_SUCCESS,
  ADMIN_FORM_HANDLECHANGE_FILE,
  IS_MINTING,
} from "./types";

export const changeField = ({ target: { name, value } }: IEventType) => ({
  type: ADMIN_FORM_HANDLECHANGE,
  payload: { [name]: value },
});

export const isMinting = () => ({
  type: IS_MINTING,
})

export const changeFieldFile = ({ target: { name, files } }: IEventType) => {
  console.log("action",name, files[0])
  return({
  type: ADMIN_FORM_HANDLECHANGE_FILE,
  payload: {[name] : files[0]},
});
} 

export const submitValue = (data:any) => {
  console.log("action submite value");
 return  ({
  type: ADMIN_FORM_SUBMIT,
  data,
});
}
export const mintNFTSuccess = () => ({
  type: MINT_NFT_SUCCESS,
});
