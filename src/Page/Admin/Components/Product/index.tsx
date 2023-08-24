import React, { useEffect, useState } from "react";
import "./style.css";
import Admin from "../..";
import _chunk from "lodash/chunk";

interface ProductData {
  index: number;
  idProduct: string;
  imgProduct: string;
  titleProduct: string;
  titleItem: string;
  titlePrice: string;
}

const API_ENDPOINT = "https://64ba0cde79b7c9def6c18adb.mockapi.io/product";
const ITEMS_PER_PAGE = 5;

const Product: React.FC = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [editingIndex, setEditingIndex] = useState(-1);

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      if (response.ok) {
        const tasks = await response.json();
        setData(tasks);
        setPages(Math.ceil(tasks.length / ITEMS_PER_PAGE));
      } else {
        throw new Error("Fetch request failed");
      }
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [data]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (index: number, idProduct: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${index}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedData = data.filter((item) => item.idProduct !== idProduct);
        setData(updatedData);
        alert("Deleted successfully");
      } else {
        throw new Error("Delete request failed");
      }
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = async (updatedItem: ProductData) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${updatedItem.index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const updatedData = [...data];
        updatedData[updatedItem.index] = updatedItem;
        setData(updatedData);
        setEditingIndex(-1);
        alert("Saved successfully");
      } else {
        throw new Error("Update request failed");
      }
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditingIndex(-1);
  };

  const paginatedData = _chunk(data, ITEMS_PER_PAGE)[currentPage - 1] || [];

  return (
    <Admin>
      <h1>Danh sách sản phẩm</h1>

      <table className="table" cellSpacing={20}>
        <thead>
          <tr>
            <th>#</th>
            <th>Loại sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Giá tiền</th>
            <th>Ảnh sản phẩm</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item: ProductData, i: number) =>
            editingIndex === item.index ? (
              <EditProduct
                key={item.idProduct}
                item={item}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <ProductRow
                key={item.idProduct}
                item={item}
                i={(currentPage - 1) * ITEMS_PER_PAGE + i}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )
          )}
        </tbody>
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

interface ProductRowProps {
  item: ProductData;
  i: number;
  onDelete: (index: number, idProduct: string) => void;
  onEdit: (index: number) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  item,
  i,
  onDelete,
  onEdit,
}) => {
  const { index, titleProduct, titleItem, titlePrice, imgProduct, idProduct } =
    item;

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{titleProduct}</td>
      <td>{titleItem}</td>
      <td>{titlePrice}</td>
      <td>
        <img className="image_product" src={imgProduct} alt="" />
      </td>
      <td>
        <button onClick={() => onEdit(index)}>Sửa</button>
        <button onClick={() => onDelete(index, idProduct)}>Xóa sản phẩm</button>
      </td>
    </tr>
  );
};

interface EditProductProps {
  item: ProductData;
  onSave: (updatedItem: ProductData) => void;
  onCancel: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({
  item,
  onSave,
  onCancel,
}) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedItem);
  };

  return (
    <tr>
      <td>{item.index + 1}</td>
      <td>
        <input
          type="text"
          name="titleProduct"
          value={editedItem.titleProduct}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="titleItem"
          value={editedItem.titleItem}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="titlePrice"
          value={editedItem.titlePrice}
          onChange={handleInputChange}
        />
      </td>
      <td>
      <input
          type="text"
          name="imgProduct"
          value={editedItem.imgProduct}
          onChange={handleInputChange}
        />
        
      </td>
      <td>
        <button onClick={handleSave}>Lưu</button>
        <button onClick={onCancel}>Hủy</button>
      </td>
    </tr>
  );
};

export default Product;
