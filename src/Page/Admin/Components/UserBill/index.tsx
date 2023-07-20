import React, { useEffect, useState } from "react";
import { chunk } from "lodash";
import "./style.css";
import Admin from "../..";

interface Product {
  index: string;
  idProduct: string;
  imgProduct: string;
  titleProduct: string;
  titleItem: string;
  titlePrice: string;
  quantity: number;
}

interface ProductData {
  createdAt: string;
  idBuy: number;
  name: string;
  phoneNumber: string;
  address: string;
  product: Product[];
  key: string;
  id: number;
}

const UserBill: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;
  const [pages, setPages] = useState(1);

  const [data, setData] = useState<ProductData[]>([]);
  const getData = () => {
    fetch("https://647c676fc0bae2880ad0a7a8.mockapi.io/databuy", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((tasks: ProductData[]) => {
        setData(tasks);
        setPages(Math.ceil(tasks.length / ITEMS_PER_PAGE));
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getData();
  }, []);

  const paginatedData = chunk(data, ITEMS_PER_PAGE)[currentPage - 1] || [];

  const calculateTotalPrice = (billProducts: Product[]): number => {
    return billProducts.reduce(
      (total, product) => total + parseInt(product.titlePrice),
      0
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Admin>
      <h1>Danh sách sản phẩm</h1>

      <table className="table" border={1} cellSpacing={0} cellPadding={20}>
        <tr>
          <td className="td">#</td>
          <td className="td">tên người đặt hàng</td>
          <td className="td">Địa chỉ</td>
          <td className="td">Sản phẩm</td>
          <td className="td">Tổng tiền</td>
          <td className="td">Ngày đặt hàng</td>
          <td className="td">Tình trạng đơn hàng</td>
        </tr>
        {paginatedData.map((item, i) => {
          const totalPrice = calculateTotalPrice(item.product);

          return (
            <tr key={item.idBuy}>
              <td className="td">{i + 1}</td>
              <td className="td">{item.name}</td>
              <td className="td">{item.address}</td>
              <td className="td ">
                {item.product.map((product) => (
                  <div className="td-product" key={product.idProduct}>
                    <span>tên SP: {product.titleItem}</span>
                    <span>
                      <img
                        className="image_product"
                        src={product.imgProduct}
                        alt={product.titleItem}
                      />
                    </span>
                    <span>số lượng: {product.quantity}</span>
                    <span>giá tiền: {product.titlePrice}</span>
                  </div>
                ))}
              </td>
              <td className="td">{totalPrice.toLocaleString()} VND</td>
              <td className="td"> {item.createdAt}</td>
              <td className="td">chưa giao</td>
            </tr>
          );
        })}
      </table>
      <div className="pagination">
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination_btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </Admin>
  );
};

export default UserBill;
