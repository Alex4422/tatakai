import { SUBMIT_VALUE } from "../actions/types";
import { seedValueReceipt } from "../actions/storage";

const customMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const result = next(action);
  const {
    contract: { accounts },
    storage: { contract, inputValue },
  } = getState();

  switch (action.type) {
    case SUBMIT_VALUE:
      try {
        console.log("passe par submit value", action.payload);
        console.log("instance:", contract);
        const res = await contract.methods
          .set(inputValue)
          .send({ from: accounts[0] });
        if (res.status) {
          dispatch(seedValueReceipt(inputValue));
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
      break;
    default:
      return result;
  }
  return result;
};
const contract = () => customMiddleware();
export default contract;
