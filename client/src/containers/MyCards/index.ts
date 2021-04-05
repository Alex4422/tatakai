import { connect } from "react-redux";
import MyCards from "../../components/MyCards";
import { seedAuthMetamask, getAuthMetamask } from "../../lib/actions/user";

// dummy data pending api call available
const items = [
  { id: 1, title: "item #1" },
  { id: 2, title: "item #2" },
  { id: 3, title: "item #3" },
  { id: 4, title: "item #4" },
];

type IMapStateToPropsType = {
  contract: IContractState;
  user: IUserState;
};

const mapStateToProps = ({
  contract: { web3, accounts },
  user: { cards },
}: IMapStateToPropsType) => {
  return {
    web3,
    accounts,
    cards: cards || items,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserCards: () => null,
  getAuthMetamask: () => dispatch(getAuthMetamask()),
  seedAuthMetamask: (web3: any, accounts: string[]) =>
    dispatch(seedAuthMetamask(web3, accounts)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyCards);
