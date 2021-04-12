import { useEffect } from "react";
import Container from "@material-ui/core/Container";
import MyCardsGallery from "../../ui/MyCardsGallery";
import CircularProgress from "@material-ui/core/CircularProgress";

import "../styles.css";

declare interface Props {
  getUserNFTS: Function;
  cards: Array<any> | [];
  isLoading: boolean;
}

const useStyles = () => {
  const classes = {
    input: {
      padding: 5,
    },
    form: {
      marginTop: 10,
    },
  };
  return classes;
};
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
        <h1>My Cards </h1>
        {isLoading 
        ? <CircularProgress size="75px" style={{ color: "black" }} />
        : <MyCardsGallery items={cards} />
        }
      </div>
    </Container>
  );
};

export default MyCards;
