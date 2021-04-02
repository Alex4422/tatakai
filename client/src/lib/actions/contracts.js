import { DEPLOY } from "./types";

export const deploy = () => {
  return (dispatch, _, { instances: { SimpleStorage }, accounts, admin }) => {
    dispatch({
      type: DEPLOY,
      payload: {
        accounts,
        admin,
        storage: { instance: SimpleStorage },
      },
    });
  };
};
