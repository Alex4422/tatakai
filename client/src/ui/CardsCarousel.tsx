import Carousel from "react-elastic-carousel";

const styles = {
  item: {
    height: 300,
    width: "75%",
    background: "#ccc",
    borderRadius: 8,
  },
};

const CardsCarousel = ({ items }: any) => {
  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      <Carousel
        isRTL={false}
        itemsToScroll={1}
        itemsToShow={3}
        className="carousel"
      >
        {items.map((item: any) => (
          <div style={styles.item} key={item.id}>
            {item.title}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default CardsCarousel;
