import getWeb3 from "./getWeb3";
import { seedAuthMetamask } from "../../actions/user";
import { seedContracts } from "../../actions/contracts";
import detectEthereumProvider from '@metamask/detect-provider';
import TakToken from "../../../contracts/TakToken.json";
import Marketplace from "../../../contracts/TakToken.json";
import CardItem from "../../../contracts/TakToken.json";
import {balanceTAK} from "./TakToken";
import MarketplaceInstanceCall from "./Marketplace";

    /*******************************/
   // Connect web3 and accounts, init STORE
  /*******************************/

const connectWeb3 = async (store: any) => {
  try {
    const web3: any = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0])
    const provider: any = await detectEthereumProvider()
    const balanceTak: any = await balanceTAK(web3, provider, accounts[0]);
    const TakTokenContract: any = await getInstance(web3, TakToken);
    const MarketplaceContract: any = await getInstance(web3, Marketplace);
    const CardItemContract: any = await getInstance(web3, CardItem);
    
    //check if user is an Admin
    const MarketplaceInstance = await MarketplaceInstanceCall(web3);
    const admin: any = await MarketplaceInstance.methods.owner().call()
    const isAdmin = admin == accounts[0];
    console.log("isAdmin: ", isAdmin)

    store.dispatch(seedAuthMetamask(web3, accounts, parseInt(balance,10), provider, parseInt(balanceTak, 10), isAdmin));
    store.dispatch(seedContracts(TakTokenContract, MarketplaceContract, CardItemContract))
  } catch (error) {
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
  }
};



// Get the contract's instance.
export const getContract = async (web3: any, contract: any) => {
  const networkId: any = await web3?.eth.net.getId();
  const deployedNetwork: ContractJSON = (contract as any).networks[networkId];
  return (
    web3 &&
    new web3.eth.Contract(
      contract.abi,
      deployedNetwork && deployedNetwork.address
    )
  );
};

//Get the only instance without web3
export const getInstance = async (web3: any, contract: any) => {
  const networkId: any = await web3?.eth.net.getId();
  const deployedNetwork: ContractJSON = (contract as any).networks[networkId];
  const instance = new web3.eth.Contract(
    contract.abi,
    deployedNetwork && deployedNetwork.address
  );
  return instance
}

export default connectWeb3;
