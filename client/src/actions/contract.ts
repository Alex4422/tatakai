import { NEW_INSTANCE, SEED_INSTANCE, CHANGE_FIELD, SUBMIT_VALUE, SEED_VALUE_RECEIPT } from "./types";



export const newInstance = () => ({
  type : NEW_INSTANCE
})

export const seedInstance = (web3:any, accounts:Array<string>, instance:Object, storageValue:number) => ({
  type : SEED_INSTANCE,
  web3,
  accounts,
  instance,
  storageValue,
})

export const changeField = (value: Number, field: string) => ({
  type: CHANGE_FIELD,
  payload: { [field]: value },
});

export const submitValue = () => ({
  type: SUBMIT_VALUE
});

export const seedValueReceipt = (value: Number) => ({
  type: SEED_VALUE_RECEIPT,
  payload: value
})