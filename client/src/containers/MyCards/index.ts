import { connect } from "react-redux";
import MyCards from "../../components/MyCards";
import { refreshUserNFTS } from "../../lib/actions/user";

type IMapStateToPropsType = {
  user: IUserState;
  dashboard: IDashboardState;
};

const mapStateToProps = ({
  user: { cards },
  dashboard: {isLoading}
}: IMapStateToPropsType) => {
  return {
    cards: cards || [],
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  refreshUserNFTS: () => dispatch(refreshUserNFTS())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(MyCards);
