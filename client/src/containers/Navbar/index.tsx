import { connect } from "react-redux";

import Navbar from "../../ui/Navbar";

type IMapStateToPropsType = {
  user: IUserState;
};

const mapStateToProps = ({user: {isAdmin}}: IMapStateToPropsType) => ({
isAdmin,
});

const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
