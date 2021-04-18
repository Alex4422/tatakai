import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Modal from "./Modal";
import Card from "./Card";
import Button from "@material-ui/core/Button";
import "./gallery.css";

interface Props {
  items: Array<ICard> | [];
}

const useStyles = () => {
  const classes = {
    input: {
      padding: 5,
    },
    form: {
      marginTop: 10,
    },
    item: {
      height: 300,
      background: "#ccc",
      borderRadius: 8,
    },
    gridList: {
      width: "70%",
      height: "100vh",
    },
  };
  return classes;
};

const Gallery = ({ items }: Props) => {
  const classes = useStyles();
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
        : "Pas de cartes à vendre en ce moment !"
      }
      </div>
    </>
  );
};
export default Gallery;
