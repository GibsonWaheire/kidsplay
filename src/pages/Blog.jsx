import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Educational Gaming: Trends to Watch in 2024",
      excerpt: "Discover the latest trends in educational gaming and how they're shaping the future of learning for children worldwide.",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Education",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      featured: true
    },
    {
      id: 2,
      title: "How to Choose the Right Educational Games for Your Child",
      excerpt: "A comprehensive guide for parents on selecting age-appropriate and educational games that support your child's development.",
      author: "Michael Rodriguez",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Parenting",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
    },
    {
      id: 3,
      title: "The Science Behind Learning Through Play",
      excerpt: "Explore the research and science that proves why play-based learning is so effective for children's cognitive development.",
      author: "Dr. Emily Thompson",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Research",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400"
    },
    {
      id: 4,
      title: "Digital Safety: Protecting Your Child Online",
      excerpt: "Essential tips and strategies for ensuring your child's safety while they explore educational content online.",
      author: "Alex Johnson",
      date: "2024-01-08",
      readTime: "6 min read",
      category: "Safety",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400"
    },
    {
      id: 5,
      title: "Success Stories: How KidzPlay Connect Changed Learning",
      excerpt: "Real stories from parents and educators about the positive impact of educational gaming on children's learning outcomes.",
      author: "Community Team",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Success Stories",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400"
    },
    {
      id: 6,
      title: "Building Digital Literacy Skills in the Modern Age",
      excerpt: "Why digital literacy is crucial for children and how educational games can help develop these essential skills.",
      author: "Sarah Chen",
      date: "2024-01-03",
      readTime: "6 min read",
      category: "Digital Literacy",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400"
    }
  ];

  const categories = ["All", "Education", "Parenting", "Research", "Safety", "Success Stories", "Digital Literacy"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">KidzPlay Connect Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Insights, tips, and stories about educational gaming, child development, and digital learning
        </p>
      </div>

      {/* Featured Post */}
      {blogPosts.filter(post => post.featured).map(post => (
        <div key={post.id} className="mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="lg:order-2">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="p-8 lg:order-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                      alt={post.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{post.author}</div>
                      <div className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Categories Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.filter(post => !post.featured).map((post) => (
          <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-gray-500 text-xs">{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                    alt={post.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-900">{post.author}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-blue-100 mb-6 max-w-md mx-auto">
          Get the latest insights on educational gaming and child development delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500"
          />
          <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog; 