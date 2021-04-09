import { INIT_MARKET, BUY_NFT } from "../actions/types";
import { seedMarket, buyNFTSuccess } from "../actions/marketplace";
import MarketplaceInstanceCall from "./utils/Marketplace";
import CardItemInstanceCall from "./utils/cardItem";
import TakTokenInstanceCall from "./utils/TakToken";
import axios from "axios";
import { get } from "node:https";

const URL = "http://localhost:8080/api/";

const customMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const {
    user: { accounts, web3 },
    contract: {TakToken, Marketplace, CardItem}
  } = getState();

  switch (action.type) {
    /*******************************/
    /* MARKET INIT via API / GET NFTS MARKETPLACE /
  /*******************************/
    case INIT_MARKET: {
      console.log("Passe par le MW MarketPLace via MarketINit");
      const config: Object = {
        method: "get",
        url: `${URL}cards`,
      };
      try {
        const response: any = await axios(config);
        console.log("response Api", response);
        dispatch(seedMarket(response.data));
      } catch (error) {
        console.error(error);
      }
      break;
    }

    /*******************************/
    /* USER BUY NFT
  /********************************/
  //VIa API:
    /* case BUY_NFT: {
      console.log("Passe par le MW MarketPLace via Buy NFT");
      const config: Object = {
        method: "post",
      };
      let data = { id: action.payload.id, address: action.payload.address };
      try {
        const response: any = await axios.post(`${URL}cards/buy`, data, config);
        console.log("response Api", response);
        if (response.status === 200) {
          dispatch(buyNFTSuccess());
        }
      } catch (error) {
        console.error(error);
      }
      break;
    } */
    case BUY_NFT: {
      console.log("Passe par le MW MarketPLace via Buy NFT");
      let data = { id: action.payload.id, price: action.payload.price };
      console.log("data de la modale", data.id , data.price);
      try {
        const MarketplaceInstance = await MarketplaceInstanceCall(web3)
      console.log("marketplace", MarketplaceInstance);
      console.log("response Api");
      
      
      //TODO rest plus qu'à appeler la méthode
      /*  await this.TakTokenContract.approve(marketplaceAddress, card.metadata.price, {from: buyer});
      await this.MarketplaceContract.buy(this.CardItemContract.address, buyer, id, card.metadata.price, {from: buyer}) */

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
