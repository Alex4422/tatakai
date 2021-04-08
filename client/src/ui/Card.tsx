interface Props {
  item: ICard;
}

const Card = ({ item }: Props) => (
  <div
    className="itemCard"
    style={{
      backgroundImage: `url(${item.image})`,
      backgroundSize: "cover",
      margin: "1rem",
    }}
  ></div>
);
export default Card;
