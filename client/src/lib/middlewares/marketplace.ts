import { INIT_MARKET, BUY_NFT } from "../actions/types";
import {seedMarket} from "../actions/marketplace";
import getAccount from "./utils"
import axios from 'axios';

const URL = "http://localhost:8080/api/";

const customMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const {
    user: { accounts },
  } = getState();
  
  switch (action.type) {
  /*******************************/
  /* MARKET INIT via API / GET NFTS MARKETPLACE /
  /*******************************/
    case INIT_MARKET: {
      console.log("Passe par le MW MarketPLace via MarketINit")      
      const config: Object = {
        method: 'get',
        url: `${URL}cards`,
      }
      try {
        const response: any = await axios(config);
        console.log("response Api", response)
        dispatch(seedMarket(response.data))
      } catch (error) {
        console.error(error);
      }
      break;
    }
      

    /*******************************/
  /* USER BUY NFT
  /*******************************/
  case BUY_NFT: {
    console.log("Passe par le MW MarketPLace via Buy NFT")
    const idNFT = action.payload;
    const config: Object = {
      method: 'post',
      url: `${URL}cards`,
    }
    try {
      const response: any = await axios(config);
      console.log("response Api", response)
      dispatch(seedMarket(response.data))
    } catch (error) {
      console.error(error);
    }
    break;
  }
    
  
    default:
      return next(action);
  }
  return next(action);
};
const marketplace = () => customMiddleware();
export default marketplace();
