import { connect } from "react-redux";
import { getAuthMetamask } from "../../lib/actions/user";
import Modal from "../../ui/Modal";
import Home from "../../components/Home";

type IMapStateToPropsType = {
  user: IUserState;
};

const mapStateToProps = ({user: {accounts}}: IMapStateToPropsType) => ({

});

const mapDispatchToProps = (dispatch: any) => ({
  getAuthMetamask: () => dispatch(getAuthMetamask()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
