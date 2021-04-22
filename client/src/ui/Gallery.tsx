import Modal from "./Modal";
import Card from "./Card";
import "./gallery.css";

interface Props {
  items: Array<ICard> | [];
}

const Gallery = ({ items }: Props) => {
  return (
    <>
      <Modal />
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
        : <h2>No Cards on the market yet !</h2>
      }
      </div>
    </>
  );
};
export default Gallery;
