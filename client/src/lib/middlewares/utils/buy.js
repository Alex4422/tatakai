import {getInstanceCardItem, getInstanceMarketplace, getInstanceTakToken} from "./index";


const buy = async (web3, accounts, data) => {
  try {
    const MarketplaceInstance = await getInstanceMarketplace(web3);
    const CardItemInstance = await getInstanceCardItem(web3);
    const TakTokenInstance = await getInstanceTakToken(web3);

    TakTokenInstance.methods.approve(MarketplaceInstance._address,parseInt(data.price, 10)).send({from: accounts[0]}).then((result) => {
      console.dir(result);
      if(result){
        console.log(CardItemInstance._address,accounts[0], data.id, data.price)
        TakTokenInstance.methods.allowance(accounts[0], MarketplaceInstance._address).call({from: accounts[0]}).then((result) => {
        console.log("allowance", result);
        });
        MarketplaceInstance.methods.buy(CardItemInstance._address, data.id, parseInt(data.price, 10)).send({from: accounts[0]}).then((response) => {
          console.dir(response)
          if(response.status==true) {
            return true
          }
        })
      }
    })
  } catch (error) {
    console.error(error)
    return false
  }
}

export default buy; 