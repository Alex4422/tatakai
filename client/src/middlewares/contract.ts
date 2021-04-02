import { NEW_INSTANCE, SUBMIT_VALUE } from "../actions/types";
import { seedInstance } from "../actions/contract";
import getWeb3 from "../utils/getWeb3";
import SimpleStorageContract from "../contracts/SimpleStorage.json";

const customMiddleware = () => ({ dispatch }: any) => (next: any) => async (
  action: IAction
) => {
  const result = next(action);
  switch (action.type) {
    case NEW_INSTANCE:
      try {
        // Get network provider and web3 instance.
        const web3: any = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId: any = await web3.eth.net.getId();
        console.log("networkid:", networkId);
        const deployedNetwork: ContractJSON = (SimpleStorageContract as any)
          .networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        if (instance) {
          dispatch(seedInstance(web3, accounts, instance));
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
      break;

    default:
      return result;
  }
  return result;
};
const contract = () => customMiddleware();
export default contract;
