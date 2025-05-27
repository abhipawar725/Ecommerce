import React from 'react'


const CreateProduct = () => {

  const handleSubmit = (e) => {
   e.preventDefault()
  }

  return (
    <>
    <form onSubmit={handleSubmit} className='max-w-lg p-4 bg-white border border-slate-200 mx-auto rounded shadow-xl'>
    <div className="grid gap-6">
      <h2 className='text-xl font-medium'>Create Product</h2>
      <div className='flex flex-col gap-2'>
        <label htmlFor="product_name">Product Name</label>
        <input type="text" name='product_name' className='h-12 w-full rounded border border-slate-300 px-4 outline-0'/>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="product_price">Product Price</label>
        <input type="number" name='product_price' className='h-12 w-full rounded border border-slate-300 px-4 outline-0'/>
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