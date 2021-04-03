import { DEPLOY } from "./types";

export const deploy = (web3: any, accounts: any) => ({
  type: DEPLOY,
  payload: { web3, accounts, admin: accounts[0] },
});
