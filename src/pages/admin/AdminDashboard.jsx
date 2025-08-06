import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch all stats in parallel
        const [
          productsResult,
          blogPostsResult,
          usersResult,
          ordersResult,
          tutorsResult,
          testimonialsResult
        ] = await Promise.all([
          database.getProducts(),
          database.getBlogPosts(),
          database.getAllUsers(),
          database.getOrdersByUserId ? database.getOrdersByUserId() : { data: [] },
          database.getTutors(),
          database.getTestimonials()
        ]);

        const statsData = {
          totalProducts: productsResult.data?.length || 0,
          totalBlogPosts: blogPostsResult.data?.length || 0,
          totalUsers: usersResult.data?.length || 0,
          totalOrders: ordersResult.data?.length || 0,
          totalTutors: tutorsResult.data?.length || 0,
          totalTestimonials: testimonialsResult.data?.length || 0,
          featuredProducts: productsResult.data?.filter(p => p.featured)?.length || 0,
          publishedPosts: blogPostsResult.data?.filter(p => p.published)?.length || 0
        };

        setStats(statsData);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error loading dashboard</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: '📦',
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogPosts,
      icon: '📝',
      color: 'bg-green-500',
      link: '/admin/blog'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'bg-purple-500',
      link: '/admin/users'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: '🛒',
      color: 'bg-orange-500',
      link: '/admin/orders'
    },
    {
      title: 'Tutors',
      value: stats.totalTutors,
      icon: '👨‍🏫',
      color: 'bg-indigo-500',
      link: '/admin/tutors'
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      icon: '💬',
      color: 'bg-pink-500',
      link: '/admin/testimonials'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Create a new product listing',
      icon: '➕',
      link: '/admin/products/new',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Create Blog Post',
      description: 'Write a new blog article',
      icon: '✍️',
      link: '/admin/blog/new',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: '👥',
      link: '/admin/users',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'View Orders',
      description: 'Check recent orders and status',
      icon: '📊',
      link: '/admin/orders',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.first_name || user?.email}! Here's what's happening with your platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-full p-3`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`${action.color} text-white rounded-lg p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                  <span className="text-2xl">{action.icon}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-700">
                  {stats.featuredProducts} featured products active
                </span>
              </div>
              <span className="text-sm text-gray-500">Now</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-700">
                  {stats.publishedPosts} blog posts published
                </span>
              </div>
              <span className="text-sm text-gray-500">Now</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-700">
                  {stats.totalUsers} registered users
                </span>
              </div>
              <span className="text-sm text-gray-500">Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 