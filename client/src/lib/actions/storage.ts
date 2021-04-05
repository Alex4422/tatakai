import { CHANGE_FIELD, SUBMIT_VALUE, SEED_VALUE_RECEIPT } from "./types";

export const changeField = ({ target: { name, value } }: IEventType) => ({
  type: CHANGE_FIELD,
  payload: { [name]: value },
});
export const submitValue = ({ target: { value } }: IEventType) => ({
  type: SUBMIT_VALUE,
  payload: { storageValue: value, inputValue: value },
});
export const seedValueReceipt = (value: Number) => ({
  type: SEED_VALUE_RECEIPT,
  payload: { storageValue: value },
});
