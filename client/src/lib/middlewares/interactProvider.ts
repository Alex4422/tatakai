import { SWAP_ETH_TAK, IMPORT_TAK_METAMASK_WALLET, BUY_NFT } from "../actions/types";
import {getInstanceCardItem, getInstanceMarketplace, getInstanceTakToken} from "./utils";
import { getBalances } from "../actions/user";
import { buyNFTSuccess } from "../actions/marketplace";
import { toggleNewUser } from "../actions/dashboard";
import {addTAKToken} from "./utils/TakToken";


const adminMiddleware = () => ({ dispatch, getState }: any) =>  (
  next: any
) => async (action: IAction) => {
  const {
    user: { web3, accounts, provider },
    contract: { Marketplace }
  } = getState();
 
  switch (action.type) {
  /*******************************/
  /* SWAP ETHER TAK /
  /*******************************/

  case SWAP_ETH_TAK: { 
    const value = action.payload;
    await web3.eth.sendTransaction({
          from: accounts[0],
          to: Marketplace.options.address, 
          value: value, 
          }, (error: any, result:any) => {
            console.log("resultat de la transac:", result)
          })
    dispatch(getBalances())
    next(action)
    break;
  }
     /*******************************/
  /* IMPORT TAK TOKEN TO METAMASK WALLET /
  /*******************************/
  case IMPORT_TAK_METAMASK_WALLET: {
    const isUpdated: any = await addTAKToken(provider)
      if(isUpdated) {
          dispatch(toggleNewUser())
      }
    next(action)
    break;
  }

   /*******************************/
    /* USER BUY NFT
  /********************************/
  case BUY_NFT: {
    let data = { id: action.payload.id, price: action.payload.price };
    const MarketplaceInstance = await getInstanceMarketplace(web3);
    const CardItemInstance = await getInstanceCardItem(web3);
    const TakTokenInstance = await getInstanceTakToken(web3);
    try {
      TakTokenInstance.methods.approve(MarketplaceInstance._address,parseInt(data.price, 10)).send({from: accounts[0]})
        .then((result: any) => {
          if(result){
          TakTokenInstance.methods.allowance(accounts[0], MarketplaceInstance._address).call({from: accounts[0]})
            .then((result : any) => {
              console.log("Allowance ok!")
            });
          MarketplaceInstance.methods.buy(CardItemInstance._address, data.id, parseInt(data.price, 10)).send({from: accounts[0]})
            .then((response :any) => {
              if(response.status==true) {
                dispatch(buyNFTSuccess)
            }
          })
        }
      })
    } catch (error) {
      console.error(error)
      return false
    }
    next(action)
    break;
  }
    default:
      return next(action);
  }
  return next(action);
};

export default adminMiddleware();
