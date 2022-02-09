import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminProductsPage.css";
import Loading from "../../Components/Loading/Loading";

const AdminProductsPage = () => {
  //create product
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [color, setColor] = React.useState("");
  const [sellPrice, setSellPrice] = React.useState("");
  const [boughtPrice, setBoughtPrice] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [img, setImg] = React.useState([]);

  //display product
  const [products, setProducts] = React.useState([]);
  const [deletedProduct, setDeletedProduct] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setProducts(data);
      });
    setDeletedProduct("");
  }, [deletedProduct]);

  const deleteHandler = (e, id) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    if (window.confirm("Вы уверены?")) {
      axios
        .delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setDeletedProduct(data);
          window.M.toast({ html: "Продукт удалён", classes: "loginTost" });
        });
    }
  };

  const submitHanler = (e) => {
    e.preventDefault();

    const { token } = JSON.parse(localStorage.getItem("userData"));

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("sellPrice", sellPrice);
    formData.append("boughtPrice", boughtPrice);
    formData.append("amount", amount);
    img.length > 0 && img.map((el) => formData.append("img", el));

    axios
      .post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.M.toast({ html: "Продукт создан", classes: "loginToast" });

        setTitle("");
        setCategory("");
        setDescription("");
        setColor("");
        setSellPrice("");
        setBoughtPrice("");
        setAmount("");
        setImg([]);

        setDeletedProduct(res.data);
      })
      .catch((e) => {
        window.M.toast({ html: e.message, classes: "loginToastRed" });
      });
  };

  return (
    <div className="adminPage">
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Cоздать продукт</h4>
          <form
            className="col m6 offset-m3"
            style={{ padding: "0 2rem" }}
            onSubmit={(e) => submitHanler(e)}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title"
                  type="text"
                  required
                  className="validate"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="title">Название товара</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="category"
                  type="text"
                  required
                  className="validate"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor="category">Категория</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field colorcol s12">
                <textarea
                  id="description"
                  type="text"
                  required
                  className="validate materialize-textarea"
                  data-length="120"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="description">Описание</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="color"
                  type="text"
                  required
                  className="validate"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <label htmlFor="color">Цвет</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="sellPrice"
                  type="number"
                  required
                  className="validate"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                />
                <label htmlFor="sellPrice">Цена покупки</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="boughtPrice"
                  type="number"
                  required
                  className="validate"
                  value={boughtPrice}
                  onChange={(e) => setBoughtPrice(e.target.value)}
                />
                <label htmlFor="boughtPrice">Цена продажи</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="amount"
                  type="text"
                  required
                  className="validate"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label htmlFor="amount">Количество</label>
              </div>
            </div>

            <div className="row">
              <div className="file-field input-field col s12">
                <div className="btn">
                  <span>Изображения</span>
                  <input
                    type="file"
                    required
                    multiple
                    onChange={(e) => setImg([...e.target.files])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <button
                  className="btn waves-effect waves-green green btn-flat"
                  type="submit"
                >
                  Создать
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          {/* <button class="modal-close waves-effect waves-green green btn-flat">
            Создать продукт
          </button> */}
        </div>
      </div>
      <AdminSidebar />
      <div className="adminProductsPage">
        <div className="adminProductsPageHeader">
          <p className="adminProductPageTitle">Все продукты</p>
          <button
            data-target="modal1"
            className="btn modal-trigger right-align"
            onClick={(e) => {
              const elem = document.querySelectorAll(".modal");
              window.M.Modal.init(elem);
            }}
          >
            Создать продукт
          </button>
        </div>

        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Товар</th>
              <th>Название товара</th>
              <th>цена покупки</th>
              <th>цена продажи</th>
              <th>Количество</th>
              <th>Дата выхода товара</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 &&
              products.map((product, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>
                    <img
                      style={{ width: "70px" }}
                      src={`/${product.img[0]?.path}`}
                      alt={product.title}
                    />
                  </th>
                  <th>
                    <Link
                      className="black-text hover-effect"
                      to={`/product/${product._id}`}
                    >
                      {product.title}
                    </Link>
                  </th>
                  <th>{product.boughtPrice}</th>
                  <th>{product.sellPrice}</th>
                  <th>{product.amount}</th>
                  <th>{new Date(product.createdAt).toDateString()}</th>
                  <th>
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="btn yellow accent-4 waves-effect waves-light"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={(e) => deleteHandler(e, product._id)}
                      className="btn deep-orange darken-1 waves-effect waves-light"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {products.length === 0 && <Loading />}
      </div>
    </div>
  );
};

export default AdminProductsPage;
