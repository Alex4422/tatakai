import { connect } from "react-redux";
import App from "../components/App";
import { newInstance } from "../actions/contract";
import { changeField, submitValue } from "../actions/storage";

const mapStateToProps = ({
  contract: { web3, accounts, contract },
  storage: { storageValue, isLoading, inputValue },
}: any) => {
  return {
    web3,
    accounts,
    contract,
    storageValue,
    isLoading,
    inputValue,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  newInstance: () => dispatch(newInstance()),
  changeField: (e: any) => dispatch(changeField(e)),
  submitValue: (e: any) => dispatch(submitValue(e)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
