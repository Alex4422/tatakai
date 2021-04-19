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
  TakToken: any | null;
  Marketplace: any | null;
  CardItem: any | null;
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
  isLoading: boolean;
  isAdmin: boolean;
  isNew: boolean;
  cards: Array<Object> | null;
  wishlist: Array<number> | null;
  balanceWei: Number | null;
  balanceTAK: Number | null;
}

interface IAdminState {
  nft: any;
  isFullfilled: boolean;
}

interface IMarketplaceState {
  items: Array<any>;
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

interface ITOKEN {
    symbol: string;
    decimal: number;
    img: string;
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
  owner: string;
  metadata: {
    age: string;
    name: string;
    nationality: string;
    price: string;
    saison: string;
    type: string;
    isForSale: number;
  }
}

interface IDashboardState {
  isLoading: boolean;
}

