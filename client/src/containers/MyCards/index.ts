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
  getUserNFTS: () => dispatch(getUserNFTS()),
  getAuthMetamask: () => dispatch(getAuthMetamask()),
  seedAuthMetamask: (web3: any, accounts: string[], balanceWei: Number) =>
    dispatch(seedAuthMetamask(web3, accounts, balanceWei)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyCards);
