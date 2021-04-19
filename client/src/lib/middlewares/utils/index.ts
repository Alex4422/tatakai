import getWeb3 from "./getWeb3";
import {initMarket} from "../../actions/marketplace"
import { seedAuthMetamask, getUserNFTS } from "../../actions/user";
import { seedContracts } from "../../actions/contracts";
import detectEthereumProvider from '@metamask/detect-provider';
import TakToken from "../../../contracts/TakToken.json";
import Marketplace from "../../../contracts/Marketplace.json";
import CardItem from "../../../contracts/CardItem.json";
import {balanceTAK} from "./TakToken";

    /*******************************/
   // Connect web3 and accounts, init STORE
  /*******************************/

const connectWeb3 = async (store: any) => {
  try {
    const web3: any = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0])
    const TakTokenContract: any = await getInstanceTakToken(web3);
    const MarketplaceContract: any = await getInstanceMarketplace(web3);
    const CardItemContract: any = await getInstanceCardItem(web3);
    
    //check if user is an Admin
    const admin: any = await MarketplaceContract.methods.owner().call()
    const isAdmin = admin == accounts[0];
    const provider: any = await detectEthereumProvider();
    const balanceTak: any = await balanceTAK(web3, accounts[0]);
    
    store.dispatch(seedAuthMetamask(web3, accounts, parseInt(balance,10), provider, parseInt(balanceTak, 10), isAdmin));
    store.dispatch(seedContracts(TakTokenContract, MarketplaceContract, CardItemContract))
    store.dispatch(initMarket());
    store.dispatch(getUserNFTS());
  } catch (error) {
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
  }
};

    /*******************************/
   // Connect contract Instance
  /*******************************/
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

export const getInstanceTakToken = async (web3: any) => await getInstance(web3, TakToken);
export const getInstanceMarketplace = async (web3: any) => await getInstance(web3, Marketplace);
export const getInstanceCardItem = async (web3: any) => await getInstance(web3, CardItem);


