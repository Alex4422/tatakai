import {
  CHANGE_FIELD,
  SUBMIT_VALUE,
  SEED_VALUE_RECEIPT,
} from "../actions/types";

export const initialState = {
  instance: null,
  storageValue: 0,
  inputValue: 0,
  isLoading: false,
};

// reducer qui va gérer les recettes
const storage = (
  oldState: IStorageState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case CHANGE_FIELD:
      return {
        ...oldState,
        ...payload,
      };
    case SUBMIT_VALUE:
      return {
        ...oldState,
        isLoading: true,
      };
    case SEED_VALUE_RECEIPT:
      return {
        ...oldState,
        ...payload,
        isLoading: false,
      };

    default:
      return {
        ...oldState,
      };
  }
};

export default storage;
