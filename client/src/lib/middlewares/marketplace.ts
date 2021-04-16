import { INIT_MARKET, SELL_NFT, WITHDRAW_NFT_ON_SALE, UPDATE_IS_FOR_SALE } from "../actions/types";
import { seedMarket} from "../actions/marketplace";
import {API_URL} from "./utils/Constantes";
import axios from "axios";
import { type } from "node:os";

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

   /*******************************/
    /* Update IS_for_sale post buy /
  /*******************************/
  case UPDATE_IS_FOR_SALE: {
    const id = action.payload;
    let data = {id}
    const config: Object = {
      method: "post",
      url: `${API_URL}cards/buy`,
      headers: {
        "Content-Type": `application/json`,
      },
      data,
    };
    axios(config)
        .then(response => {
          console.log("response Api", response);
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
