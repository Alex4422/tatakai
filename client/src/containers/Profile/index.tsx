import { connect } from "react-redux";
import Profile from "../../components/Profile";
import { changeField, submitValue, changeFieldFile } from "../../lib/actions/admin";

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

});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
