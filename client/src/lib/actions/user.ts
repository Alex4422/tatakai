import { GET_AUTH_METAMASK, SEED_AUTH_METAMASK, GET_USER_NFTS, 
  SEED_USER_NFTS, BUY_NFT, USER_BOUGHT_NFT, GET_TAK,
  IMPORT_TAK_METAMASK_WALLET, GET_BALANCES, SEED_BALANCES,
} from "./types";

export const getAuthMetamask = () => ({
  type: GET_AUTH_METAMASK,
});

export const seedAuthMetamask = (web3: any, accounts: any, balanceWei: number, provider: any, balanceTAK: number, isAdmin: boolean) => ({
  type: SEED_AUTH_METAMASK,
  payload: { web3, accounts, balanceWei, provider, balanceTAK, isAdmin },
});


export const getUserNFTS = ()=> ({
  type: GET_USER_NFTS,
})

export const getBalances = () => ({
  type: GET_BALANCES,
})

export const seedBalances = (balanceTAK: number, cards: Array<any>, balanceWei: number) => ({
  type: SEED_BALANCES,
  payload: {balanceTAK, cards, balanceWei},
})

export const seedUserNFTS = (data: Array<Object>) => ({
  type: SEED_USER_NFTS,
  payload: data
})

export const importTAKMetamaskWallet = () => ({
  type: IMPORT_TAK_METAMASK_WALLET,
})

export const getTAK = () => ({
  type: GET_TAK
})

export const buyNFT = (id: any)  => ({
  type: BUY_NFT,
  payload: id
})

export const userBoughtNFT = () => ({
  type: USER_BOUGHT_NFT,
})