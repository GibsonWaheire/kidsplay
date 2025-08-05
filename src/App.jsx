import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ExploreCategories from './components/sections/ExploreCategories'


function App() {

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<div>Categories Page</div>} />
              <Route path="/products" element={<div>Products Page</div>} />
              <Route path="/blog" element={<div>Blog Page</div>} />
              <Route path="/about" element={<div>About Page</div>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
