import { INIT_MARKET, BUY_NFT, SELL_NFT, WITHDRAW_NFT_ON_SALE } from "../actions/types";
import { seedMarket, buyNFTSuccess} from "../actions/marketplace";
import buy from "./utils/buy";
import {API_URL} from "./utils/Constantes";
import axios from "axios";

const MarketplaceMW = () => ({ dispatch, getState }: any) => (
  next: any
) => (action: IAction) => {
  const {
    user: { accounts, web3 }
  } = getState();

  switch (action.type) {
    /*******************************/
    /* MARKET INIT via API / GET NFTS MARKETPLACE /
  /*******************************/
    case INIT_MARKET: {
      const config: Object = {
        method: "get",
        url: `${API_URL}cards`,
      };
      axios(config)
          .then(response => {
            console.log("response Api", response);
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

    /*******************************/
    /* USER BUY NFT
  /********************************/
    case BUY_NFT: {
      let data = { id: action.payload.id, price: action.payload.price };
      buy(web3, accounts, data)
      next(action)
      break;
    }
     /*******************************/
    /*SELL NFT /
  /*******************************/
  case SELL_NFT: {
    const {id, price} = action.payload;
    let data = {id, price}
    console.log(data)
    const config: Object = {
      url: `${API_URL}cards/sale`,
      method: 'post',
      headers: {
        "Content-Type": `application/json`,
      },
      data,
    };
    axios(config)
      .then(res => console.log("response Api", res))
      .catch(err => console.error(err))
    next(action)
    break;
  }
     /*******************************/
    /*WITHDRAW_NFT_ON_SALE
  /*******************************/
    case WITHDRAW_NFT_ON_SALE: {
      const id = action.payload;
      let data = {id}
      console.log("id", id)
      const config: Object = {
        url: `${API_URL}cards/remove`,
        method: 'post',
        headers: {
          "Content-Type": `application/json`,
        },
        data,
      };
      axios(config)
        .then(res => console.log("response Api", res))
        .catch(err => console.error(err))
      break;
  }
    default:
      return next(action);
  }
  return next(action);
};

export default MarketplaceMW();
