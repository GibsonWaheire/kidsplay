import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { NotificationProvider } from './context/NotificationContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './components/ui/ProductDetails'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import Login from './pages/Login'

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<div className="max-w-7xl mx-auto px-6 py-8"><h1 className="text-3xl font-bold">Profile</h1></div>} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </NotificationProvider>
  )
}

export default App
