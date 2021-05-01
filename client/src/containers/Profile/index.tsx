import { connect } from "react-redux";
import Profile from "../../components/Profile";
import { importTAKMetamaskWallet, getBalances, swapEthTak } from "../../lib/actions/user";
import { getTAK } from "../../lib/actions/admin";

type IMapStateToPropsType = {
  user: IUserState;
};
const mapStateToProps = ({
  user: { cards, accounts, isAdmin, balanceTAK, balanceWei, isLoading, isNew, provider },
}: IMapStateToPropsType) => {
  return {
    cards,
    accounts,
    isAdmin,
    balanceTAK,
    balanceWei,
    isLoading,
    isNew,
    provider,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getTAK: () => dispatch(getTAK()),
  importTAKMetamaskWallet: () => dispatch(importTAKMetamaskWallet()),
  getBalances: () => dispatch(getBalances()),
  swapEthTak: (value: number) => dispatch(swapEthTak(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
