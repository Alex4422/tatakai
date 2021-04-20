import { SUBSCRIBE_EVENTS } from "../actions/types";
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
      const provider = new Web3.providers.WebsocketProvider("wss://rpc-mumbai.maticvigil.com/ws/v1/c8de64ac9d1e2a12657516cfb14e8f1572c7d356");
      const web3ws = new Web3(provider); 
      try {
      const MarketplaceInstance = await getInstanceMarketplace(web3ws);
      const TakTokenInstance = await getInstanceTakToken(web3ws);
      const CardItemInstance = await getInstanceCardItem(web3ws)

      /* CARD USER is sold */
       MarketplaceInstance.events.BuyTransaction({
        fromBlock: 0
          }, function(error: any, event: any){ console.log(event); })

          .on('data', function(event: any){
              console.log(event); // same results as the optional callback above
          })
          .on('changed', function(event: any){
              // remove event from local database
          })
          .on('error', function(error: any, receipt: any) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
              console.log("erreur dans la buuying", error, receipt)
          });

       //trying get Historical
       let CardItemInstancehistory: any = await CardItemInstance.getPastEvents('ItemCreated',{
        fromBlock: 0,
        toBlock: 'latest'
      })
      console.log("history mint", CardItemInstancehistory)

      let transferCard: any = await MarketplaceInstance.getPastEvents('BuyTransaction',{
        fromBlock: 0,
        toBlock: 'latest'
      })
      console.log("history buying", transferCard)

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

export default log();