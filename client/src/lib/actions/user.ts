import { GET_AUTH_METAMASK, SEED_AUTH_METAMASK } from "./types";

export const getAuthMetamask = () => ({
  type: GET_AUTH_METAMASK,
});


export const seedAuthMetamask = (web3: any, accounts: any) => ({
  type: SEED_AUTH_METAMASK,
  payload: { web3, accounts },
});
