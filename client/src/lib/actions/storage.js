import {
  SET_VALUE_SUCCESS,
  GET_VALUE_SUCCESS,
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
const getValueSuccess = (value) => {
  return {
    type: GET_VALUE_SUCCESS,
    payload: { storageValue: value, isPending: false },
  };
};
const setValueSuccess = (value) => {
  return {
    type: SET_VALUE_SUCCESS,
    payload: { isPending: value },
  };
};

export const setValue = (value) => {
  return (dispatch, _, { instances: { SimpleStorage }, admin }) => {
    dispatch(transactionPending());
    SimpleStorage.methods
      .set(value)
      .send({ from: admin })
      .then((result) => {
        dispatch(setValueSuccess(!result.status));
        dispatch(getValue());
      })
      .catch(transactionError);
  };
};
export const getValue = () => {
  return (dispatch, _, { instances: { SimpleStorage } }) => {
    dispatch(transactionPending());
    SimpleStorage.methods
      .get()
      .call()
      .then((result) => dispatch(getValueSuccess(result)))
      .catch(transactionError);
  };
};
