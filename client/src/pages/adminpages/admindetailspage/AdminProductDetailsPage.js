import React from "react";
// import AdminSidebar from "../../../Components/";
import AdminSidebar from "../../../Components/AdminSidebar";
import "./AdminProductDetailsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminProductDetailsPage = () => {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [color, setColor] = React.useState("");
  const [sellPrice, setSellPrice] = React.useState("");
  const [boughtPrice, setBoughtPrice] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [img, setImg] = React.useState([]);
  const [uploadedImages, setUploadedImages] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description);
        setColor(data.color);
        setSellPrice(data.sellPrice);
        setBoughtPrice(data.boughtPrice);
        setAmount(data.amount);
        setImg(data.img);
      });
  }, [id]);

  const submitHanler = (e) => {
    e.preventDefault();

    const { token } = JSON.parse(localStorage.getItem("userData"));

    const fd = new FormData();

    fd.append("title", title);
    fd.append("category", category);
    fd.append("description", description);
    fd.append("color", color);
    fd.append("sellPrice", sellPrice);
    fd.append("boughtPrice", boughtPrice);
    fd.append("amount", amount);
    uploadedImages.map((el) => fd.append("img", el));

    axios
      .put(
        `/products/${id}`,
        uploadedImages.length > 0
          ? fd
          : {
              title,
              color,
              category,
              sellPrice,
              boughtPrice,
              description,
              amount,
              img,
            },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.M.toast({ html: "Продукт изменён", classes: "loginToast" });
      })
      .catch((e) => {
        window.M.toast({
          html: "Продукт не изменён",
          classes: "loginToastRed",
        });
      });
  };

  return (
    <div className="adminPage">
      <AdminSidebar />
      <div className="adminUsersDetailsPage">
        <h4 className="center-align">Данные продукта</h4>
        <div className="row">
          <form className="col m6 offset-m3" onSubmit={(e) => submitHanler(e)}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title"
                  type="text"
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
                    multiple
                    onChange={(e) => setUploadedImages([...e.target.files])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <button className="btn" type="submit">
                  Сохранить
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetailsPage;
