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
      const provider = new Web3.providers.WebsocketProvider("wss://ws-matic-mumbai.chainstacklabs.com");
      const web3ws = new Web3(provider); 
      try {
      const MarketplaceInstance = await getInstanceMarketplace(web3ws);
      //const TakTokenInstance = await getInstanceTakToken(web3ws);
      //const CardItemInstance = await getInstanceCardItem(web3ws)
      console.log(accounts[0], MarketplaceInstance);


      /* CARD USER is sold */
       MarketplaceInstance.events.BuyTransaction({
        fromBlock: 0
          })
          .on('data', function(event: any){
            console.log(event)
              if(event.returnValues.oldOwner == accounts[0]){
                console.log(event.returnValues)
                dispatch(showAlert("your card was sold !", AlertType.Info))
              }
          })
          .on('error', function(error: any) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
              console.log("erreur dans la buuying", error)
          });

       //trying get Historical
     /*   let CardItemInstancehistory: any = await CardItemInstance.getPastEvents('ItemCreated',{
        fromBlock: 0,
        toBlock: 'latest'
      })
      console.log("history mint", CardItemInstancehistory) */
      //get history card transfer
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