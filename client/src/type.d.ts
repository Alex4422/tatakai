type State = {
  web3: any;
  accounts: Array<string>;
  contract: Object;
  storageValue: number;
  inputValue: number;
  isLoading: boolean;
};

interface Action {
  type: string;
  storageValue: number;
  accounts: Array<string>;
  web3: any;
  instance: Object;
  payload: Object;
}

interface ContractJSON {
  networks: any;
  address: any;
  index: any;
}

interface propsConnector extends State {
  newInstance: Function;
  changeField: Function;
  submitValue: Function;
}
