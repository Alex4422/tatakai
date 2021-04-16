import { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Modal from "../../ui/Modal";
import img from "../../assets/pexels-pavel-danilyuk-6296034.jpg";
import "../styles.css";

declare interface Props {
  getAuthMetamask: Function;
  accounts: Array<string>;
  getUserStorage: Function;
}
const Home = ({ getAuthMetamask, accounts, getUserStorage }: Props) => {
  useEffect(() => {
    if(!accounts){
      getAuthMetamask();
    }
  }, [accounts]);

  useEffect(() => {
    getUserStorage();
  }, [accounts])
  
  return (
    <Container component="main" maxWidth="lg" >
      <Modal />
      <div className="App" >
      {/*  */}
      </div>
    </Container>
  );
};
export default Home;
