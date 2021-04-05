import { INIT_MARKET, SEED_MARKET } from "./types";

export const initMarket = () => ({
  type: INIT_MARKET,
});

export const seedMarket = (data: Array<Object>) => ({
  type: SEED_MARKET,
  payload: data,
});

