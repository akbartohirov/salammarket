import React from "react";
import "./BasketOrderItem.css";

const BasketOrderItem = ({ data, deleteHandler, quantityHandler }) => {
  console.log(data.amount);
  return (
    <div className="basket-order mb-2">
      <div className="order-image-box ml-1">
        <img className="order-image" alt="product img" src={data.img[0].path} />
      </div>
      <div className="order-title">
        <p>{data.title}</p>
      </div>
      {/* <div style={{}} className="order-quantity row">
        <select class="browser-default">
          <option value="" disabled selected>
            шт.
          </option>
          {[...Array(data.amount).keys()].map((el) => (
            <option key={el + 1} value={el + 1}>
              {el + 1}
            </option>
          ))}
        </select>
      </div> */}
      <div className="order-price">
        <h4>{data.sellPrice}$</h4>
      </div>
      {deleteHandler && (
        <div
          onClick={deleteHandler && ((e) => deleteHandler(e, data))}
          className="order-delete"
        >
          <i className="fas fa-trash-alt delete"></i>
        </div>
      )}
    </div>
  );
};

export default BasketOrderItem;
