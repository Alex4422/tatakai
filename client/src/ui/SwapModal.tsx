import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useModal } from "../hooks/useModal";
import { swapEthTak } from "../lib/actions/user";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "./Card.css";

const Template = () => {
  const dispatch = useDispatch();
  const [valueSwap, setValueSwap] = useState("");
  const { handleClose } = useModal();
  
  const handleOnClick = () => {
    dispatch(swapEthTak(parseInt(valueSwap,10)))
    handleClose();
  };

   return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "300px",
        height: "200px",
        margin: "200px auto",
        backgroundColor: "#fefefe",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
        <p>Echangez vos Ethers en tak token </p>
          <Grid item sm={5} xs={5}>
          <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="price"
                  type="number"
                  label="Value"
                  name="isSelling"
                  size="medium"
                  autoComplete="Sell"
                  style={{
                    color:"#ffffff", padding: "0.5rem"
                  }}
                  defaultValue={valueSwap || ""}
                  onChange={e => (setValueSwap(e.target.value))}
                />
          </Grid> 
        <div className="card-actions">        
          <button
            onClick={handleClose}
            type="button"
            color="primary"
            className="card-action"
          >
            Cancel
          </button>
          <button
            onClick={handleOnClick}
            type="button"
            color="secondary"
            className="card-action card-action-confirm"
          >
            Confirm
          </button>
       </div>
    </div>

  );
};

export default function SimpleModal() {
  const { handleClose, visible } = useModal();
  return (
    <div>
      <Modal
        open={visible}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Template  />
      </Modal>
    </div>
  );
}
