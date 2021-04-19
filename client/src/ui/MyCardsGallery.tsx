import MycardsModal from "./MycardsModal";
import Card from "./Card";
import "./gallery.css";

interface Props {
  items: Array<ICard> | [];
}

const Gallery = ({ items }: Props) => {
  return (
    <>
      <MycardsModal />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "space-around",
          color: '#fff'
        }}
      >
        {items.length >= 1 
        ? items?.map((item: ICard, index: number) => (
          <Card item={item} key={index} />
        ))
        : <h2>Unfortunatly, you haven't got any cards in your deck !</h2>
      }
      </div>
    </>
  );
};
export default Gallery;
