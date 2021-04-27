import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Gallery from "../../ui/Gallery";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import "../styles.css";

declare interface Props {
  refreshMarket: Function;
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
      marginTop: '40px',
      marginBottom: '40px'
    },
}));
const MarketPlace = ({ refreshMarket, items, isLoading }: Props) => {
  const classes = useStyles();
  
  useEffect(() => {
    refreshMarket();
  }, []);


  return (
    <Container component="main" maxWidth="lg">
      <div className="App">
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="secondary">Marketplace</Typography>
        </Breadcrumbs>
        {isLoading ? (
          <CircularProgress size="75px" style={{ color: "white", marginLeft: "45%" }} />
        ) : (
          <Gallery items={items} />
        )}
      </div>
    </Container>
  );
};
export default MarketPlace;
