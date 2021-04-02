interface IAction {
  type: string;
  payload: Object;
}

interface ContractJSON {
  networks: any;
  address: any;
  index: any;
}

interface IContractState {
  web3: any | null;
  accounts: Array<string> | null;
  contract: any;
}
interface IContractAction {
  newInstance: Function;
}

interface IStorageState {
  storageValue: number;
  inputValue: number;
  isLoading: boolean;
}
interface IStorageAction {
  changeField: Function;
  submitValue: Function;
}
