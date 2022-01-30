import React from "react";
import { Link } from "react-router-dom";

const CatalogItem = ({ data }) => {
  return (
    <div className="catalog__item">
      <div className="catalog__item-image">
        <img
          alt="product img"
          src="//res.cloudinary.com/lmru-test/image/upload/d_placeholder.jpg,f_auto,q_90,w_80,h_80,dpr_1.25/elbrus/images/catalog-popup-images/version5/novogodnie-tovary.png"
        />
      </div>
      <div className="catalog__item-content">
        <Link to={`/category?q=${data}`} style={{ color: "#000" }}>
          <h5 className="catalog__item-content-title">{data}</h5>
        </Link>
        <p className="catalog__item-content-text">
          lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
          ipsumlorem ipsum
        </p>
      </div>
    </div>
  );
};

export default CatalogItem;
