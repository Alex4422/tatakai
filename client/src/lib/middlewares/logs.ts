import { SUBSCRIBE_EVENTS, GET_HISTORY } from "../actions/types";
import {showAlert} from "../actions/dashboard";
import Web3 from "web3";
import {getInstanceMarketplace, getInstanceTakToken, getInstanceCardItem} from "./utils";
import{AlertType} from "./utils/Constantes"

const log = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const {
    user: { accounts, web3 },
  } = getState();

  switch (action.type) {

    /*******************************/
    /* SUBSCRIBE_EVENTS
  /********************************/
    case SUBSCRIBE_EVENTS: {
      console.log("coucou de subscribe events");
      const provider = new Web3.providers.WebsocketProvider("wss://ws-matic-mumbai.chainstacklabs.com");
      const web3ws = new Web3(provider); 
      try {
      const MarketplaceInstance = await getInstanceMarketplace(web3ws);
      //const TakTokenInstance = await getInstanceTakToken(web3ws);
      //const CardItemInstance = await getInstanceCardItem(web3ws)


      /* CARD USER is sold */
       MarketplaceInstance.events.BuyTransaction({
        fromBlock: "latest"
          })
          .on('data', function(event: any){
            console.log(event)
              /* if(event.returnValues.oldOwner == accounts[0]){
                console.log(event.returnValues)
                dispatch(showAlert("your card was sold !", AlertType.Info))
              } */
          })
          .on('error', function(error: any) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
              console.log("erreur dans la buuying", error)
          });

     } catch (error) {
        console.error(error);
      }
      break;
    }
         /*******************************/
  /* GET HISTORY /
  /*******************************/
  case GET_HISTORY: { 
    const provider = new Web3.providers.WebsocketProvider("wss://ws-matic-mumbai.chainstacklabs.com");
    const web3ws = new Web3(provider); 
    const MarketplaceInstance = await getInstanceMarketplace(web3ws);
    const id = action.payload;
    let transferCard: any = await MarketplaceInstance.getPastEvents('BuyTransaction',{
      fromBlock: 12931584,
      toBlock: 'latest'
    })
    let data: Array<Object>=[];
    if (transferCard.length >= 1){
      for(let el of transferCard){
        data.push(el.returnValues)
      }
       data = data.filter((entry:any) => entry.assetId == id)
    }
    console.log("data filtered", data)
    //TODO dispatch
   next(action);
   break;
  }
    default:
      return next(action);
  }
  return next(action);
};

export default log();