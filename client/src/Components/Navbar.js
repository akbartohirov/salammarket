import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
// import dark from "../dark.svg";
import logo from "../Salammarketlogo.png";
import AuthContext from "../Context/AuthContext";

const Navbar = ({ isAuthenticated }) => {
  const sidebar = () => {
    var elems = document.querySelectorAll(".sidenav");
    window.M.Sidenav.init(elems);
  };

  const auth = useContext(AuthContext);

  const history = useHistory();

  const onLogOut = (e) => {
    auth.logout();
    history.push("/");
  };

  return (
    <React.Fragment>
      <nav className="grey lighten-4 sticky">
        <div className="nav-wrapper container">
          <a href="/" className="brand-logo" style={{ height: "100%" }}>
            <img
              alt="logo"
              className="logo"
              src={logo}
              style={{ height: "100%", padding: "5px" }}
            />
          </a>
          <a
            href="/"
            data-target="mobile-demo"
            className="sidenav-trigger indigo-text text-darken-5"
          >
            <i className="material-icons" onClick={sidebar}>
              menu
            </i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link
                className="indigo-text text-danken-5"
                to={isAuthenticated ? "/dashboard" : "/login"}
              >
                {"  "}
                <i className="fas fa-user mr-1"></i>&nbsp;
                {isAuthenticated ? `Профиль` : "Войти"}
              </Link>
            </li>
            <li>
              <Link className="indigo-text text-danken-5" to="/basket">
                {" "}
                <i className="fas fa-cart-arrow-down mr-1"></i>Корзина
              </Link>
            </li>

            {isAuthenticated && (
              <li>
                <a
                  href="/"
                  className="indigo-text text-danken-5"
                  onClick={(e) => onLogOut(e)}
                >
                  {"  "}
                  <i className="fas fa-arrow-right mr-1"></i> Выйти
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo" style={{ zIndex: 1000001 }}>
        <li>
          <Link className="indigo-text text-danken-5" to="/catalog">
            <i className="fas fa-list"></i>
            Каталог
          </Link>
        </li>

        <li>
          <Link
            className="indigo-text text-danken-5"
            to={isAuthenticated ? "/dashboard" : "/login"}
          >
            {"  "}
            <i className="fas fa-user mr-1"></i>{" "}
            {isAuthenticated ? "Профиль" : "Войти"}
          </Link>
        </li>
        <li>
          <Link className="indigo-text text-danken-5" to="/basket">
            {"  "}
            <i className="fas fa-cart-arrow-down mr-1"></i>Корзина
          </Link>
        </li>

        {isAuthenticated && (
          <li style={{ cursor: "pointer" }} onClick={(e) => onLogOut(e)}>
            <a hr className="indigo-text text-danken-5" ef="/">
              {"  "}
              <i className="fas fa-arrow-right mr-1"></i>Выйти
            </a>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
};

export default Navbar;
