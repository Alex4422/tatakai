import { DEPLOY } from "../actions/types";

export const initialState = {
  instance: null,
  isPending: false,
  event: null,
  metadata: {
    image: null,
    description: null,
    age: null,
    citizenShip: null,
  },
};

const cardItem = (state = initialState, { type, payload }) => {
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
export default cardItem;
