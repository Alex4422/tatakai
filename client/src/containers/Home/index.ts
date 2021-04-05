import { connect } from "react-redux";
import { getAuthMetamask } from "../../lib/actions/user";
import Home from "../../components/Home";

type IMapStateToPropsType = {};

const mapStateToProps = (state: IMapStateToPropsType) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  getAuthMetamask: () => dispatch(getAuthMetamask()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
