import { supabase } from './supabase';

// Data service for all Supabase operations
export const dataService = {
  // Products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Special Needs Products
  async getSpecialNeedsProducts() {
    const { data, error } = await supabase
      .from('special_needs_products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Tutors
  async getTutors() {
    const { data, error } = await supabase
      .from('tutors')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Testimonials
  async getTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Stats
  async getStats() {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // User Profiles
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async updateUserProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([{ user_id: userId, ...profileData }])
      .select();
    
    if (error) throw error;
    return data;
  },

  // Orders
  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();
    
    if (error) throw error;
    return data;
  },

  async getOrdersByUserId(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Cart Items
  async getCartItems(userId) {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data || [];
  },

  async addToCart(userId, productId, quantity = 1) {
    const { data, error } = await supabase
      .from('cart_items')
      .upsert([{ user_id: userId, product_id: productId, quantity }])
      .select();
    
    if (error) throw error;
    return data;
  },

  async updateCartItem(userId, productId, quantity) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .select();
    
    if (error) throw error;
    return data;
  },

  async removeFromCart(userId, productId) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
    return { success: true };
  },

  async clearCart(userId) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
    return { success: true };
  },

  // Notifications
  async getNotifications(userId) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createNotification(notificationData) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notificationData])
      .select();
    
    if (error) throw error;
    return data;
  },

  async markNotificationAsRead(notificationId) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select();
    
    if (error) throw error;
    return data;
  },

  // Search and Filter
  async searchProducts(query, filters = {}) {
    let queryBuilder = supabase
      .from('products')
      .select('*');

    if (query) {
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    }

    if (filters.category) {
      queryBuilder = queryBuilder.eq('category_id', filters.category);
    }

    if (filters.featured) {
      queryBuilder = queryBuilder.eq('featured', true);
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
  }
};

// Fallback data for development/testing
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
    {
      id: 1,
      name: "Educational",
      description: "Learning games and educational content",
      icon: "📚",
      color: "#3B82F6",
      accessibility: false
    },
    {
      id: 2,
      name: "Gaming",
      description: "Fun and interactive games",
      icon: "🎮",
      color: "#10B981",
      accessibility: false
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "My kids love the educational games! They're learning while having fun.",
      verified: true
    }
  ],
  stats: [
    {
      id: 1,
      label: "Happy Kids",
      value: "10,000+",
      icon: "😊"
    },
    {
      id: 2,
      label: "Educational Games",
      value: "500+",
      icon: "🎮"
    }
  ]
}; 