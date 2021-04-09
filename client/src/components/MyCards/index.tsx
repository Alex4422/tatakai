import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Gallery from "../../ui/Gallery";
import CardsCarousel from "../../ui/CardsCarousel";
import "../styles.css";

declare interface Props {
  fetchUserCards: Function;
  getAuthMetamask: Function;
  seedAuthMetamask: Function;
  getUserNFTS: Function;
  cards: Array<any> | [];
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
const MarketPlace = ({
  getAuthMetamask,
  seedAuthMetamask,
  cards,
  getUserNFTS,
}: Props) => {
  const classes = useStyles();
  useEffect(() => {
    getUserNFTS();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <div className="App">
        <h1>My Cards </h1>
        {/* <CardsCarousel items={nfts} /> */}
        <Gallery items={cards} />
      </div>
    </Container>
  );
};

export default MarketPlace;
