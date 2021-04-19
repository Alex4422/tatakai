import { ADMIN_FORM_SUBMIT } from "../actions/types";
import { mintNFTSuccess } from "../actions/admin";
import { refreshMarket} from "../actions/marketplace";
import { showAlert } from "../actions/dashboard";
import {AlertType} from "../middlewares/utils/enums"
import {API_URL} from "./utils/Constantes"
import axios from "axios";

const adminMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => (action: IAction) => {
  const {
    admin: { nft },
  } = getState();

  switch (action.type) {
    /*******************************/
    /* ADMIN_FORM_SUBMIT via API */
    /*******************************/
    case ADMIN_FORM_SUBMIT:
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

      const config: Object = {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      };
        axios.post(`${API_URL}cards`, data, config)
          .then(response => {
            console.log("response Api", response);
            if (response.status === 200) {
              dispatch(mintNFTSuccess());
              dispatch(showAlert("New NFT is on the market !", AlertType.Success))
              dispatch(refreshMarket());
            }
          })
          .catch(err => {
            console.error(err)
            dispatch(showAlert("NFT creation failed", AlertType.Error))

          })
      next(action)
      break;

    default:
      return next(action);
  }
  return next(action);
};

export default adminMiddleware();
