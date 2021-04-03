import { SUBMIT_VALUE } from "../actions/types";
import { seedValueReceipt } from "../actions/storage";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import { getContract } from "./utils";
const customMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const result = next(action);
  const {
    contract: { admin, web3 },
    storage: { inputValue },
  } = getState();

  const instance = await getContract(web3, SimpleStorageContract);
  switch (action.type) {
    case SUBMIT_VALUE:
      try {
        console.log("passe par submit value", action.payload);
        console.log("instance:", instance);
        const res = await instance.methods
          .set(inputValue)
          .send({ from: admin });
        if (res.status) {
          dispatch(seedValueReceipt(inputValue));
        }
      } catch (error) {
        console.error(error);
      }
      break;
    default:
      return result;
  }
  return result;
};
const storage = () => customMiddleware();
export default storage();
