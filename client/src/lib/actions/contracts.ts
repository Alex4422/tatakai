import {
  SEED_CONTRACTS
} from "./types";

export const seedContracts = (TakToken: any, Marketplace: any, CardItem: any) => ({
  type: SEED_CONTRACTS,
  payload: { TakToken, Marketplace, CardItem },
});
