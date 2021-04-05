import getWeb3 from "./getWeb3";
import { seedAuthMetamask } from "../../actions/user";
import { AssertionError } from "node:assert";

// Connect web3 and accounts
const connectWeb3 = async (store: any) => {
  try {
    const web3: any = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    store.dispatch(seedAuthMetamask(web3, accounts));
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
