import React from "react";
import axios from "axios";
import "./CatalogItem.css";
import { Link } from "react-router-dom";

const CatalogItem = ({ item }) => {
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`/products?new=true&category=${item}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setImage(data[0].img[0].path);
      });
  }, [item]);

  return (
    <Link to={`/category?q=${item}`} style={{ color: "#000" }}>
      <div className="catalog__item">
        <div
          className="catalog__item-image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="catalog__item-content">
          <h5 className="catalog__item-content-title">{item}</h5>
        </div>
      </div>
    </Link>
  );
};

export default CatalogItem;
