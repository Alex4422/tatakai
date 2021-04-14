import { connect } from "react-redux";
import MarketPlace from "../../components/MarketPlace";
import { initMarket } from "../../lib/actions/marketplace";

type IMapStateToPropsType = {
  marketplace: IMarketplaceState;
  dashboard: IDashboardState
};

const mapStateToProps = ({
  marketplace: { items },
  dashboard: {isLoading},
}: IMapStateToPropsType) => {
  return {
    items: items || [],
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  initMarket: () => dispatch(initMarket()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);
