import { connect } from "react-redux";
import MyCards from "../../components/MyCards";
import { getUserNFTS } from "../../lib/actions/user";

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
  user: { cards, isLoading },
}: IMapStateToPropsType) => {
  return {
    cards: cards || items,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getUserNFTS: () => dispatch(getUserNFTS())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(MyCards);
