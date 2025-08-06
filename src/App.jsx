import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { NotificationProvider } from './context/NotificationContext'
import { AuthProvider } from './context/AuthContext.jsx'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Lazy load all page components for better performance
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Categories = lazy(() => import('./pages/Categories'))
const SpecialNeeds = lazy(() => import('./pages/SpecialNeeds'))
const Orders = lazy(() => import('./pages/Orders'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const Notifications = lazy(() => import('./pages/Notifications'))
const Profile = lazy(() => import('./pages/Profile'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin pages
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))
const ProductForm = lazy(() => import('./components/admin/ProductForm'))
const BlogPostForm = lazy(() => import('./components/admin/BlogPostForm'))

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/special-needs" element={<SpecialNeeds />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  
                  {/* Auth Routes - redirect to profile if already logged in */}
                  <Route path="/login" element={
                    <ProtectedRoute requireAuth={false}>
                      <Login />
                    </ProtectedRoute>
                  } />
                  
                  {/* Protected Routes - require authentication */}
                  <Route path="/notifications" element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  
                  {/* Admin Routes - require admin role */}
                  <Route path="/admin" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/products" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminProducts />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/products/new" element={
                    <ProtectedRoute requireAdmin={true}>
                      <ProductForm />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/products/edit/:id" element={
                    <ProtectedRoute requireAdmin={true}>
                      <ProductForm />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/blog" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminBlog />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/blog/new" element={
                    <ProtectedRoute requireAdmin={true}>
                      <BlogPostForm />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/blog/edit/:id" element={
                    <ProtectedRoute requireAdmin={true}>
                      <BlogPostForm />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/users" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminUsers />
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  )
}

export default App
