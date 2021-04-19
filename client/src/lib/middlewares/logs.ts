import { SUBSCRIBE_EVENTS } from "../actions/types";
import {showAlert} from "../actions/dashboard";
import Web3 from "web3";
import {getInstanceMarketplace, getInstanceTakToken, getInstanceCardItem} from "./utils";

enum AlertType {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
}


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
      const provider = new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545");
      const web3ws = new Web3(provider);
      try {
      const MarketplaceInstance = await getInstanceMarketplace(web3ws);
      const TakTokenInstance = await getInstanceTakToken(web3ws);
      const CardItemInstance = await getInstanceCardItem(web3ws)
      
      /* CARD USER is sold */
      MarketplaceInstance.events.BuyTransaction().on("data", (error: any, event: any) => {
        console.log("event:", event)
        if (error) {
          throw error;
        }
        
        /* if (event.returnValues.oldOwner === accounts[0]){
          dispatch(showAlert(`${event.returnValues.newOwner} a acheté votre carte pour ${event.returnValues.price} TAK`,AlertType.Info))
        } */
      });
      
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