import axios from 'axios'
import React from 'react'


const CreateProduct = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formdata = new FormData(form)
    const title = formdata.get('product_name')
    const price = formdata.get('product_price')
    const data = {title, price}
    axios.post("http://localhost:2804/api/products", data)
      .then((res) => {
        alert("Product added successfully!");
      })
      .catch((err) => {
        alert("Error: " + (err?.response?.data?.message || "Something went wrong"));
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-lg p-4 bg-white border border-slate-200 mx-auto rounded shadow-xl'>
        <div className="grid gap-6">
          <h2 className='text-xl font-medium'>Create Product</h2>
          <input type="hidden" name='hidden_input' />
          <div className='flex flex-col gap-2'>
            <label htmlFor="product_name">Product Name</label>
            <input type="text" name='product_name' className='h-12 w-full rounded border border-slate-300 px-4 outline-0' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="product_price">Product Price</label>
            <input type="number" name='product_price' className='h-12 w-full rounded border border-slate-300 px-4 outline-0' />
          </div>
          <div className='flex flex-col gap-2'>
            <button type='submit' className='h-12 w-full rounded bg-slate-900 text-white px-4 outline-0'>Submit</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateProduct