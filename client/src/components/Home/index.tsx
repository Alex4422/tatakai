import { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Modal from "../../ui/Modal";
import "../styles.css";
import trait from "../../assets/trait.svg"

declare interface Props {
  getAuthMetamask: Function;
  accounts: Array<string>;
  getUserStorage: Function;
  subscribeEvents: Function
}

const Home = ({ getAuthMetamask, accounts, getUserStorage, subscribeEvents }: Props) => {
  
  useEffect(() => {
    if(!accounts){
      getAuthMetamask();
    }
  }, [accounts]);

  useEffect(() => {
    getUserStorage();
    if(accounts){
      subscribeEvents();
    }
  }, [accounts])
  
  return (
    <Container component="main" maxWidth="lg" >
      <Modal />
      <div className="home" >
      <div className="title">
        <h1 className="titre">TAT<span className="golden">A</span>KAI</h1>
      </div>
      
      <div className="textbox">
        <p className="catch anim1"><strong>Get</strong> your fighters</p>
        <p className="catch anim2"><strong>Bet</strong> with them</p>
        <p className="catch anim3 golden "><strong>Win</strong> unique Card</p>
        <img src={trait} className="trait"></img>
      </div>
      </div>
    </Container>
  );
};
export default Home;
