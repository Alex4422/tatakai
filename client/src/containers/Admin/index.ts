import { connect } from "react-redux";
import Admin from "../../components/Admin";
import { changeField, submitValue } from "../../actions/admin";
import { newInstance } from "../../actions/contract";

type IMapStateToPropsType = {
  contract: IContractState;
  admin: IAdminState;
};
const mapStateToProps = ({
  contract: { contract },
  admin: { token, isLoading },
}: IMapStateToPropsType) => {
  return {
    contract,
    token,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  changeField: (e: any) => dispatch(changeField(e)),
  newInstance: () => dispatch(newInstance()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
