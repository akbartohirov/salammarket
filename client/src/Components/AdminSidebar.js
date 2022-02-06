import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="adminSidebar">
      <ul className="sidebarList">
        <li className="sidebarListItem">
          <i className="fas fa-user sidebarIcon"></i>
          <span className="sidebarListItemTitle">
            <Link to="/admin/users"> Users </Link>
          </span>
        </li>

        <li className="sidebarListItem">
          <i className="fas fa-shopping-cart sidebarIcon"></i>
          <span className="sidebarListItemTitle">
            <Link to="/admin/products">Products</Link>
          </span>
        </li>

        <li className="sidebarListItem">
          <i className="fas fa-clipboard-list sidebarIcon"></i>
          <span className="sidebarListItemTitle">
            <Link to="/admin/orders">Orders</Link>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
