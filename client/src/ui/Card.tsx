import { useDispatch } from "react-redux";
import { selectCurrent } from "../lib/actions/marketplace";
import { useModal } from "../hooks/useModal";
interface Props {
  item: ICard;
}

const Card = ({ item }: Props) => {
  const { handleOpen } = useModal();
  const dispatch = useDispatch();
  const handleOnClick = () => {
    handleOpen();
    dispatch(selectCurrent(item));
  };
  return (
    <div
      className="itemCard"
      onClick={handleOnClick}
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        margin: "1rem",
      }}
    ></div>
  );
};

export default Card;
