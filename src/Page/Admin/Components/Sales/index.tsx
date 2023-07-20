import React, { useEffect, useState } from "react";
import Admin from "../..";

interface SaleEntry {
  product: any;
  createdAt: string;
  idBuy: string;
}

const Sales: React.FC = () => {
  const [monthlySales, setMonthlySales] = useState<{
    [monthYear: string]: { productCount: number; totalSales: number };
  }>({});

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(
          "https://647c676fc0bae2880ad0a7a8.mockapi.io/databuy"
        );
        if (response.ok) {
          const salesData: SaleEntry[] = await response.json();
          calculateTotalSales(salesData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const calculateTotalSales = (salesData: SaleEntry[]) => {
    const monthlySalesData: {
      [monthYear: string]: { productCount: number; totalSales: number };
    } = salesData.reduce((acc: any, entry) => {
      const createdAtDate = new Date(entry.createdAt);
      const monthYear = `${
        createdAtDate.getMonth() + 1
      }/${createdAtDate.getFullYear()}`;

      if (!acc[monthYear]) {
        acc[monthYear] = { productCount: 0, totalSales: 0 };
      }

      acc[monthYear].productCount += entry.product.length;

      acc[monthYear].totalSales += entry.product.reduce(
        (sum: number, product: any) => sum + parseInt(product.titlePrice),
        0
      );

      return acc;
    }, {});

    setMonthlySales(monthlySalesData);
  };

  return (
    <Admin>
      <div>
        <h2>Tổng doanh số theo tháng</h2>
        <table className="table" border={1} cellSpacing={0} cellPadding={20}>
          <thead>
            <tr>
              <th className="td">Tháng</th>
              <th className="td">Số lượng đơn hàng đã bán</th>
              <th className="td">Tổng doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(monthlySales).map(
              ([monthYear, { productCount, totalSales }]) => (
                <tr key={monthYear}>
                  <td className="td">{monthYear}</td>
                  <td className="td">{productCount}</td>
                  <td className="td">
                    {totalSales ? totalSales.toLocaleString() : "N/A"} VND
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
};

export default Sales;
