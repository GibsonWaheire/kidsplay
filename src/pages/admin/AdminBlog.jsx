import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../../lib/supabase';
import Toast from '../../components/ui/Toast';

const AdminBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await database.getBlogPosts();
      if (error) throw error;
      setBlogPosts(data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const { error } = await database.deleteBlogPost(postId);
      if (error) throw error;
      
      setBlogPosts(blogPosts.filter(p => p.id !== postId));
      setToast({
        message: 'Blog post deleted successfully!',
        type: 'success'
      });
    } catch (err) {
      console.error('Error deleting blog post:', err);
      setToast({
        message: 'Error deleting blog post: ' + err.message,
        type: 'error'
      });
    }
  };

  const handleTogglePublished = async (postId, currentPublished) => {
    try {
      const { error } = await database.updateBlogPost(postId, {
        published: !currentPublished
      });
      if (error) throw error;
      
      setBlogPosts(blogPosts.map(p => 
        p.id === postId ? { ...p, published: !currentPublished } : p
      ));
      
      setToast({
        message: `Blog post ${!currentPublished ? 'published' : 'unpublished'} successfully!`,
        type: 'success'
      });
    } catch (err) {
      console.error('Error updating blog post:', err);
      setToast({
        message: 'Error updating blog post: ' + err.message,
        type: 'error'
      });
    }
  };

  const handleToggleFeatured = async (postId, currentFeatured) => {
    try {
      const { error } = await database.updateBlogPost(postId, {
        featured: !currentFeatured
      });
      if (error) throw error;
      
      setBlogPosts(blogPosts.map(p => 
        p.id === postId ? { ...p, featured: !currentFeatured } : p
      ));
      
      setToast({
        message: `Blog post ${!currentFeatured ? 'featured' : 'unfeatured'} successfully!`,
        type: 'success'
      });
    } catch (err) {
      console.error('Error updating blog post:', err);
      setToast({
        message: 'Error updating blog post: ' + err.message,
        type: 'error'
      });
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || 
                         (statusFilter === 'published' && post.published) ||
                         (statusFilter === 'draft' && !post.published);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600 mt-2">Manage your blog posts and articles</p>
          </div>
          <Link
            to="/admin/blog/new"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create New Post
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Posts
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or excerpt..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Blog Posts ({filteredPosts.length})
            </h2>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first blog post.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={post.image || 'https://via.placeholder.com/48'}
                              alt={post.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {post.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {post.excerpt?.substring(0, 60)}...
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(post.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {post.user_profiles?.first_name && post.user_profiles?.last_name
                            ? `${post.user_profiles.first_name} ${post.user_profiles.last_name}`
                            : 'Unknown Author'
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {post.published ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Draft
                            </span>
                          )}
                          {post.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {post.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/admin/blog/edit/${post.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleTogglePublished(post.id, post.published)}
                            className={`${
                              post.published 
                                ? 'text-yellow-600 hover:text-yellow-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {post.published ? 'Unpublish' : 'Publish'}
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(post.id, post.featured)}
                            className={`${
                              post.featured 
                                ? 'text-purple-600 hover:text-purple-900' 
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {post.featured ? 'Unfeature' : 'Feature'}
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminBlog; 