import { connect } from "react-redux";
import Home from "../../components/Home";
import { getAuthMetamask } from "../../lib/actions/user";
import { initMarket } from "../../lib/actions/marketplace";



type IMapStateToPropsType = {
  contract: IContractState;
};

const mapStateToProps = ({
  contract: { web3, accounts },
}: IMapStateToPropsType) => {
  return {
    web3,
    accounts,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getAuthMetamask: () => dispatch(getAuthMetamask()),
  initMarket: () => dispatch(initMarket()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
