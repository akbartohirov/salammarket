import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AutoCarousel from "../Components/AutoCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./MainPage.css";
import Slick from "../Components/Slick";
import CatalogProductItem from "../Components/CatalogProductItem";
import SearchProductItem from "../Components/SearchProductItem";

const MainPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products?new=true", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  const [searchWord, setSearchWord] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setSearchWord(e.target.value);
  };

  const searchHandler = (e) => {
    if (searchWord.trim() !== "") {
      var elems = document.querySelectorAll(".modal");
      window.M.Modal.init(elems);

      axios
        .post(`/products/search?q=${searchWord.toLocaleLowerCase()}`)
        .then((res) => {
          setSearchedProducts(res.data);
        })
        .catch((e) => {
          setError("Товары по запросу не найдены");
          setSearchedProducts([]);
        });
    } else {
      window.M.toast({
        html: "Сначала заполните полью!",
        classes: "loginToastYellow",
      });
    }
  };

  return (
    <div className="container">
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Товары по запросу "{searchWord}"</h4>
          <hr />
          {searchedProducts.length > 0 ? (
            searchedProducts.map((item, index) => (
              <SearchProductItem key={index} data={item} />
            ))
          ) : (
            <h3>{error}</h3>
          )}
        </div>
        <div className="modal-footer">
          <span className="modal-close waves-effect waves-green btn-flat">
            Close
          </span>
        </div>
      </div>

      <div className="box-image mb-3">
        <Link to="/catalog">
          <div className="box-image__catalog mr-2 valign-wrapper">
            <i className="fas fa-list" style={{ marginRight: "5px" }}></i>
            <span>Каталог</span>
          </div>
        </Link>
        <div className="box-image__search valign-wrapper">
          <div className="input-field search">
            <input
              type="text"
              id="autocomplete-input"
              className="searchInput autocomplete"
              onChange={(e) => onChange(e)}
            />
            <button
              data-target={searchWord.trim() !== "" && "modal1"}
              className="search__button modal-trigger"
              onClick={(e) => searchHandler(e)}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <AutoCarousel />
      <Slick
        data={products && products}
        Card={CatalogProductItem}
        numSlide={4}
      />
      <AutoCarousel />
      <Slick
        data={products && products}
        Card={CatalogProductItem}
        numSlide={4}
      />
    </div>
  );
};

export default MainPage;
