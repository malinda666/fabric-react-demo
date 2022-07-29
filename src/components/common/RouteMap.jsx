import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from '../../App'
import MainLayout from '../layouts/MainLayout'

import { Home, Login, ProductList, ProductItem } from '../../pages'

const RouteMap = () => {
  return (
    <Router>
      {/*start routes*/}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<ProductList />} />
          <Route path='/product/:id' element={<ProductItem />} />
        </Route>
        <Route element={<App />}>
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
      {/*end routes*/}
    </Router>
  )
}

export default RouteMap
