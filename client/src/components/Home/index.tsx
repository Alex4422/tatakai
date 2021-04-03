import { useEffect, useCallback, useRef } from "react";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import "../styles.css";

type Props = IContractAction & IContractState;
type StorageProps = IStorageState & IStorageAction;

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
const Home = ({
  storageValue,
  isLoading,
  inputValue,
  changeField,
  submitValue,
  newInstance,
}: Props & StorageProps) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const handleOnChange = (e: any) => changeField(e);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    submitValue(e);
  };

  useEffect(() => {
    !isLoading && changeField({ target: { name: "inputValue", value: 0 } });
  }, [isLoading]);
  return (
    <Container component="main" maxWidth="xs">
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>

        <p>
          {true
            ? "Your contracts compiled and migrated successfully"
            : "Try to deploy your contract !"}
        </p>

        <p>
          Try changing the value stored on your smart contract :
          <form onSubmit={handleOnSubmit} style={classes.form}>
            <input
              style={classes.input}
              type="number"
              name="inputValue"
              value={inputValue}
              onChange={handleOnChange}
            />
            &nbsp;
            <Button
              size="small"
              type="submit"
              variant="outlined"
              color="primary"
            >
              Primary
            </Button>
          </form>
        </p>
        <div>
          The stored value is: {isLoading ? "data is loading..." : storageValue}
        </div>
      </div>
    </Container>
  );
};

export default Home;
