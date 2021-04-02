import { NEW_INSTANCE, SEED_INSTANCE, CHANGE_FIELD, SUBMIT_VALUE, SEED_VALUE_RECEIPT } from '../actions/types';

export const initialState = {
  web3: null,
  accounts: null,
  contract: {},
  storageValue: 0,
  inputValue: 0,
  isLoading: false,
};

// reducer qui va gérer les recettes
const reducer = (oldState: State = initialState, action: Action ) => {
  switch (action.type) {
    case NEW_INSTANCE:
      return {
        ...oldState,
        isLoading: true,
      };
    case SEED_INSTANCE:
      return {
        ...oldState,
        isLoading: false,
        web3: action.web3,
        accounts: action.accounts,
        contract: action.instance,
        storageValue: action.storageValue,
        inputValue: action.storageValue,
      };
    case CHANGE_FIELD:
      return {
        ...oldState,
        ...action.payload,
      };
    case SUBMIT_VALUE:
      return {
        ...oldState,
        isLoading: true,
      };
    case SEED_VALUE_RECEIPT:
      return {
        ...oldState,
        isLoading: false,
        storageValue: action.payload,
      };
    default:
      return { ...oldState };
  }
};

export default reducer;