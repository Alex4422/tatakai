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
      console.log("coucou de subscribe events");
      //test Websoscket
      const provider = new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545");
      const web3ws = new Web3(provider);
      try {
      web3ws.eth.subscribe('logs', accounts[0], async (data: any) => {
              console.log(data)
            })
      const MarketplaceInstance = await getInstanceMarketplace(web3);
      const TakTokenInstance = await getInstanceTakToken(web3);
      const CardItemInstance = await getInstanceCardItem(web3)
      
      MarketplaceInstance.events.allEvents({}, (error: any, event: any) => {
        if (error) {
          throw error;
        }
        console.log("event", event); 
        dispatch(showAlert("event",AlertType.Success))
      });
      TakTokenInstance.events.allEvents({}, (error: any, event: any) => {
        if (error) {
          throw error;
        }
        console.log("event", event); 
      });
      CardItemInstance.events.allEvents({}, (error: any, event: any) => {
        if (error) {
          throw error;
        }
        console.log("event", event); 
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