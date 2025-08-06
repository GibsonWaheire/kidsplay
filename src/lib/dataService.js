import { supabase } from './supabase';
import { getSampleData } from '../data/sampleData';

// Data service for all Supabase operations
export const dataService = {
  // Products - Updated to match new structure
  async getProducts() {
    try {
      // TEMPORARY: Always use sample data for testing
      console.log('Using sample products data (forced for testing)');
      return getSampleData('products');
      
      // Commented out database fetch for testing
      // const { data, error } = await supabase
      //   .from('products')
      //   .select('*')
      //   .order('created_at', { ascending: false });
      // 
      // if (error) throw error;
      // 
      // // Return sample data if database is empty
      // if (!data || data.length === 0) {
      //   console.log('Using sample products data');
      //   return getSampleData('products');
      // }
      // 
      // return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      console.log('Falling back to sample products data');
      return getSampleData('products');
    }
  },

  async getProductById(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  async getFeaturedProducts() {
    try {
      // TEMPORARY: Always use sample data for testing
      console.log('Using sample featured products data (forced for testing)');
      return getSampleData('products').filter(p => p.featured);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      console.log('Falling back to sample featured products data');
      return getSampleData('products').filter(p => p.featured);
    }
  },

  // Categories - Updated to match new structure
  async getCategories() {
    try {
      // TEMPORARY: Always use sample data for testing
      console.log('Using sample categories data (forced for testing)');
      return getSampleData('categories');
    } catch (error) {
      console.error('Error fetching categories:', error);
      console.log('Falling back to sample categories data');
      return getSampleData('categories');
    }
  },

  // Stats - New table
  async getStats() {
    try {
      // TEMPORARY: Always use sample data for testing
      console.log('Using sample stats data (forced for testing)');
      return getSampleData('stats');
    } catch (error) {
      console.error('Error fetching stats:', error);
      console.log('Falling back to sample stats data');
      return getSampleData('stats');
    }
  },

  // Tutors - Updated to match new structure
  async getTutors() {
    try {
      const { data, error } = await supabase
        .from('tutors')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      
      // Return sample data if database is empty
      if (!data || data.length === 0) {
        console.log('Using sample tutors data');
        return getSampleData('tutors');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching tutors:', error);
      console.log('Falling back to sample tutors data');
      return getSampleData('tutors');
    }
  },

  // Testimonials - Updated to match new structure
  async getTestimonials() {
    try {
      // TEMPORARY: Always use sample data for testing
      console.log('Using sample testimonials data (forced for testing)');
      return getSampleData('testimonials');
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      console.log('Falling back to sample testimonials data');
      return getSampleData('testimonials');
    }
  },

  async getFeaturedTestimonials() {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching featured testimonials:', error);
      return [];
    }
  },

  // Special Needs Products
  async getSpecialNeedsProducts() {
    try {
      const { data, error } = await supabase
        .from('special_needs_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching special needs products:', error);
      return [];
    }
  },

  // User Profiles - Updated to match new structure
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  async updateUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert([{ id: userId, ...profileData }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Orders
  async createOrder(orderData) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async getOrdersByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  // Cart Items
  async getCartItems(userId) {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, products(*)')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  },

  async addToCart(userId, productId, quantity = 1) {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .upsert([{ user_id: userId, product_id: productId, quantity }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  async updateCartItem(userId, productId, quantity) {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', userId)
        .eq('product_id', productId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  async removeFromCart(userId, productId) {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  async clearCart(userId) {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Notifications
  async getNotifications(userId) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  },

  async createNotification(notificationData) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([notificationData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  async markNotificationAsRead(notificationId) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Search and filtering
  async searchProducts(query, filters = {}) {
    try {
      let queryBuilder = supabase
        .from('products')
        .select('*');

      if (query) {
        queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
      }

      if (filters.category) {
        queryBuilder = queryBuilder.eq('category_id', filters.category);
      }

      if (filters.featured !== undefined) {
        queryBuilder = queryBuilder.eq('featured', filters.featured);
      }

      if (filters.minPrice !== undefined) {
        queryBuilder = queryBuilder.gte('price', filters.minPrice);
      }

      if (filters.maxPrice !== undefined) {
        queryBuilder = queryBuilder.lte('price', filters.maxPrice);
      }

      const { data, error } = await queryBuilder.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
};

// Fallback data for when Supabase is not available
export const fallbackData = {
  products: [
    {
      id: 1,
      title: "Coding for Kids Starter Pack",
      description: "Visual programming for beginners with drag-and-drop interface.",
      age_range: "8-16 years",
      featured: true,
      price: 0,
      rating: 4.5,
      reviews_count: 89,
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400",
      platforms: ["Windows", "macOS", "Linux"],
      badge: "Free",
    },
    {
      id: 2,
      title: "Ultimate Learning Bundle",
      description: "Complete educational bundle with games and tools for all ages.",
      age_range: "All ages",
      featured: true,
      price: 39.99,
      old_price: 69.99,
      rating: 4.8,
      reviews_count: 45,
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400",
      platforms: ["Windows", "macOS", "iOS"],
      badge: "Sale",
    }
  ],
  categories: [
    { id: 1, name: "Educational", description: "Learning games and educational content", icon: "📚", color: "#3B82F6" },
    { id: 2, name: "Gaming", description: "Fun and interactive games", icon: "🎮", color: "#10B981" },
    { id: 3, name: "Creative", description: "Art and creativity tools", icon: "🎨", color: "#F59E0B" }
  ],
  tutors: [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@kidzplay.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Experienced educator specializing in STEM subjects for children.",
      subjects: ["Math", "Science", "Coding"],
      experience_years: 8,
      hourly_rate: 45.00,
      rating: 4.8,
      reviews_count: 127,
      verified: true
    }
  ],
  testimonials: [
    {
      id: 1,
      user_name: "Jennifer Smith",
      content: "My daughter loves the educational games on KidzPlay Connect. She's learning so much while having fun!",
      rating: 5,
      featured: true
    }
  ],
  stats: [
    { key: "total_users", value: 1250 },
    { key: "total_products", value: 156 },
    { key: "total_tutors", value: 23 },
    { key: "total_orders", value: 892 }
  ]
}; 