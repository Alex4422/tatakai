import { useModal } from "../hooks/useModal";
interface Props {
  item: ICard;
}

const Card = ({ item }: Props) => {
  const { handleOpen } = useModal();
  return (
    <div
      className="itemCard"
      onClick={handleOpen}
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        margin: "1rem",
      }}
    ></div>
  );
};

export default Card;
