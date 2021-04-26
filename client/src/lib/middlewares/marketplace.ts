import { INIT_MARKET, REFRESH_MARKET } from "../actions/types";
import { seedMarket} from "../actions/marketplace";
import {API_URL} from "./utils/Constantes";
import axios from "axios";

const MarketplaceMW = () => ({dispatch}: any) => (
  next: any
) => (action: IAction) => {

  switch (action.type) {
    /*******************************/
    /* MARKET INIT via API / GET NFTS MARKETPLACE /
  /*******************************/
    case REFRESH_MARKET:
    case INIT_MARKET : {
      const config: Object = {
        method: "get",
        url: `${API_URL}cards`,
      };
      axios(config)
          .then(response => {
            if (response.status === 200) {
              dispatch(seedMarket(response.data));
            }
          })
          .catch(err => {
            console.error(err)
          })
      next(action)
      break;
    }


    default:
      return next(action);
  }
  return next(action);
};

export default MarketplaceMW();
