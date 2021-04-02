  
import React, { useEffect, useCallback } from "react";

import "./App.css";

const App = ({web3, accounts, contract, storageValue, inputValue, isLoading, newInstance, changeField, submitValue}:propsConnector) => {

const fetchContract = useCallback(()=> {
  newInstance()
},[newInstance])
  
useEffect(() => {
    console.log('New Instance...');
      fetchContract();
}, [fetchContract])

const handleChange = (event: any) => changeField(event.target.value, event.target.name);
const handleSubmit = (event: any) => submitValue();

    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
       
        <p>
          {contract ? "Your contracts compiled and migrated successfully" : "Try to deploy your contract !" }
        </p>
        <p>
          Try changing the value stored on your smart contract : <input type="number" name="inputValue" value={inputValue} onChange={handleChange}></input> <button type="button" onClick={handleSubmit} >Submit</button>
        </p>
        <div>The stored value is: {isLoading ? "data is loading..." : storageValue}</div>
      </div>
    );
  }


export default App;