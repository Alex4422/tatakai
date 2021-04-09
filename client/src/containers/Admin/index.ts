import { connect } from "react-redux";
import Admin from "../../components/Admin";
import {
  changeField,
  submitValue,
  changeFieldFile,
} from "../../lib/actions/admin";

type IMapStateToPropsType = {
  contract: IContractState;
  admin: IAdminState;
};
const mapStateToProps = ({
  contract: {},
  admin: { nft, isLoading, isFullfilled },
}: IMapStateToPropsType) => {
  return {
    nft,
    isLoading,
    isFullfilled,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  changeField: (e: any) => dispatch(changeField(e)),
  submitValue: (data: any) => dispatch(submitValue(data)),
  changeFieldFile: (e: any) => dispatch(changeFieldFile(e)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
