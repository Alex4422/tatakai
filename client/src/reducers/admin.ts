import { ADMIN_FORM_SUBMIT, ADMIN_FORM_HANDLECHANGE } from "../actions/types";

export const initialState = {
  token: {},
  isLoading: false,
};

const admin = (
  oldState: IAdminState = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case ADMIN_FORM_HANDLECHANGE:
      return {
        ...oldState,
        token: { ...oldState.token, ...payload },
      };
    case ADMIN_FORM_SUBMIT:
      return {
        ...oldState,
        ...payload,
      };

    default:
      return {
        ...oldState,
        ...payload,
      };
  }
};

export default admin;
