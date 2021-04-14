import { INIT_MARKET, BUY_NFT, SELL_NFT, WITHDRAW_NFT_ON_SALE } from "../actions/types";
import { seedMarket, buyNFTSuccess, isLoading } from "../actions/marketplace";
import MarketplaceInstanceCall from "./utils/Marketplace";
import CardItemInstanceCall from "./utils/cardItem";
import TakTokenInstanceCall from "./utils/TakToken";
import {API_URL} from "./utils/Constantes";
import axios from "axios";


const MarketplaceMW = () => ({ dispatch, getState }: any) => (
  next: any
) => (action: IAction) => {
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
      try {
        //TODO mutualiser ca!
      let MarketplaceInstance: any;
      let TakTokenInstance: any;
      let CardItemInstance: any;

      MarketplaceInstanceCall(web3).then(result => MarketplaceInstance = result);
      TakTokenInstanceCall(web3).then(result => TakTokenInstance = result);
      CardItemInstanceCall(web3).then(result => CardItemInstance = result);

      TakTokenInstance.methods.approve(MarketplaceInstance._address,parseInt(data.price, 10)).send({from: accounts[0]}).then((result: any) => {
        console.dir(result);
        if(result){
          console.log(CardItemInstance._address,accounts[0], data.id, data.price)
           TakTokenInstance.methods.allowance(accounts[0], Marketplace.options.address).call({from: accounts[0]}).then((result: any) => {
            console.log("allowance", result);
          });
           MarketplaceInstance.methods.buy(CardItemInstance._address, data.id, parseInt(data.price, 10)).send({from: accounts[0]}).then((response: any) => {
            console.dir(response)
            dispatch(buyNFTSuccess())
          })
        }
      })
      } catch (error) {
        console.error(error);
      }
      next(action)
      break;
    }
     /*******************************/
    /*SELL NFT /
  /*******************************/
  case SELL_NFT: {
    console.log("sell nft mw")
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
      console.log("withdraw mw")
      const id = action.payload;
      let data = {id}
      console.log("id", id)
      const config: Object = {
        url: `${URL}cards/remove`,
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
