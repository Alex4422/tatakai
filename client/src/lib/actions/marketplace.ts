import {
  INIT_MARKET,
  SEED_MARKET,
  SELECT_CURRENT,
  BUY_NFT,
  BUY_NFT_SUCCESS,
} from "./types";

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

export const buyNFT = (id: number, price: string) => ({
  type: BUY_NFT,
  payload: { id, price },
});

export const buyNFTSuccess = () => ({
  type: BUY_NFT_SUCCESS,
});
