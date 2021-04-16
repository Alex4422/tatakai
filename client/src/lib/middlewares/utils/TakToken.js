import {getInstanceTakToken} from "../utils"
import { TOKEN } from "./Constantes"
import TakToken from "../../../contracts/TakToken.json";

export const balanceTAK = async (web3, account) => {
  let contract = await getInstanceTakToken(web3)
  let res = await contract.methods.balanceOf(account).call()
  return res
}

export const addTAKToken = async (provider) => {
  try {
    const network = provider.networkVersion;
    const instanceAdress = TakToken.networks[network].address;
    const wasAdded = provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', 
        options: {
          address: instanceAdress, 
          symbol: TOKEN.symbol, 
          decimals: TOKEN.decimal, 
          image: TOKEN.img,
        },
    },
  }); 
   if (wasAdded) {
    console.log('Your wallet is Updated!');
    return true
  } else {
    console.log('Your loss!');
    return false
  } 
} catch (error) {
  console.log(error);
}
}
