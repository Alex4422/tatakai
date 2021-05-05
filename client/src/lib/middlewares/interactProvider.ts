import { SWAP_ETH_TAK, IMPORT_TAK_METAMASK_WALLET, BUY_NFT, APPROVE_MARKETPLACE_TO_SELL, WITHDRAW_NFT_ON_SALE, SELL_NFT } from "../actions/types";
import {getInstanceCardItem, getInstanceMarketplace, getInstanceTakToken} from "./utils";
import { getBalances, refreshUserNFTS } from "../actions/user";
import { showAlert} from "../actions/dashboard";
import { buyNFTSuccess } from "../actions/marketplace";
import { toggleNewUser } from "../actions/dashboard";
import { TOKEN, AlertType } from "./utils/Constantes"

const interactMW = () => ({ dispatch, getState }: any) =>  (
  next: any
) => async (action: IAction) => {
  const {
    user: { web3, accounts, provider },
    contract: { Marketplace, TakToken, CardItem }
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
          })
        .then((result: any) => {
           if(result){
              dispatch(showAlert("Swap ETH > TAK ok!", AlertType.Success))
            } else {
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
    const seller = await CardItemInstance.methods.ownerOf(id).call();
    console.log(seller)
    dispatch(showAlert("Buying process, waiting for metamask...",AlertType.Info))
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
          MarketplaceInstance.methods.buy(CardItemInstance._address, id)
          .send({from: accounts[0], gas: 400000})
            .then((response :any) => {
              if(response.status==true) {
                dispatch(buyNFTSuccess());
                dispatch(showAlert("Well done, new NFT in your deck !", AlertType.Success));
                dispatch(refreshUserNFTS());
            }
          })
        }
      })
    } catch (error) {
      dispatch(showAlert("Sorry, buying failed", AlertType.Error))
      console.error(error)
    }
    next(action)
    break;
  }
   /*******************************/
    /*WITHDRAW_NFT_ON_SALE
  /*******************************/
  case WITHDRAW_NFT_ON_SALE: {
    const id = action.payload;
    const NFTAddress = CardItem.options.address
    const MarketplaceInstance = await getInstanceMarketplace(web3);
    MarketplaceInstance.methods.removeOnSale(NFTAddress,id)
          .send({from: accounts[0]})
            .then((response :any) => {
              if(response.status==true) {
                dispatch(showAlert("Your card is no longer on the market", AlertType.Info))
              } else {
                 dispatch(showAlert("Your card is still on the market", AlertType.Warning))
              }
          })
    next(action)
    break;
}

  /*******************************/
    /*SELL NFT /
  /*******************************/
  case SELL_NFT: {
    const {id, price} = action.payload;
    const NFTAddress = CardItem.options.address
    const MarketplaceInstance = await getInstanceMarketplace(web3);
    const CardItemInstance = await getInstanceCardItem(web3);
    
    CardItemInstance.methods.approve(MarketplaceInstance._address, id).send({from: accounts[0]})
    .then((response:any) => console.log("approve NFT"))
    .catch((error: any) => console.log("error", error))
    MarketplaceInstance.methods.putOnSale(NFTAddress,id, price)
          .send({from: accounts[0]})
            .then((response :any) => {
              if(response.status==true) {
                dispatch(showAlert("Your card is on the market", AlertType.Info))
              } else {
                 dispatch(showAlert("Oops, your card is not on sale", AlertType.Warning))
              }
          })
    next(action)
    break;
  }
    default:
      next(action);
  }
  next(action);
};

export default interactMW();
