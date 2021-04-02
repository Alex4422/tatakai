import { useEffect, useCallback } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import "./App.css";

type Props = IContractAction & IContractState;
type StorageProps = IStorageState & IStorageAction;

const Admin = ({
  contract,
  storageValue,
  isLoading,
  inputValue,
  changeField,
  submitValue,
  newInstance,
}: Props & StorageProps) => {
  return <h1>Admin</h1>;
};
export default Admin;
