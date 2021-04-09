import getWeb3 from "./getWeb3";
import { seedAuthMetamask } from "../../actions/user";
import { seedContracts } from "../../actions/contracts";
import { AssertionError } from "node:assert";
import detectEthereumProvider from '@metamask/detect-provider';
import TakToken from "../../../contracts/TakToken.json";
import Marketplace from "../../../contracts/TakToken.json";
import CardItem from "../../../contracts/TakToken.json";
import {balanceTAK} from "./TakToken";


// Connect web3 and accounts
const connectWeb3 = async (store: any) => {
  try {
    const web3: any = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0])
    const provider: any = await detectEthereumProvider()
    const balanceTak: any = await balanceTAK(web3, provider, accounts[0]);
    const TakTokenContract: any = await getContract(web3, TakToken);
    const MarketplaceContract: any = await getContract(web3, Marketplace);
    const CardItemContract: any = await getContract(web3, CardItem);
    store.dispatch(seedAuthMetamask(web3, accounts, balance, provider, balanceTak));
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
export default connectWeb3;
