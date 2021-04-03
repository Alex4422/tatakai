import { DEPLOY, SEED_INSTANCE } from "./types";

export const deploy = (web3: any, accounts: any) => ({
  type: DEPLOY,
  payload: { web3, accounts, admin: accounts[0] },
});

export const seedInstance = (web3: any, accounts: Array<string>) => ({
  type: SEED_INSTANCE,
  payload: { isLoading: false, web3, accounts },
});
