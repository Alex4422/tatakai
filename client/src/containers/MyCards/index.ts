import { connect } from "react-redux";
import MyCards from "../../components/MyCards";
import { seedAuthMetamask, getAuthMetamask, getUserNFTS } from "../../lib/actions/user";

// dummy data pending api call available
const items = [
  { id: 1, title: "item #1" },
  { id: 2, title: "item #2" },
  { id: 3, title: "item #3" },
  { id: 4, title: "item #4" },
];

type IMapStateToPropsType = {
  user: IUserState;
};

const mapStateToProps = ({
  user: { cards },
}: IMapStateToPropsType) => {
  return {
    cards: cards || items,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getUserNFTS: () => dispatch(getUserNFTS())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(MyCards);
