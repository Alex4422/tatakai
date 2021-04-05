interface IAction {
  type: string;
  payload: any | null;
}

interface ContractJSON {
  networks: any;
  address: any;
  index: any;
}

interface IContractState {
  admin: any | null;
  web3: any | null;
  accounts: Array<string> | null;
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

interface IUserState {
  web3: any | null;
  accounts: Array<string> | null;
  isLoading: Boolean,
  isAdmin: Boolean,
  cards: Array<Object> | null,
  balance: Number | null,
}


interface IAdminState {
  token: any;
  isLoading: boolean;
}


interface IMarketplaceState {
  NFTS: array<Object> | null;
  isLoading: boolean;
}

interface IAdminAction {
  changeField: Function;
  submitValue: Function;
}

interface IEventType {
  target: {
    name: string;
    value: number;
  };
}

interface ConfigAxios {
    method: string;
    url: string;
    headers: any;
    body: any;
  };

