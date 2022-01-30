import React from "react";
import {
  CarouselProvider,
  Slide,
  Slider,
  ImageWithZoom,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./SlickCard.css";

const SlickCard = ({ images }) => {
  console.log(images);
  return (
    <CarouselProvider
      naturalSlideWidth={250}
      naturalSlideHeight={150}
      totalSlides={images && images.length}
      className="row"
    >
      <Slider>
        {images &&
          images.map((img, index) => (
            <Slide index={index} key={index}>
              <div className="image-box">
                <ImageWithZoom className="image-box-img" src={img.path} />
              </div>
            </Slide>
          ))}
      </Slider>
      <div className="dots col s2 fullWidth">
        {images &&
          images.map((img, index) => (
            <Dot slide={index} key={index} className="slider-dot">
              <img src={img.path} alt="" />
            </Dot>
          ))}
      </div>
    </CarouselProvider>
  );
};

export default SlickCard;
