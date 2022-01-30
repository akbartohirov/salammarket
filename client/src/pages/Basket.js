import React from "react";
import "./Basket.css";
import BasketOrderItem from "../Components/BasketOrderItem";
import axios from "axios";

const Basket = () => {
  const [active, setActive] = React.useState("Доставка");
  const [typeUser, setTypeUser] = React.useState("individual");
  const [orders, setOrders] = React.useState(null);

  const initialState = {
    userId: localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).userId
      : "",
    products: JSON.parse(localStorage.getItem("salamBasket")),
    stir: "",
    entityName: "",
    phone: "",
    city: "",
    street: "",
    typeSending: active,
  };

  const [entityOrder, setEntityOrder] = React.useState(initialState);

  //quantity order function
  const quantityHandler = (e, data) => {
    const orderquantity = JSON.parse(localStorage.getItem("salamBasket"));
    let theOrder = orderquantity.map((item) => {
      if (item.productId === data._id) {
        item.quantity = +e.target.value;
      }

      return item;
    });

    localStorage.setItem("salamBasket", JSON.stringify(theOrder));

    if (e.target.value < 0 || e.target.value === 0) {
      e.target.value = 1;
    }
  };

  //delete order function
  const deleteHandler = (e, data) => {
    let basket = JSON.parse(localStorage.getItem("salamBasket"));
    if (basket) {
      const filter = basket.filter((item) => item.productId !== data._id);
      localStorage.setItem("salamBasket", JSON.stringify(filter));
    }

    document.location.reload();
  };

  //handling input value
  const onChange = (e) => {
    setEntityOrder({ ...entityOrder, [e.target.name]: e.target.value });
  };

  //radio buttons left side
  const radioHandler = (e) => {
    setActive(e.target.value);
    setEntityOrder({ ...entityOrder, typeSending: e.target.value });
  };

  //getting orders from localstorage and request
  React.useEffect(() => {
    const basket = JSON.parse(localStorage.getItem("salamBasket"));
    if (basket) {
      const ids = basket.map((item) => item.productId);

      axios
        .post(
          "/products/cart",
          { products: ids },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setOrders(res.data);
        });
    }
  }, []);

  //submit order
  const submitHandler = (e) => {
    if (!localStorage.getItem("userData")) {
      window.M.toast({
        html: "Пожалуста сначала авторизуйтесь",
        classes: "loginToastYellow",
      });
      return;
    } else {
      axios
        .post("/orders", entityOrder, {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("userData")).token,
          },
        })
        .then((res) => {
          setEntityOrder(initialState);
          window.M.toast({
            html: "Вы успешно отправили ваш заказ",
            classes: "loginToast",
          });
        })
        .catch((e) => {
          console.log(e.message);
          window.M.toast({
            html: "Что то прошло не так",
            classes: "loginToast",
          });
        });
    }
  };

  return (
    <div className="container">
      <h1>Корзина</h1>
      <div className="basket row ">
        <div className="products col s12 l8">
          <div className="row">
            <div className="col s12 m6 l6">
              <label
                className={`choose__option ${
                  active === "Доставка" ? "active" : ""
                }`}
              >
                <input
                  className="with-gap"
                  checked={active === "Доставка" ? true : false}
                  name="group1"
                  type="radio"
                  value={"Доставка"}
                  onChange={(e) => radioHandler(e)}
                />
                <span>Доставка</span>
              </label>
            </div>
            <div className="col s12 m6 l6">
              <label
                className={`choose__option ${
                  active === "Самовывоз" ? "active" : ""
                }`}
              >
                <input
                  className="with-gap"
                  name="group1"
                  type="radio"
                  value={"Самовывоз"}
                  onChange={(e) => radioHandler(e)}
                />
                <span>Самовывоз</span>
              </label>
            </div>
          </div>

          <div className="basket-orders">
            {orders ? (
              orders.map((order, index) => (
                <BasketOrderItem
                  data={order}
                  key={index}
                  deleteHandler={deleteHandler}
                  quantityHandler={quantityHandler}
                />
              ))
            ) : (
              <h4> Корзина пока пуста </h4>
            )}
          </div>
        </div>

        <div className="product-order col s12  l4">
          <div className="form row">
            <div className="form-price">
              <span className="form-price-title">
                Товары <sup>1</sup>{" "}
              </span>
              <span className="form-price-number">1</span>
            </div>
            <div className="form-summ">
              <span className="form-summ-title">Итого</span>
              <span className="form-summ-number">1</span>
            </div>
            <div className="form-action">
              <button
                className="btn form-btn"
                onClick={(e) => submitHandler(e)}
              >
                Оформить заказ
              </button>
            </div>
          </div>

          <form className="form row">
            <div className="col s12">
              <div className="row">
                <p>
                  <label>
                    <input
                      className="with-gap"
                      name="group1"
                      type="radio"
                      value={"individual"}
                      onChange={(e) => setTypeUser(e.target.value)}
                      checked={typeUser === "individual" ? true : false}
                    />
                    <span>Я физическое лицо</span>
                  </label>
                </p>

                <p>
                  <label>
                    <input
                      className="with-gap"
                      name="group1"
                      type="radio"
                      value={"entity"}
                      onChange={(e) => setTypeUser(e.target.value)}
                    />
                    <span>Я юридическое лицо</span>
                  </label>
                </p>
              </div>
              {/* Я юридическое лицо */}
              {typeUser === "entity" && (
                <>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="stir"
                        name="stir"
                        type="text"
                        className="validate"
                        onChange={(e) => onChange(e)}
                        value={entityOrder.stir}
                      />
                      <label htmlFor="stir">ИНН организации</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="entityName"
                        name="entityName"
                        type="text"
                        className="validate"
                        onChange={(e) => onChange(e)}
                        value={entityOrder.entityName}
                      />
                      <label htmlFor="entityName">Название организации</label>
                    </div>
                  </div>
                </>
              )}
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className="validate"
                    onChange={(e) => onChange(e)}
                    value={entityOrder.phone}
                  />
                  <label htmlFor="phone">Телефон номер</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <select
                    defaultValue={"DEFAULT"}
                    className="browser-default"
                    onChange={(e) => onChange(e)}
                    name="city"
                  >
                    <option value="DEFAULT" disabled>
                      Город
                    </option>
                    <option value="Самаркандская область">
                      Самаркандская область
                    </option>
                    <option value="Ферганская область">
                      Ферганская область
                    </option>
                    <option value="Кашкадарьинская область">
                      Кашкадарьинская область
                    </option>
                    <option value="Андижанская область">
                      Андижанская область
                    </option>
                    <option value="Ташкентская область">
                      Ташкентская область
                    </option>
                    <option value="Наманганская область">
                      Наманганская область
                    </option>
                    <option value="Сурхандарьинская область">
                      Сурхандарьинская область
                    </option>
                    <option value="г.Ташкент">г.Ташкент</option>
                    <option value="Бухарская область">Бухарская область</option>
                    <option value="Хорезмская область">
                      Хорезмская область
                    </option>
                    <option value="Республика Каракалпакстан	">
                      Республика Каракалпакстан{" "}
                    </option>
                    <option value="Джизакская область">
                      Джизакская область
                    </option>
                    <option value="Навоийская область">
                      Навоийская область
                    </option>
                    <option value="Сырдарьинская область">
                      Сырдарьинская область
                    </option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="street"
                    type="text"
                    name="street"
                    className="validate"
                    onChange={(e) => onChange(e)}
                    value={entityOrder.street}
                  />
                  <label htmlFor="street">Улица</label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Basket;
