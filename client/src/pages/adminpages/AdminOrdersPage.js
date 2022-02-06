import React from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminOrdersPage.css";

const AdminOrdersPage = () => {
  return (
    <div className="adminPage">
      <AdminSidebar />
      <div className="adminOrdersPage">AdminOrdersPage</div>
    </div>
  );
};

export default AdminOrdersPage;
