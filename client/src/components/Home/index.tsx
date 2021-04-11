import { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Modal from "../../ui/Modal";
import "../styles.css";

declare interface Props {
  getAuthMetamask: Function;
  accounts: Array<string>;
}
const Home = ({ getAuthMetamask, accounts }: Props) => {
  useEffect(() => {
    if(!accounts){
      getAuthMetamask();
    }
  }, [accounts]);

  return (
    <Container component="main" maxWidth="lg">
      <Modal />
      <div className="App">
        <h1>TAKAKAI - Welcome</h1>
      </div>
    </Container>
  );
};
export default Home;
