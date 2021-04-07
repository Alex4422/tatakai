import Web3 from "web3";
import TakToken from "../../../contracts/TakToken.json";
import getContract from './index'
import detectEthereumProvider from '@metamask/detect-provider'

const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
const tokenSymbol = 'TAK';
const tokenDecimals = 18;
const tokenImage = 'http://placekitten.com/200/300';


const addTAKToken = async (web3: any) => {
  try {
    const provider: any = await detectEthereumProvider()
  if (provider) {
  console.log('Ethereum successfully detected!')
  console.log("provider", provider)
  // From now on, this should always be true:
  // provider === window.ethereum
  // Access the decentralized web!
  // Legacy providers may only have ethereum.sendAsync
  const chainId = await provider.request({
    method: 'eth_chainId'
  })
  console.log('chainId', chainId)
} else {
 
  // if the provider is not detected, detectEthereumProvider resolves to null
  console.error('Please install MetaMask!')
}
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
