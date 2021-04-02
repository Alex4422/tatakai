import { NEW_INSTANCE, SEED_INSTANCE } from "./types";

export const newInstance = () => ({
  type: NEW_INSTANCE,
});

export const seedInstance = (
  web3: any,
  accounts: Array<string>,
  instance: Object
) => ({
  type: SEED_INSTANCE,
  payload: { isLoading: false, web3, accounts, contract: instance },
});
