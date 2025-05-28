import React from 'react'
import { Link } from 'react-router-dom' 

const Sidebar = () => {
  return (
    <ul className='flex flex-col gap-4'>
        <li><Link to="/">Products</Link></li>
    </ul>
  )
}

export default Sidebar