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
    <Container component="main" maxWidth="lg" style={{backgroundImage: `url(${img})`, backgroundSize: "cover", height: "100vh"}} >
      <Modal />
      <div className="App" >
        <h1>TATAKAI - Welcome</h1>
      <div>
        <h2>...woRk In proGreSs...</h2>
      </div>
      </div>
    </Container>
  );
};
export default Home;
