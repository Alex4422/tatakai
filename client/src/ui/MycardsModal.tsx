import { makeStyles } from "@material-ui/core/styles";
import {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../hooks/useModal";
import { sellNFT, withdrawNFTonSale } from "../lib/actions/marketplace";
import { Checkbox, Modal, TextField, Grid, FormControlLabel } from '@material-ui/core';
import logo from "../assets/logo_fond_noir.svg";

import "./Card.css";

interface TemplateProps {
  item: ICard;
}
const useStyles = makeStyles((theme) => ({
  input: {
    "& .MuiInputLabel-outlined": {
      color: "#fff"
    },
    "& .MuiFilledInput-input": {
      color: "#fff"
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff"
    },
  }
}));




const Template = ({ item }: TemplateProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [price, setPrice] = useState(item?.price);
  const [isSelling, setIsSelling] = useState(false);
  const { handleClose } = useModal();
  
  const handleOnClick = () => {
    dispatch(sellNFT(item.id, price));
    handleClose();
  };

  const handleOnClickWithdraw = () => {
    dispatch(withdrawNFTonSale(item.id));
    handleClose();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <div className="card">
        <div
          style={{
            backgroundImage: `url(${item?.image})`,
            backgroundSize: "cover",
          }}
          className="card-image"
        />
        <div className="card-title">{item?.metadata?.name}</div>
      
        <div className="card-desc">
          <p>Type : <span className="info">{item?.metadata?.type}</span></p>
          <p>Age : <span className="info">{item?.metadata?.age}</span></p>
          <p>Nationality : <span className="info">{item?.metadata?.nationality}</span></p>
          <p>Current Price : <span className="info">{item?.price} <img className="logo" src={logo} alt="logo"/></span></p>
          <p>Statut: <span className="info">{(item?.isForSale === true)? "On Market!" : "OKLM"}</span></p>
          <Grid item sm={12} xs={12}> 
          <FormControlLabel
            control={ <Checkbox
                  className={classes.input}
                  style={{color: "white", padding: "0.6em 0 0.6em 0"}}
                  required              
                  id="price"
                  name="isSelling"
                  size="medium"
                  checked={isSelling}
                  onChange={e => (setIsSelling(!isSelling))}
                />
        }
        label="Set Price"
        labelPlacement="start"
        style={{marginLeft: "0rem"}}
      />
         
         
         { isSelling
          ? 
                <TextField
                  variant="outlined"
                  className={classes.input}
                  required
                  margin="dense"
                  id="price"
                  type="number"
                  label="Price in TAK"
                  name="price"
                  autoComplete="price"
                  defaultValue={price || ""}
                  onChange={e => (setPrice(parseInt(e.target.value,10)))}
                  style={{marginLeft: "2rem"}}
                />
          
          : null
          } 
          </Grid> 
        </div>

        <div className="card-actions">        
          <button
            onClick={handleClose}
            type="button"
            color="primary"
            className="card-action"
          >
            Cancel
          </button>
          {(item?.isForSale === true)
          ? <button
          onClick={handleOnClickWithdraw}
          type="button"
          color="secondary"
          className="card-action card-action-confirm"
        >
          Withdraw
        </button> 
          :<button
            onClick={handleOnClick}
            type="button"
            color="primary"
            className="card-action card-action-confirm"
          >
            Sell
          </button> 
          }
          
        </div>
    </div>
  </div>
  );
};

export default function SimpleModal() {
  const { handleClose, visible } = useModal();
  const { current } = useSelector((state: any) => state.marketplace);
  return (
    <div>
      <Modal
        open={visible}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Template item={current} />
      </Modal>
    </div>
  );
}
