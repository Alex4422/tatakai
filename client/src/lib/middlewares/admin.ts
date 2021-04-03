import { ADMIN_FORM_SUBMIT } from "../actions/types";
import { mintNFTSuccess } from "../actions/admin-form";
import CardItem from "../../contracts/CardItem.json";
import { getContract } from "./utils";

const customMiddleware = () => ({ dispatch, getState }: any) => (
  next: any
) => async (action: IAction) => {
  const result = next(action);
  const {
    contract: { admin, web3 },
    admin: { token },
  } = getState();

  const instance = await getContract(web3, CardItem);

  console.log(instance._address, token);
  switch (action.type) {
    case ADMIN_FORM_SUBMIT:
      try {
        instance.methods
          .mintNFT(instance._address, "", token)
          .send({ from: admin })
          .then((result: any) => {
            if (result.status) {
              console.log(result);
              dispatch(mintNFTSuccess());
            }
          });
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
