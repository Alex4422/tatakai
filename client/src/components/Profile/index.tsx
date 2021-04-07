import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";import Gallery from "../../ui/Gallery";
import "../styles.css";

declare interface Props {

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
const Profile = ({  }: Props) => {
  const classes = useStyles();
  useEffect(() => {

  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <div className="App">
        <h1>My Profile </h1>
       
      </div>
    </Container>
  );
};

export default Profile;
