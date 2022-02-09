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
import AdminUsersPage from "../pages/adminpages/AdminUsersPage";
import AdminProductsPage from "../pages/adminpages/AdminProductsPage";
import AdminOrdersPage from "../pages/adminpages/AdminOrdersPage";
import AdminUserDetailsPage from "../pages/adminpages/admindetailspage/AdminUserDetailsPage";
import AdminProductDetailsPage from "../pages/adminpages/admindetailspage/AdminProductDetailsPage";
import AdminOrderDetailsPage from "../pages/adminpages/admindetailspage/AdminOrderDetailsPage";

const useRoutes = (isAuthenticated, user) => {
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

        {user && (
          <>
            <Route exact path="/admin/users">
              <AdminUsersPage />
            </Route>

            <Route exact path="/admin/products">
              <AdminProductsPage />
            </Route>

            <Route exact path="/admin/orders">
              <AdminOrdersPage />
            </Route>

            <Route exact path="/admin/users/:id">
              <AdminUserDetailsPage />
            </Route>

            <Route exact path="/admin/products/:id">
              <AdminProductDetailsPage />
            </Route>

            <Route exact path="/admin/orders/:id">
              <AdminOrderDetailsPage />
            </Route>
          </>
        )}
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
      {/* <Redirect to="/" /> */}
    </Switch>
  );
};

export default useRoutes;
