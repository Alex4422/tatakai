import { connect } from "react-redux";
import Profile from "../../components/Profile";
import { getTAK, importTAKMetamaskWallet, getBalances, swapEthTak } from "../../lib/actions/user";
type IMapStateToPropsType = {
  user: IUserState;
};
const mapStateToProps = ({
  user: { cards, accounts, isAdmin, balanceTAK, balanceWei, isLoading, isNew },
}: IMapStateToPropsType) => {
  return {
    cards,
    accounts,
    isAdmin,
    balanceTAK,
    balanceWei,
    isLoading,
    isNew,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getTAK : () => dispatch(getTAK()),
  importTAKMetamaskWallet: () => dispatch(importTAKMetamaskWallet()),
  getBalances: () => dispatch(getBalances()),
  swapEthTak: (value: number) => dispatch(swapEthTak(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
