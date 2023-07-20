import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Admin from "../..";
import Input from "../../../../Components/Input";
import Button from "../../../../Components/Button";
import "./style.css";

const AddProduct = () => {
  const [value, setValue] = useState({
    idProduct: "",
    imgproduct: "",
    titleproduct: "",
    titleitem: "",
    titleprice: "",
  });

  const API_ENDPOINT = "https://649be5960480757192371734.mockapi.io/product";

  const handleChangeValue = (e: any) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = {
        idProduct: uuidv4(),
        imgProduct: value.imgproduct,
        titleProduct: value.titleproduct,
        titleItem: value.titleitem,
        titlePrice: value.titleprice,
      };

      console.log("data", data);

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // New product added successfully
        console.log("Product added successfully");
        console.log(value);

        // Reset the form fields
        setValue({
          idProduct: "",
          imgproduct: "",
          titleproduct: "",
          titleitem: "",
          titleprice: "",
        });
      } else {
        throw new Error("Add product request failed");
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <Admin>
      <div>
        <h1>Thêm sản phẩm</h1>
        <div className="form_add">
          <Input
            name="titleproduct"
            type="text"
            label="Loại sản phẩm"
            value={value.titleproduct}
            onChange={handleChangeValue}
          />
          <Input
            name="imgproduct"
            type="text"
            label="Hình ảnh (URL)"
            value={value.imgproduct}
            onChange={handleChangeValue}
          />
          <Input
            name="titleitem"
            type="text"
            label="Tên sản phẩm"
            value={value.titleitem}
            onChange={handleChangeValue}
          />
          <Input
            name="titleprice"
            type="text"
            label="Giá sản phẩm"
            value={value.titleprice}
            onChange={handleChangeValue}
          />
          <Button title="Submit" style="btn_submit" onClick={handleSubmit} />
        </div>
      </div>
    </Admin>
  );
};

export default AddProduct;
