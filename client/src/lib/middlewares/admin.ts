import { ADMIN_FORM_SUBMIT, GET_TAK } from "../actions/types";
import { mintNFTSuccess } from "../actions/admin";
import { refreshMarket} from "../actions/marketplace";
import { showAlert } from "../actions/dashboard";
import {API_URL, AlertType} from "./utils/Constantes"
import axios from "axios";

const adminMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => (action: IAction) => {
  const {
    admin: { nft },
    user: {accounts}
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
          
     /*******************************/
  /* GET TAK /
  /*******************************/

  case GET_TAK: { 
    const config: Object = {
     method: 'post',
     url: `${API_URL}faucet/`,
     data: {
       address: accounts[0]
      },
   }
     axios(config)
       .then(res => dispatch(showAlert("You received Tak token!", AlertType.Success)))
       .catch(err => dispatch(showAlert("Oops w've got a problem on the tak transfer", AlertType.Error))
       )
   next(action);
   break;
 }

    default:
      return next(action);
  }
  return next(action);
};

export default adminMiddleware();
