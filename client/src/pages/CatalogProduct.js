import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./CatalogProduct.css";
import CatalofProductItem from "../Components/CatalogProductItem";
import Loading from "../Components/Loading/Loading";

const CatalogProduct = () => {
  const [products, setProducts] = React.useState(null);

  const location = useLocation();

  const useQuery = () => new URLSearchParams(location.search);

  let query = useQuery();

  React.useEffect(() => {
    axios.get("/products").then((res) => {
      let category = query.get("q");

      const filtered = res.data.filter((item) => item.category === category);

      setProducts(filtered);
    });
  }, [query]);

  return (
    <div className="container">
      <h1 className="product-content-title">{query.get("q")}</h1>
      <div className="row mb-3">
        {products === null ? (
          <Loading />
        ) : (
          products.map((item, index) => (
            <CatalofProductItem key={index} data={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default CatalogProduct;
