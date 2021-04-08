import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Gallery from "../../ui/Gallery";
import CardsCarousel from "../../ui/CardsCarousel";
import "../styles.css";
import nfts from "./nfts";

declare interface Props {
  initMarket: Function;
  items: Array<ICard> | null;
  isLoading: Boolean;
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
        <h1>Liste des NFTS : </h1>
        {/* <CardsCarousel  /> */}
        {isLoading ? (
          <CircularProgress size="75px" style={{ color: "black" }} />
        ) : (
          <Gallery items={items} />
        )}
      </div>
    </Container>
  );
};
export default MarketPlace;
