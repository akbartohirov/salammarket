import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "../pages/Register";
import Auth from "../pages/Auth";
import Basket from "../pages/Basket";
import Dashboard from "../pages/Dashboard";
import MainPage from "../pages/MainPage";
import Catalog from "../pages/Catalog";
import Product from "../pages/Product";
import CatalogProduct from "../pages/CatalogProduct";

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>

        <Route exact path="/basket">
          <Basket />
        </Route>

        <Route exact path="/dashboard">
          <Dashboard />
        </Route>

        <Route exact path="/catalog">
          <Catalog />
        </Route>

        <Route exact path="/category">
          <CatalogProduct />
        </Route>

        <Route path="/product/:id">
          <Product />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/login">
        <Auth />
      </Route>

      <Route exact path="/catalog">
        <Catalog />
      </Route>

      <Route exact path="/category">
        <CatalogProduct />
      </Route>

      <Route path="/product/:id">
        <Product />
      </Route>

      <Route exact path="/basket">
        <Basket />
      </Route>

      <Route exact path="/register">
        <Register />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default useRoutes;
