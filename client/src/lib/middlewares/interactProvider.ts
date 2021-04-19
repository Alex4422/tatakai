import { SWAP_ETH_TAK, IMPORT_TAK_METAMASK_WALLET, BUY_NFT, APPROVE_MARKETPLACE_TO_SELL } from "../actions/types";
import {getInstanceCardItem, getInstanceMarketplace, getInstanceTakToken} from "./utils";
import { getBalances, refreshUserNFTS } from "../actions/user";
import { showAlert} from "../actions/dashboard";
import { buyNFTSuccess, updateIsForSale } from "../actions/marketplace";
import { toggleNewUser } from "../actions/dashboard";
import {AlertType} from "./utils/enums";
import { TOKEN } from "./utils/Constantes"

const adminMiddleware = () => ({ dispatch, getState }: any) =>  (
  next: any
) => async (action: IAction) => {
  const {
    user: { web3, accounts, provider },
    contract: { Marketplace, TakToken }
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
            if(result){
              dispatch(showAlert("Swap ETH > TAK ok!", AlertType.Success))
            }else {
              dispatch(showAlert("Oops problem to swap", AlertType.Error))
            }
          })
    dispatch(getBalances())
    next(action)
    break;
  }
     /*******************************/
  /* IMPORT TAK TOKEN TO METAMASK WALLET /
  /*******************************/
  case IMPORT_TAK_METAMASK_WALLET: {
    const wasAdded = await provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', 
        options: {
          address: TakToken.options.address, 
          symbol: TOKEN.symbol, 
          decimals: TOKEN.decimal, 
          image: TOKEN.img,
        },
    },
  }); 
   if (wasAdded) {
    console.log('Your wallet is Updated!');
    dispatch(toggleNewUser())
    dispatch(showAlert("Wallet updated !", AlertType.Success))
  } else {
    dispatch(showAlert("Oops problem to import TAk token to your wallet", AlertType.Error))
  } 
      
    next(action)
    break;
  }

     /*******************************/
  /* APPROVE MARKETPLACE TO SELL /
  /*******************************/
  case APPROVE_MARKETPLACE_TO_SELL: {
    const MarketplaceInstance = await getInstanceMarketplace(web3);
    const CardItemInstance = await getInstanceCardItem(web3);
    CardItemInstance.methods.setApprovalForAll(MarketplaceInstance._address, true)
      .send({from: accounts[0]})
      .then((res: any) => {
        dispatch(showAlert("Your card is on the market !", AlertType.Success))
      })
      
    next(action)
    break;
  }

   /*******************************/
    /* USER BUY NFT
  /********************************/
  case BUY_NFT: {
    let {id,price} = action.payload;
    const MarketplaceInstance = await getInstanceMarketplace(web3);
    const CardItemInstance = await getInstanceCardItem(web3);
    const TakTokenInstance = await getInstanceTakToken(web3);
    try {
      TakTokenInstance.methods.approve(MarketplaceInstance._address,price)
      .send({from: accounts[0]})
        .then((result: any) => {
          if(result){
          TakTokenInstance.methods.allowance(accounts[0], MarketplaceInstance._address)
          .call({from: accounts[0]})
            .then((result : any) => {
              console.log("Allowance ok!")
            });
          MarketplaceInstance.methods.buy(CardItemInstance._address, id, price)
          .send({from: accounts[0]})
            .then((response :any) => {
              if(response.status==true) {
                console.log("c'est ok, bon achat");
                dispatch(updateIsForSale(id));
                dispatch(buyNFTSuccess());
                dispatch(showAlert("Well done, new NFT in your deck !", AlertType.Success));
                dispatch(refreshUserNFTS());
            }
          })
        }
      })
    } catch (error) {
      console.error(error)
    }
    next(action)
    break;
  }
    default:
      next(action);
  }
  next(action);
};

export default adminMiddleware();
