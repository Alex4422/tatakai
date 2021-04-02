import {
  MINT_NFT_SUCCESS,
  TRANSACTION_ERROR,
  TRANSACTION_PENDING,
} from "./types";

const transactionPending = () => {
  return {
    type: TRANSACTION_PENDING,
    payload: { isPending: true },
  };
};
const transactionError = (err) => {
  return {
    type: TRANSACTION_ERROR,
    payload: { error: err },
  };
};

const mintNFTSuccess = (id, bool) => {
  return {
    type: MINT_NFT_SUCCESS,
    payload: { id, isPending: bool },
  };
};

export const mint = (addressMarketplace, hash, metadata) => {
  return (dispatch, _, { instances: { CardItem }, admin }) => {
    dispatch(transactionPending());
    CardItem.methods
      .mintNFT(addressMarketplace, hash, metadata)
      .send({ from: admin })
      .then((result) => dispatch(mintNFTSuccess(!result.status)))
      .catch(transactionError);
  };
};
