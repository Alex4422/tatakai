import { ADMIN_FORM_SUBMIT } from "../actions/types";
import { mintNFTSuccess, isMinting } from "../actions/admin";
import CardItem from "../../contracts/CardItem.json";
import { getContract } from "./utils";
import axios from "axios";

const URL = "http://localhost:8080/api/";

const customMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const {
    admin: { nft },
  } = getState();

  switch (action.type) {
    /*******************************/
    /* ADMIN_FORM_SUBMIT via API */
    /*******************************/
    case ADMIN_FORM_SUBMIT:
      dispatch(isMinting());
      console.log("Passe par le MW admin via ADMIN FORM SUBMIT");
      //get FormData img
      let data = action.data!;
      //append data
      data.append("name", nft.name);
      data.append("age", nft.age);
      data.append("nationality", nft.nationality);
      data.append("saison", nft.saison);
      data.append("type", nft.type);
      data.append("supply", nft.supply);
      data.append("price", nft.price);
      data.append("isForSale", true);

      const config: Object = {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      };
      debugger;
      try {
        const response: any = await axios.post(`${URL}cards`, data, config);
        console.log("response Api", response);
        if (response.status === 200) {
          dispatch(mintNFTSuccess());
        }
      } catch (error) {
        console.error(error);
      }
      break;

    default:
      return next(action);
  }
  return next(action);
};
const admin = () => customMiddleware();
export default admin();
