import { CHANGE_FIELD, SUBMIT_VALUE, SEED_VALUE_RECEIPT } from "./types";

export const changeField = (field: string, value: Number) => ({
  type: CHANGE_FIELD,
  payload: { [field]: value },
});
export const submitValue = () => ({
  type: SUBMIT_VALUE,
});
export const seedValueReceipt = (value: Number) => ({
  type: SEED_VALUE_RECEIPT,
  payload: { storageValue: value },
});
