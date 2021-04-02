import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { setValue, getValue } from "../lib/actions/storage";
import "./App.css";

const App = ({
  instance,
  isPending,
  storageValue,
  setValue,
  getValue,
  event,
}) => {
  const inputRef = useRef();
  const [localValue, setLocalValue] = useState(null);

  const handleOnChange = (e) => setLocalValue(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!localValue) {
      return false;
    }
    setValue(localValue);
    inputRef.current.value = null;
  };

  useEffect(() => {
    if (event?.event === "Set") {
      alert("new value added");
    }
  }, [event?.transactionHash, event?.event]);
  useEffect(() => getValue(), [getValue]);

  return (
    <div className="App">
      <h1>Smart Contract Example with React &amp; Redux</h1>
      <div className="App">
        <p>Try changing the value stored on your smart contract :</p>
        <form onSubmit={handleOnSubmit}>
          <input
            type="number"
            onChange={handleOnChange}
            placeholder="enter value here"
            ref={inputRef}
          />
          &nbsp;
          <button type="submit">Submit</button>
        </form>
        <p>
          The stored value is: {isPending ? "data is loading..." : storageValue}
        </p>
      </div>
      <p className="footer">
        {!!instance && `contract's address : ${instance.options.address}`}
      </p>
    </div>
  );
};

const mapStateToProps = ({ storage, contracts }) => {
  return {
    storageValue: storage.storageValue,
    isPending: storage.isPending,
    instance: storage.instance,
    event: contracts.event,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setValue: (value) => dispatch(setValue(value)),
  getValue: () => dispatch(getValue()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
