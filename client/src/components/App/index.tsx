import React, { useEffect, useCallback } from "react";

import "./App.css";

type Props = IContractAction & IContractState;
type StorageProps = IStorageState & IStorageAction;

const App = ({
  contract,
  storageValue,
  isLoading,
  inputValue,
  changeField,
  submitValue,
  newInstance,
}: Props & StorageProps) => {
  const handleChange = (event: any) =>
    changeField(event.target.name, event.target.value);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    submitValue();
  };
  const fetchContract = useCallback(() => {
    newInstance();
  }, [newInstance]);

  useEffect(() => {
    console.log("New Instance...");
    fetchContract();
  }, [fetchContract]);
  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>

      <p>
        {contract
          ? "Your contracts compiled and migrated successfully"
          : "Try to deploy your contract !"}
      </p>
      <p>
        Try changing the value stored on your smart contract :{" "}
        <input
          type="number"
          name="inputValue"
          value={inputValue}
          onChange={handleChange}
        ></input>{" "}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </p>
      <div>
        The stored value is: {isLoading ? "data is loading..." : storageValue}
      </div>
    </div>
  );
};

export default App;
