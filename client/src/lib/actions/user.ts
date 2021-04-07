import { GET_AUTH_METAMASK, SEED_AUTH_METAMASK, GET_USER_NFTS, SEED_USER_NFTS, BUY_NFT, USER_BOUGHT_NFT  } from "./types";

export const getAuthMetamask = () => ({
  type: GET_AUTH_METAMASK,
});


export const seedAuthMetamask = (web3: any, accounts: any, balanceWei: Number) => ({
  type: SEED_AUTH_METAMASK,
  payload: { web3, accounts, balanceWei },
});


export const getUserNFTS = ()=> ({
  type: GET_USER_NFTS,
})

export const seedUserNFTS = (data: Array<Object>) => ({
  type: SEED_USER_NFTS,
  payload: data
})

export const buyNFT = (id: any)  => ({
  type: BUY_NFT,
  payload: id
})

export const userBoughtNFT = () => ({
  type: USER_BOUGHT_NFT,
})