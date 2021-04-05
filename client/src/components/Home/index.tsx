import { useEffect, useState } from "react";
import { getAuthMetamask } from "../../lib/actions/user";
import Container from "@material-ui/core/Container";
import Gallery from "../../ui/Gallery";
import CardsCarousel from "../../ui/CardsCarousel";
import "../styles.css";

declare interface Props {
  getAuthMetamask: Function;
  initMarket: Function;
  nfts: Array<Object> | null;
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
const Home = ({ getAuthMetamask, initMarket, nfts }: Props) => {
  const classes = useStyles();
  const [spacing, setSpacing] = useState(2);

  useEffect(() => {
    getAuthMetamask();
    //initMarket()
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <div className="App">
        <h1>Liste des NFTS : </h1>
        {/* <CardsCarousel items={nfts} /> */}
        <Gallery items={nfts} />
      </div>
    </Container>
  );
};

export default Home;
