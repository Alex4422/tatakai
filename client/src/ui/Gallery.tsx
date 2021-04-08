import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import "./gallery.css"
interface Props {
  items: Array<any> | null;
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "space-around",
      }}
    >
        {items?.map((item, index) => (
            <div className="itemCard" style={{
              
              backgroundImage: `url(${item.image})`, 
              backgroundSize: "cover", 
              margin: "1rem", 
              }}>
            </div>
        ))}
      
    </div>
  );
};
export default Gallery;
