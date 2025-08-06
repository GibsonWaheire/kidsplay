import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_anon_key_here'

// Only throw error if we're in production and missing credentials
if (import.meta.env.PROD && (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project-id.supabase.co' || supabaseAnonKey === 'your_anon_key_here')) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const auth = {
  // Sign up with email and password
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  getCurrentSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}

export const database = {
  // Products - Updated to match new structure
  getProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  getProductById: async (id) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  getFeaturedProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Admin Product Operations
  createProduct: async (productData) => {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
    return { data, error }
  },

  updateProduct: async (id, productData) => {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteProduct: async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Blog Posts
  getBlogPosts: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, user_profiles(first_name, last_name, avatar)')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  getPublishedBlogPosts: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, user_profiles(first_name, last_name, avatar)')
      .eq('published', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  getBlogPostById: async (id) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, user_profiles(first_name, last_name, avatar)')
      .eq('id', id)
      .single()
    return { data, error }
  },

  getBlogPostBySlug: async (slug) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, user_profiles(first_name, last_name, avatar)')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    return { data, error }
  },

  // Admin Blog Operations
  createBlogPost: async (postData) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
    return { data, error }
  },

  updateBlogPost: async (id, postData) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteBlogPost: async (id) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Categories - Updated to match new structure
  getCategories: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })
    return { data, error }
  },

  // Admin Category Operations
  createCategory: async (categoryData) => {
    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select()
    return { data, error }
  },

  updateCategory: async (id, categoryData) => {
    const { data, error } = await supabase
      .from('categories')
      .update(categoryData)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteCategory: async (id) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Stats - New table
  getStats: async () => {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Admin Stats Operations
  createStat: async (statData) => {
    const { data, error } = await supabase
      .from('stats')
      .insert([statData])
      .select()
    return { data, error }
  },

  updateStat: async (id, statData) => {
    const { data, error } = await supabase
      .from('stats')
      .update(statData)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteStat: async (id) => {
    const { error } = await supabase
      .from('stats')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Tutors - Updated to match new structure
  getTutors: async () => {
    const { data, error } = await supabase
      .from('tutors')
      .select('*')
      .order('name', { ascending: true })
    return { data, error }
  },

  // Admin Tutor Operations
  createTutor: async (tutorData) => {
    const { data, error } = await supabase
      .from('tutors')
      .insert([tutorData])
      .select()
    return { data, error }
  },

  updateTutor: async (id, tutorData) => {
    const { data, error } = await supabase
      .from('tutors')
      .update(tutorData)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteTutor: async (id) => {
    const { error } = await supabase
      .from('tutors')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Testimonials - Updated to match new structure
  getTestimonials: async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  getFeaturedTestimonials: async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Admin Testimonial Operations
  createTestimonial: async (testimonialData) => {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonialData])
      .select()
    return { data, error }
  },

  updateTestimonial: async (id, testimonialData) => {
    const { data, error } = await supabase
      .from('testimonials')
      .update(testimonialData)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteTestimonial: async (id) => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Special Needs Products
  getSpecialNeedsProducts: async () => {
    const { data, error } = await supabase
      .from('special_needs_products')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Orders
  createOrder: async (orderData) => {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
    return { data, error }
  },

  getOrdersByUserId: async (userId) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // User Profiles
  getUserProfile: async (userId) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateUserProfile: async (userId, profileData) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([{ id: userId, ...profileData }])
      .select()
    return { data, error }
  },

  // Admin User Operations
  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  updateUserRole: async (userId, role) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ role })
      .eq('id', userId)
      .select()
    return { data, error }
  }
} 