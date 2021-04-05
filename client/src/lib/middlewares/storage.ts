import { SUBMIT_VALUE } from "../actions/types";
import { seedValueReceipt } from "../actions/storage";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import { getContract } from "./utils";

const customMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const {
    contract: { admin, web3 },
    storage: { inputValue },
  } = getState();

  const instance = await getContract(web3, SimpleStorageContract);
  switch (action.type) {
    case SUBMIT_VALUE:
      try {
        instance.methods
          .set(inputValue)
          .send({ from: admin })
          .then((result: any) => {
            if (result.status) {
              dispatch(seedValueReceipt(inputValue));
            }
          });
      } catch (error) {
        console.error(error);
      }
      break;
    default:
      return next(action);
  }
  return next(action);
};
const storage = () => customMiddleware();
export default storage();
