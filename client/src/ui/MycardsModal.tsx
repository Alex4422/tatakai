import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../hooks/useModal";
import { sellNFT } from "../lib/actions/marketplace";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import "./Card.css";

interface TemplateProps {
  item: ICard;
}
const Template = ({ item }: TemplateProps) => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state: any) => state.user);
  const [price, setPrice] = useState(item?.metadata?.price);
  const [isSelling, setIsSelling] = useState(false);
  const { handleClose } = useModal();
  
  const handleOnClick = () => {
    dispatch(sellNFT(item.id, parseInt(price,10)));
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
          <p>Type : {item?.metadata?.type}</p>
          <p>Age : {item?.metadata?.age}</p>
          <p>Nationality : {item?.metadata?.nationality}</p>
          <p>Price : {item?.metadata?.price} </p>
          <Grid item sm={2} xs={2}>
          <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="price"
                  type="checkbox"
                  label="Sell"
                  name="isSelling"
                  autoComplete="Sell"
                  defaultValue={isSelling}
                  style={{
                    color:"white"
                  }}
                  onChange={e => (setIsSelling(!isSelling))}
                />
          </Grid> 
         { isSelling
          ? <Grid item sm={6} xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="price"
                  type="number"
                  label="Price in TAK"
                  name="price"
                  autoComplete="price"
                  defaultValue={price || ""}
                  onChange={e => (setPrice(e.target.value))}
                  style={{
                    backgroundColor: "white", color:"black"
                  }}
                />
           </Grid>
          : null
          } 
         
        </div>

        <div className="card-actions">        
          <button
            onClick={handleClose}
            type="button"
            color="primary"
            className="card-action card-action-cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleOnClick}
            type="button"
            color="primary"
            className="card-action"
          >
            Sell
          </button>
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
