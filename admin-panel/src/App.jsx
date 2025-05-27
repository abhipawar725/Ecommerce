import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import CreateProduct from "./pages/CreateProduct"
import Products from './pages/Products'

const App = () => {
  return (
<>
    <Router>
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-3 p-6 h-full bg-slate-200">
            <Sidebar />
        </div>
        <div className="col-span-9 p-6">
              <Routes>
                <Route path='/' element={<Products />} />
                <Route path='/create' element={<CreateProduct />} />
              </Routes>
          </div>
      </div>
    </Router>
</>
  )
}

export default App