import { connect } from "react-redux";
import MarketPlace from "../../components/MarketPlace";
import { initMarket } from "../../lib/actions/marketplace";

// dummy data pending api call available
const items = [
  { id: 1, title: "item #1" },
  { id: 2, title: "item #2" },
  { id: 3, title: "item #3" },
  { id: 4, title: "item #4" },
  { id: 5, title: "item #5" },
  { id: 6, title: "item #6" },
  { id: 7, title: "item #7" },
  { id: 8, title: "item #8" },
  { id: 9, title: "item #9" },
  { id: 10, title: "item #10" },
];

type IMapStateToPropsType = {
  contract: IContractState;
  marketplace: IMarketplaceState;
};

const mapStateToProps = ({
  contract: { web3, accounts },
  marketplace: { NFTS },
}: IMapStateToPropsType) => {
  return {
    web3,
    accounts,
    nfts: NFTS || items,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  initMarket: () => dispatch(initMarket()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);
