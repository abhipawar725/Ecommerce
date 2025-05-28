import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { RiEdit2Line, RiDeleteBinLine } from "@remixicon/react";
import moment from "moment";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [userId, setUserId] = useState("")

  const getProduct = () => {
    axios
      .get("http://localhost:2804/api/products")
      .then((res) => {
        setProducts(res.data);
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
    setProducts(updatedProducts)
    axios.delete(`http://localhost:2804/api/products/${id}`)
      .then((res) => {
        alert("Product deleted successfully")
      })
      .catch((err) => {
        console.log(err?.response?.data?.message)
        getProduct()
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formdata = new FormData(form)
    const title = formdata.get('product_name')
    const price = formdata.get('product_price')
    const id = formdata.get('user_id')
    const data = { title, price }
    if(id){
      axios.put(`http://localhost:2804/api/products/${id}`, data)
      .then((res) => {
        alert("Product updated successfully")
        setTitle("")
        setPrice("")
        setUserId("")
        getProduct()
      })
      .catch((err) => {
        alert("Error: " + (err?.response?.data?.message));
      })
    } else{
          axios.post("http://localhost:2804/api/products", data)
      .then((res) => {
        alert("Product added successfully!");
        setTitle("")
        setPrice("")
        getProduct()
      })
      .catch((err) => {
        alert("Error: " + (err?.response?.data?.message || "Something went wrong"));
      });
    } 
  }

  const editProduct = (id, item) => {
     setTitle(item.title)
     setPrice(item.price)
     setUserId(id)
  }

  return (
    <>
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-4 p-6 h-full bg-slate-200">
          <form onSubmit={handleSubmit} className='w-full p-4 bg-white border border-slate-200 mx-auto rounded shadow-xl'>
            <div className="grid gap-6">
              <h2 className='text-xl font-medium'>Create Product</h2>
              <input type="hidden" name='user_id' value={userId} onChange={(e) => setUserId(e.target.value)} />
              <div className='flex flex-col gap-2'>
                <label htmlFor="product_name">Product Name</label>
                <input type="text" name='product_name' className='h-12 w-full rounded border border-slate-300 px-4 outline-0' value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="product_price">Product Price</label>
                <input type="number" name='product_price' className='h-12 w-full rounded border border-slate-300 px-4 outline-0' value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className='flex flex-col gap-2'>
                <button type='submit' className='h-12 w-full rounded bg-slate-900 text-white px-4 outline-0'>Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-8 p-6">
          <div className="w-full mt-4">
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
                          <div className="cursor-pointer w-10 h-10 flex text-white rounded-full items-center justify-center bg-yellow-500" onClick={() => editProduct(item._id, item)}>
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
        </div>
      </div>
    </>
  );
};

export default Products;
