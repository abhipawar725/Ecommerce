import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { RiEdit2Line, RiDeleteBinLine } from "@remixicon/react";
import moment from "moment";

const Products = () => {
  const [products, SetProducts] = useState([]);

  const getProduct = () => {
    axios
      .get("http://localhost:2804/api/products")
      .then((res) => {
        SetProducts(res.data);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  }

  useEffect(() => {
   getProduct()
  }, []);

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product._id !== id)
    SetProducts(updatedProducts)
    axios.delete(`http://localhost:2804/api/products/${id}`)
    .then((res) => {
      alert("Product deleted successfully")
    })
    .catch((err) => {
      console.log(err?.response?.data?.message)
      getProduct()
    })
  }

  return (
    <>
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr>
              <td className="border border-slate-200 p-2">Product Name</td>
              <td className="border border-slate-200 p-2">Price</td>
              <td className="border border-slate-200 p-2">Created Date</td>
              <td className="border border-slate-200 p-2">Action</td>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="border border-slate-200 p-2">{item.title}</td>
                  <td className="border border-slate-200 p-2">{item.price}</td>
                  <td className="border border-slate-200 p-2">
                    {moment(item.createdAt).format('DD MMM, YYYY')}
                  </td>
                  <td className="border border-slate-200 p-2">
                    <div className="flex items-center gap-2">
                      <div className="cursor-pointer w-10 h-10 flex text-white rounded-full items-center justify-center bg-yellow-500">
                        <RiEdit2Line />
                      </div>
                      <div className="cursor-pointer w-10 h-10 flex text-white rounded-full items-center justify-center bg-red-500" onClick={() => deleteProduct(item._id)}>
                        <RiDeleteBinLine />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
