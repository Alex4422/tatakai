import { connect } from "react-redux";
import { getAuthMetamask } from "../../lib/actions/user";
import { getUserStorage, subscribeEvents} from "../../lib/actions/dashboard";
import Modal from "../../ui/Modal";
import Home from "../../components/Home";

type IMapStateToPropsType = {
  user: IUserState;
};

const mapStateToProps = ({user: {accounts}}: IMapStateToPropsType) => {
  return {
    accounts
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  getAuthMetamask: () => dispatch(getAuthMetamask()),
  getUserStorage: () => dispatch(getUserStorage()),
  subscribeEvents: () => dispatch(subscribeEvents())
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
