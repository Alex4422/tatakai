import { connect } from "react-redux";
import Admin from "../../components/Admin";

const mapStateToProps = ({
  contract: { web3, accounts, contract },
  storage: { storageValue, isLoading, inputValue },
}: IMapStateToPropsType) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => ({
  f: () => {},
});
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
