import { INIT_MARKET, SEED_MARKET, SELECT_CURRENT } from "./types";

export const initMarket = () => ({
  type: INIT_MARKET,
});

export const seedMarket = (data: Array<Object>) => ({
  type: SEED_MARKET,
  payload: { items: data },
});

export const selectCurrent = (item: ICard) => ({
  type: SELECT_CURRENT,
  payload: { current: item },
});
