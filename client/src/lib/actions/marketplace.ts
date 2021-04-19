import {
  INIT_MARKET,
  SEED_MARKET,
  SELECT_CURRENT,
  BUY_NFT,
  BUY_NFT_SUCCESS,
  IS_LOADING,
  SELL_NFT,
  WITHDRAW_NFT_ON_SALE,
  UPDATE_IS_FOR_SALE,
  APPROVE_MARKETPLACE_TO_SELL,
  REFRESH_MARKET
} from "./types";

export const initMarket = () => ({
  type: INIT_MARKET,
});

export const refreshMarket = () => ({
  type: REFRESH_MARKET,
});

export const seedMarket = (data: Array<Object>) => ({
  type: SEED_MARKET,
  payload:  {items: data } ,
});

export const selectCurrent = (item: ICard) => ({
  type: SELECT_CURRENT,
  payload: { current: item },
});

export const buyNFT = (id: number, price: string) => ({
  type: BUY_NFT,
  payload: { id, price },
});

export const sellNFT = (id: number, price: number) => ({
  type: SELL_NFT,
  payload: {id, price}
})

export const withdrawNFTonSale = (id: number) => ({
  type: WITHDRAW_NFT_ON_SALE,
  payload: id
})

export const buyNFTSuccess = () => ({
  type: BUY_NFT_SUCCESS,
});

export const isLoading = () => ({
  type : IS_LOADING,
})

export const updateIsForSale = (id: number) => ({
  type: UPDATE_IS_FOR_SALE,
  payload : id
})


export const approveMarketplaceToSell = () => ({
  type: APPROVE_MARKETPLACE_TO_SELL
}) 