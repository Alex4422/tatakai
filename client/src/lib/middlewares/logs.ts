import { SUBSCRIBE_EVENTS } from "../actions/types";
import Web3 from "web3";
import {getInstanceMarketplace} from "./utils";

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
      MarketplaceInstance.events.allEvents({}, (error: any, event: any) => {
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