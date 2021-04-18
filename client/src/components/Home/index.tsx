import { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Modal from "../../ui/Modal";
import { makeStyles } from "@material-ui/core/styles";
import combat from "../../assets/combat.png";
import "../styles.css";

declare interface Props {
  getAuthMetamask: Function;
  accounts: Array<string>;
  getUserStorage: Function;
  subscribeEvents: Function
}

const useStyles = makeStyles((theme) => ({

  breadcrumbs: {
    color: 'gray',
    marginTop: '40px',
    marginBottom: '40px'
  },
}));


const Home = ({ getAuthMetamask, accounts, getUserStorage, subscribeEvents }: Props) => {
  const classes = useStyles();
  
  useEffect(() => {
    if(!accounts){
      getAuthMetamask();
    }
  }, [accounts]);

  useEffect(() => {
    getUserStorage();
    subscribeEvents();
  }, [accounts])
  
  return (
    <Container component="main" maxWidth="lg" >
      <Modal />
      <div className="home" >
      <h1 className="titre">TAT<span className="golden">A</span>KAI</h1>
      <div className="textbox">
        <p className="catch"><strong>Get</strong> your fighters</p>
        <p className="catch"><strong>Bet</strong> with them</p>
        <p className="catch golden "><strong>Win</strong> unique Card</p>
      </div>
      </div>
    </Container>
  );
};
export default Home;
