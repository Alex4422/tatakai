import { connect } from "react-redux";
import Profile from "../../components/Profile";
import { getTAK, importTAKMetamaskWallet } from "../../lib/actions/user";
type IMapStateToPropsType = {
  user: IUserState;
};
const mapStateToProps = ({
  user: { cards, accounts, isAdmin, balanceTAK, balanceWei, isLoading },
}: IMapStateToPropsType) => {
  return {
    cards,
    accounts,
    isAdmin,
    balanceTAK,
    balanceWei,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getTAK : () => dispatch(getTAK()),
  importTAKMetamaskWallet: () => dispatch(importTAKMetamaskWallet())
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
