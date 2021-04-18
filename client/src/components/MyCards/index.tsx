import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import MyCardsGallery from "../../ui/MyCardsGallery";
import CircularProgress from "@material-ui/core/CircularProgress";

import "../styles.css";

declare interface Props {
  getUserNFTS: Function;
  cards: Array<any> | [];
  isLoading: boolean;
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
const MyCards = ({
  cards,
  getUserNFTS,
  isLoading,
}: Props) => {
  const classes = useStyles();
  useEffect(() => {
    getUserNFTS();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <div className="App">
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="secondary">My Cards</Typography>
        </Breadcrumbs>
        {isLoading 
        ? <CircularProgress size="75px" style={{ color: "white" }} />
        : <MyCardsGallery items={cards} />
        }
      </div>
    </Container>
  );
};

export default MyCards;
