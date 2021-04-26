import { useSelector, useDispatch } from "react-redux";
import {useState} from "react";
import { useModal } from "../hooks/useModal";
import { buyNFT, withdrawNFTonSale} from "../lib/actions/marketplace";
import {toggleToWishlist} from "../lib/actions/dashboard"
import Modal from "@material-ui/core/Modal";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import History from "./history";

import "./Card.css";

interface TemplateProps {
  item: ICard;
}
const Template = ({ item }: TemplateProps) => {
  const dispatch = useDispatch();
  const { accounts, wishlist } = useSelector((state: any) => state.user);
  const {Marketplace} = useSelector((state: any) => state.contract);
  const {history} = useSelector((state: any) => state.dashboard);
  const marketplaceAddress = Marketplace.options.address;
  //modif le equal
  const hasHistory = history.length >= 1;
  const [showHistory, setShowHistory] = useState(false);
  const { handleClose } = useModal();

  let isWhishListed: boolean = item ? wishlist.includes(item.id) : false;
  
  const handleOnClick = () => {
    dispatch(buyNFT(item.id, item.price));
    handleClose();
  };

  const handleShowHistory = () => {
    setShowHistory(!showHistory)
  }

  const handleOnClickWithdraw = () => {
    dispatch(withdrawNFTonSale(item.id));
    handleClose();
  };

  const handleAddWish = () => {
    dispatch(toggleToWishlist(item.id))
  }

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
        {isWhishListed 
        ? <div className="card-favorite"><IconButton aria-label="toggleWishlist" color='secondary' onClick={handleAddWish}><FavoriteIcon/></IconButton></div>
        : null
        }
        <div className="card-desc">
          <p> Owner : <span className="info">{item?.owner === accounts[0]
          ? "You"
          : item?.owner === marketplaceAddress
          ? "Tatakai"
          : item?.owner}</span></p>
          <p>Type : <span className="info">{item?.metadata?.type}</span></p>
          <p>Age : <span className="info">{item?.metadata?.age}</span></p>
          <p>Nationality : <span className="info">{item?.metadata?.nationality}</span></p>
          <p>Price : <span className="info">{item?.price}</span> </p>
          {hasHistory 
          ?<button
            onClick={handleShowHistory}
            type="button"
            color="primary"
          >
           View History
          </button>
          : "No history"
          }
        {showHistory 
        ? <History history={history} setShowHistory={setShowHistory}/>
        : null
        }
        </div>

        <div className="card-actions">
        {!isWhishListed
        ?<button
            onClick={handleAddWish}
            type="button"
            color="primary"
            className="card-action"
          >
            Add to Wishlist
          </button>
        : null
        }
         
        
          <button
            onClick={handleClose}
            type="button"
            color="primary"
            className="card-action"
          >
            Cancel
          </button>
          {(item?.owner === accounts[0])
          ?<button
          onClick={handleOnClickWithdraw}
          type="button"
          color="primary"
          className="card-action card-action-confirm"
        >
          Widraw
        </button>
          :<button
            onClick={handleOnClick}
            type="button"
            color="primary"
            className="card-action card-action-confirm"
          >
            Buy
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
