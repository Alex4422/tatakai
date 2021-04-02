import { DEPLOY, LOG_EVENT } from "../actions/types";

export const initialState = {
  accounts: [],
  admin: null,
  event: null,
};

const contracts = (state = initialState, { type, payload }) => {
  switch (type) {
    case DEPLOY:
      return {
        admin: payload.admin,
        accounts: payload.accounts,
      };
    case LOG_EVENT:
      const { event, returnValues, transactionHash } = payload;
      return {
        ...state,
        event: { event, returnValues, transactionHash },
      };
    default:
      return state;
  }
};
export default contracts;
