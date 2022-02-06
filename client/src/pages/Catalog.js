import React, { useEffect, useState } from "react";
import CatalogItem from "../Components/CatalogItem";
import "./Catalog.css";
import Loading from "../Components/Loading/Loading";

//Канцтовары , хозтовары , мебель , парфюмерия , бытовые техники , компьютеры, телефоны , мода, автоаксессуары , спорттовары

const Catalog = () => {
  const [catalog, setCatalog] = useState(null);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        const dataCategory = data.map((datum) => datum.category);

        const filteredCat = new Set(Array.from(dataCategory));

        setCatalog([...filteredCat]);
      });
  }, []);

  return (
    <div className="container mb-3">
      <h1>Каталог</h1>
      <div className="catalog">
        {catalog === null ? (
          <Loading />
        ) : (
          catalog.map((item, index) => <CatalogItem key={index} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Catalog;
