import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { database } from '../lib/supabase';
import PageContainer from '../components/layout/PageContainer';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    blogPosts: 0,
    users: 0,
    orders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch counts for dashboard stats
        const [productsRes, blogPostsRes, usersRes, ordersRes] = await Promise.all([
          database.getProducts(),
          database.getBlogPosts(),
          database.getAllUsers(),
          database.getOrdersByUserId('all') // This will need to be adjusted
        ]);

        setStats({
          products: productsRes.data?.length || 0,
          blogPosts: blogPostsRes.data?.length || 0,
          users: usersRes.data?.length || 0,
          orders: ordersRes.data?.length || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        addNotification('Failed to load dashboard stats', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [addNotification]);

  const adminSections = [
    {
      title: 'Products',
      description: 'Manage products, categories, and inventory',
      icon: '📦',
      link: '/admin/products',
      color: 'bg-blue-500'
    },
    {
      title: 'Blog Posts',
      description: 'Create and manage blog content',
      icon: '📝',
      link: '/admin/blog',
      color: 'bg-green-500'
    },
    {
      title: 'Users',
      description: 'Manage user accounts and roles',
      icon: '👥',
      link: '/admin/users',
      color: 'bg-purple-500'
    },
    {
      title: 'Categories',
      description: 'Manage product categories',
      icon: '🏷️',
      link: '/admin/categories',
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return (
      <PageContainer className="py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.firstName}! Manage your platform from here.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Admin
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.products}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blog Posts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.blogPosts}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <span className="text-2xl">🛒</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {adminSections.map((section) => (
          <Link
            key={section.title}
            to={section.link}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 group"
          >
            <div className="flex items-start space-x-4">
              <div className={`${section.color} p-3 rounded-full text-white text-2xl`}>
                {section.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-600 mt-2">{section.description}</p>
              </div>
              <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/admin/products/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Product
          </button>
          <button
            onClick={() => navigate('/admin/blog/new')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Blog Post
          </button>
          <button
            onClick={() => navigate('/admin/categories/new')}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Add Category
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminDashboard; 