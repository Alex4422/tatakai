import { DEPLOY } from "../actions/types";

export const initialState = {
  instance: null,
  storageValue: 0,
  isPending: false,
  event: null,
};

const storage = (state = initialState, { type, payload }) => {
  switch (type) {
    case DEPLOY:
      return {
        ...state,
        instance: payload.storage.instance,
      };
    default:
      return {
        ...state,
        ...payload,
      };
  }
};

export default storage;
