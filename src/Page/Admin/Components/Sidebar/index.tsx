import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Sidebar: React.FC = () => {
  return (
    <React.Fragment>
      <ul className="sidebar">
        <li>
          <Link className="sidebar_link fs-22 " to="/admin/product">
            Tất cả sản phẩm
          </Link>
        </li>
        <li>
          <Link className="sidebar_link fs-22 " to="/admin/add-product">
            Thêm sản phẩm
          </Link>
        </li>
        <li>
          <Link className="sidebar_link fs-22 " to="/admin/user">
            Tất cả người dùng
          </Link>
        </li>
        <li>
          <Link className="sidebar_link fs-22 " to="/admin/adduser">
            Thêm người dùng
          </Link>
        </li>

        <li>
          <Link className="sidebar_link fs-22 " to="/admin/user-bill">
            Xem hóa đơn
          </Link>
        </li>
        <li>
          <Link className="sidebar_link fs-22 " to="/admin/sales">
            Xem doanh số
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Sidebar;
