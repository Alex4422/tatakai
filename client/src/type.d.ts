interface IAction {
  type: string;
  payload: any | null;
  data?: any;
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
  provider: any | null;
  accounts: Array<string> | null;
  isLoading: Boolean;
  isAdmin: Boolean;
  cards: Array<Object> | null;
  balanceWei: Number | null;
  balanceTAK: Number | null;
}

interface IAdminState {
  nft: any;
  isLoading: boolean;
}

interface IMarketplaceState {
  items: Array<any> | null;
  isLoading: boolean;
}

interface IAdminAction {
  changeField: Function;
  submitValue: Function;
  changeFieldFile: Function;
}

interface IEventType {
  target: {
    name: string;
    value: number;
    files?: any;
  };
}

interface ConfigAxios {
  method: string;
  url: string;
  headers: any;
  body: any;
}

interface ICard {
  id: number;
  description: string;
  image: string;
  metadata: {
    age: string;
    name: string;
    nationality: string;
    price: string;
    saison: string;
    type: string;
  }
}
