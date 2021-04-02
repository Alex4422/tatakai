import { NEW_INSTANCE, SUBMIT_VALUE } from '../actions/types';
import { seedInstance, seedValueReceipt } from '../actions/contract';
import getWeb3 from "../utils/getWeb3";
import SimpleStorageContract from "../contracts/SimpleStorage.json";

const web3 = (state: any) => (next: any) => async (action: Action) => {
  const result = next(action);
  const store = state.getState();

  switch (action.type) {
     /* CREATE NEW INSTANCE*/
    case NEW_INSTANCE :
    try { // Get network provider and web3 instance.
      const web3: any = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      
      let storageContract: any = SimpleStorageContract
      // Get the contract instance.
      const networkId: any = await web3.eth.net.getId();
      console.log('networkid:', networkId);
      const deployedNetwork: ContractJSON = storageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log("instance:", instance);
      //get the storageValue 
      const storageValue = await instance.methods.get().call()
      console.log('storageValue:', storageValue)
      // Set web3, accounts, and contract to the store

      if(instance && storageValue) {
          state.dispatch(seedInstance(web3, accounts, instance, storageValue));
      }
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    break;

  /* SUBMIT NEW VALUE*/
  case SUBMIT_VALUE :
      try {        
        const {contract, inputValue, accounts} = store.contractStore;
        console.log("passe par submit value", inputValue);
        console.log('instance:', contract);
        const res = await contract.methods.set(inputValue).send({from: accounts[0]});
        if(res.status){
          state.dispatch(seedValueReceipt(inputValue));
        }  
      } catch (error){
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    break;
  default: 
    return result;
  }
  return result;
  };


export default web3;