import Web3 from "web3";
import TakToken from "../../../contracts/TakToken.json";

const tokenSymbol = 'TAK';
const tokenDecimals = 18;
const tokenImage = 'https://ipfs.io/ipfs/QmRLgx3aigZhbNQjZpY3gyErWijnH6AvXSS5dd2ddFgw2d';

const addTAKToken = async (provider: any) => {
  try {
    const network = provider.networkVersion;
    console.log("network:", provider.networkVersion)
    const instanceAdress = TakToken.networks[1337].address;
    console.log(instanceAdress); 
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
   const wasAdded = provider.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: instanceAdress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  }); 

   if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  } 
} catch (error) {
  console.log(error);
}
}
export default addTAKToken
