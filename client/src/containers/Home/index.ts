import { connect } from "react-redux";
import { getAuthMetamask } from "../../lib/actions/user";
import { getUserStorage} from "../../lib/actions/dashboard";
import Modal from "../../ui/Modal";
import Home from "../../components/Home";

type IMapStateToPropsType = {
  user: IUserState;
};

const mapStateToProps = ({user: {accounts}}: IMapStateToPropsType) => ({

});

const mapDispatchToProps = (dispatch: any) => ({
  getAuthMetamask: () => dispatch(getAuthMetamask()),
  getUserStorage: () => dispatch(getUserStorage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
