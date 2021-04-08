import { useSelector } from "react-redux";
import { useModal } from "../hooks/useModal";
import Modal from "@material-ui/core/Modal";
import "./Card.css";

interface TemplateProps {
  item: ICard;
}
const Template = ({ item }: TemplateProps) => {
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
        <div className="card-title">{item?.name}</div>
        <div className="card-desc">{item?.nationality}</div>
        <div className="card-actions">
          <button type="button" color="primary" className="card-action-buy">
            Buy
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
