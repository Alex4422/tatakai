import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Gallery from "../../ui/Gallery";
import CardsCarousel from "../../ui/CardsCarousel";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import "../styles.css";

declare interface Props {
  initMarket: Function;
  items: Array<ICard> | [];
  isLoading: Boolean;
  buyNFT: Function;
}

const useStyles = makeStyles((theme) => ({
    input: {
      padding: 5,
    },
    form: {
      marginTop: 10,
    },
    breadcrumbs: {
      color: 'gray',
      marginLeft: '80px',
      marginTop: '40px',
      marginBottom: '40px'
    },
}));
const MarketPlace = ({ initMarket, items, isLoading }: Props) => {
  const classes = useStyles();
  
  useEffect(() => {
    initMarket();
  }, []);

  useEffect(() => {
    console.log("isLoading", isLoading);
  }, [isLoading]);

  return (
    <Container component="main" maxWidth="lg">
      <div className="App">
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="secondary">Marketplace</Typography>
        </Breadcrumbs>
        {/* <CardsCarousel  /> */}
        {isLoading ? (
          <CircularProgress size="75px" style={{ color: "white" }} />
        ) : (
          <Gallery items={items} />
        )}
      </div>
    </Container>
  );
};
export default MarketPlace;
