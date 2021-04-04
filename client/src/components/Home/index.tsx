import { useEffect, createRef } from "react";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import "../styles.css";
import { getAuthMetamask } from "../../lib/actions/user";

declare interface Props {
  getAuthMetamask: Function;
  initMarket: Function;
};

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
const Home = ({getAuthMetamask, initMarket}:Props) => {
  const classes = useStyles();
 
  useEffect(() => {
    getAuthMetamask();
    //initMarket()
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <div className="App">
        <h1>Liste des NFTS : </h1>

        

       
       
      </div>
    </Container>
  );
};

export default Home;
