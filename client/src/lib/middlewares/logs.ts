import { SUBSCRIBE_EVENTS, GET_HISTORY } from "../actions/types";
import { seedHistory } from "../actions/dashboard"
import {showAlert} from "../actions/dashboard";
import Web3 from "web3";
import {getInstanceMarketplace} from "./utils";
import{AlertType} from "./utils/Constantes"

const log = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  var {
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
      /* CARD USER is sold */
       MarketplaceInstance.events.BuyTransaction({
        fromBlock: "latest"
          })
          .on('data', function(event: any){
            console.log("go to dispatch")
            dispatchAlert(event.returnValues);
          })
          .on('error', function(error: any) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
              console.log("erreur dans la buuying", error)
          });

     } catch (error) {
        console.error(error);
      }
      const dispatchAlert = async(data:any) => {
        console.log(data)
        console.log(accounts[0])
           if(data.oldOwner == accounts[0]){
            console.log(data.oldOwner)
            dispatch(showAlert(`your card ${data.assetId} was sold !`, AlertType.Info))
          } 
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
        let block = await web3.eth.getBlock(el.blockNumber);
        let date = block.timestamp
        el.returnValues.date = date
        data.push(el.returnValues)
      }
       data = data.filter((entry:any) => entry.assetId == id)
    }

    dispatch(seedHistory(data))
   next(action);
   break;
  }
    default:
      return next(action);
  }
  return next(action);
};

export default log();