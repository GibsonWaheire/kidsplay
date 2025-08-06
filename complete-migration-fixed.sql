-- =====================================================
-- COMPLETE MIGRATION SCRIPT FOR KIDSPLAY CONNECT (FIXED)
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
DO $$ BEGIN
    CREATE TYPE membership_type AS ENUM ('Free', 'Premium', 'Pro');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_category AS ENUM ('Educational', 'Gaming', 'Creative', 'Science', 'Language', 'Math', 'Special Needs');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- CORE TABLES
-- =====================================================

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  username TEXT UNIQUE,
  avatar TEXT,
  membership membership_type DEFAULT 'Free',
  role user_role DEFAULT 'user',
  bio TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add role column if it doesn't exist
DO $$ BEGIN
    ALTER TABLE user_profiles ADD COLUMN role user_role DEFAULT 'user';
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  image TEXT,
  color TEXT,
  accessibility BOOLEAN DEFAULT FALSE,
  accessibility_features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  age_range TEXT,
  featured BOOLEAN DEFAULT FALSE,
  price DECIMAL(10,2) DEFAULT 0,
  old_price DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  image TEXT,
  platforms TEXT[],
  badge TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  category TEXT,
  read_time INTEGER DEFAULT 5,
  image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Special needs products table
CREATE TABLE IF NOT EXISTS special_needs_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  accessibility_features TEXT[],
  age_range TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tutors table
CREATE TABLE IF NOT EXISTS tutors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  bio TEXT,
  subjects TEXT[],
  experience_years INTEGER DEFAULT 0,
  hourly_rate DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  availability JSONB DEFAULT '{}',
  accessibility_features TEXT[],
  verified BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  status order_status DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  items JSONB NOT NULL,
  shipping_address JSONB,
  billing_address JSONB,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT FALSE,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT,
  content TEXT,
  rating INTEGER,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add rating column if it doesn't exist
DO $$ BEGIN
    ALTER TABLE testimonials ADD COLUMN rating INTEGER;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add featured column if it doesn't exist
DO $$ BEGIN
    ALTER TABLE testimonials ADD COLUMN featured BOOLEAN DEFAULT FALSE;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Stats table
CREATE TABLE IF NOT EXISTS stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Products indexes
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Categories indexes
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);
CREATE INDEX IF NOT EXISTS idx_categories_accessibility ON categories(accessibility);

-- Blog posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);

-- Tutors indexes
CREATE INDEX IF NOT EXISTS idx_tutors_verified ON tutors(verified);
CREATE INDEX IF NOT EXISTS idx_tutors_subject ON tutors(subject);
CREATE INDEX IF NOT EXISTS idx_tutors_available ON tutors(is_available);
CREATE INDEX IF NOT EXISTS idx_tutors_rating ON tutors(rating);

-- Orders indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Cart items indexes
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Testimonials indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at);

-- Stats indexes
CREATE INDEX IF NOT EXISTS idx_stats_key ON stats(key);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_needs_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- User profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
CREATE POLICY "Admins can update all profiles" ON user_profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Categories policies (public read, admin write)
DROP POLICY IF EXISTS "Public can view categories" ON categories;
CREATE POLICY "Public can view categories" ON categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Products policies (public read, admin write)
DROP POLICY IF EXISTS "Public can view products" ON products;
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage products" ON products;
CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Blog posts policies (public read published, admin write)
DROP POLICY IF EXISTS "Public can view published blog posts" ON blog_posts;
CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admins can view all blog posts" ON blog_posts;
CREATE POLICY "Admins can view all blog posts" ON blog_posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;
CREATE POLICY "Admins can manage blog posts" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Special needs products policies (public read, admin write)
DROP POLICY IF EXISTS "Public can view special needs products" ON special_needs_products;
CREATE POLICY "Public can view special needs products" ON special_needs_products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage special needs products" ON special_needs_products;
CREATE POLICY "Admins can manage special needs products" ON special_needs_products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Tutors policies (public read, admin write)
DROP POLICY IF EXISTS "Public can view tutors" ON tutors;
CREATE POLICY "Public can view tutors" ON tutors
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage tutors" ON tutors;
CREATE POLICY "Admins can manage tutors" ON tutors
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Orders policies (users can view their own, admin can view all)
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can manage all orders" ON orders;
CREATE POLICY "Admins can manage all orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Cart items policies (users can manage their own)
DROP POLICY IF EXISTS "Users can view their own cart items" ON cart_items;
CREATE POLICY "Users can view their own cart items" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own cart items" ON cart_items;
CREATE POLICY "Users can manage their own cart items" ON cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Notifications policies (users can view their own, admin can view all)
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all notifications" ON notifications;
CREATE POLICY "Admins can view all notifications" ON notifications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Testimonials policies (public read, admin write)
DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
CREATE POLICY "Public can view testimonials" ON testimonials
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage testimonials" ON testimonials;
CREATE POLICY "Admins can manage testimonials" ON testimonials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Stats policies (public read, admin write)
DROP POLICY IF EXISTS "Public can view stats" ON stats;
CREATE POLICY "Public can view stats" ON stats
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage stats" ON stats;
CREATE POLICY "Admins can manage stats" ON stats
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_special_needs_products_updated_at ON special_needs_products;
CREATE TRIGGER update_special_needs_products_updated_at BEFORE UPDATE ON special_needs_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tutors_updated_at ON tutors;
CREATE TRIGGER update_tutors_updated_at BEFORE UPDATE ON tutors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA
-- =====================================================

-- Insert sample categories
INSERT INTO categories (name, description, icon, color, accessibility) VALUES
('Educational', 'Learning games and educational content', '📚', '#3B82F6', true),
('Gaming', 'Fun and interactive games', '🎮', '#10B981', false),
('Creative', 'Art and creativity tools', '🎨', '#F59E0B', true),
('Science', 'Science experiments and learning', '🔬', '#8B5CF6', true),
('Language', 'Language learning tools', '🌍', '#EF4444', true),
('Math', 'Mathematics and problem solving', '🧮', '#06B6D4', true),
('Special Needs', 'Accessibility-focused content', '♿', '#84CC16', true)
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (title, description, age_range, featured, price, old_price, rating, reviews_count, image, platforms, badge, category_id) VALUES
('Coding for Kids Starter Pack', 'Visual programming for beginners with drag-and-drop interface.', '8-16 years', true, 0, NULL, 4.5, 89, 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400', ARRAY['Windows', 'macOS', 'Linux'], 'Free', (SELECT id FROM categories WHERE name = 'Educational' LIMIT 1)),
('Ultimate Learning Bundle', 'Complete educational bundle with games and tools for all ages.', 'All ages', true, 39.99, 69.99, 4.8, 45, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400', ARRAY['Windows', 'macOS', 'iOS'], 'Sale', (SELECT id FROM categories WHERE name = 'Educational' LIMIT 1)),
('Math Adventure Pro', 'Interactive math games that make learning fun and engaging.', '6-12 years', true, 24.99, NULL, 4.7, 156, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', ARRAY['Windows', 'macOS', 'Android'], 'Popular', (SELECT id FROM categories WHERE name = 'Math' LIMIT 1)),
('Creative Studio Suite', 'Digital art and creativity tools for young artists.', '10-18 years', true, 29.99, 49.99, 4.6, 78, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400', ARRAY['Windows', 'macOS'], 'Sale', (SELECT id FROM categories WHERE name = 'Creative' LIMIT 1)),
('Science Explorer Kit', 'Virtual science experiments and educational content.', '9-15 years', true, 19.99, NULL, 4.4, 92, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', ARRAY['Windows', 'macOS', 'Linux'], 'New', (SELECT id FROM categories WHERE name = 'Science' LIMIT 1)),
('Language Learning Pro', 'Interactive language learning with speech recognition.', '5-12 years', true, 34.99, NULL, 4.9, 203, 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400', ARRAY['Windows', 'macOS', 'iOS', 'Android'], 'Best Seller', (SELECT id FROM categories WHERE name = 'Language' LIMIT 1))
ON CONFLICT (title) DO NOTHING;

-- Insert sample tutors
INSERT INTO tutors (name, email, avatar, bio, subjects, experience_years, hourly_rate, rating, reviews_count, verified) VALUES
('Sarah Chen', 'sarah.chen@kidzplay.com', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 'Experienced educator specializing in STEM subjects for children.', ARRAY['Math', 'Science', 'Coding'], 8, 45.00, 4.8, 127, true),
('Michael Rodriguez', 'michael.rodriguez@kidzplay.com', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'Creative arts teacher with a passion for digital media and design.', ARRAY['Art', 'Creative Writing', 'Digital Design'], 5, 40.00, 4.7, 89, true),
('Dr. Emily Thompson', 'emily.thompson@kidzplay.com', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'Child psychologist and learning specialist with expertise in special needs education.', ARRAY['Special Needs', 'Psychology', 'Learning Support'], 12, 60.00, 4.9, 203, true),
('Alex Johnson', 'alex.johnson@kidzplay.com', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'Language instructor specializing in English and Spanish for young learners.', ARRAY['English', 'Spanish', 'ESL'], 6, 35.00, 4.6, 156, true),
('Lisa Wang', 'lisa.wang@kidzplay.com', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', 'Music teacher and early childhood development specialist.', ARRAY['Music', 'Early Childhood', 'Development'], 7, 42.00, 4.8, 178, true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (user_name, content, rating, featured) VALUES
('Jennifer Smith', 'My daughter loves the educational games on KidzPlay Connect. She''s learning so much while having fun!', 5, true),
('David Wilson', 'The tutors are amazing and really know how to engage with kids. Highly recommend!', 5, true),
('Maria Garcia', 'Great platform for children with special needs. The accessibility features are wonderful.', 5, true),
('Robert Brown', 'My son has improved his math skills significantly since using this platform.', 4, true),
('Amanda Davis', 'The variety of content is impressive. Something for every child''s interests and learning style.', 4, false),
('James Miller', 'Safe, educational, and fun. Exactly what we were looking for!', 5, false),
('Sarah Johnson', 'The user interface is so intuitive that my 8-year-old can navigate it independently.', 4, false),
('Michael Lee', 'Excellent customer support and regular updates with new content.', 5, false)
ON CONFLICT DO NOTHING;

-- Insert sample stats
INSERT INTO stats (key, value) VALUES
('total_users', 1250),
('total_products', 156),
('total_tutors', 23),
('total_orders', 892),
('active_sessions', 45),
('avg_rating', 4.7),
('completion_rate', 87),
('satisfaction_score', 92)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Display completion message
DO $$
BEGIN
    RAISE NOTICE 'Migration completed successfully!';
    RAISE NOTICE 'Tables created: user_profiles, categories, products, blog_posts, special_needs_products, tutors, orders, cart_items, notifications, testimonials, stats';
    RAISE NOTICE 'RLS policies enabled for all tables';
    RAISE NOTICE 'Indexes created for optimal performance';
    RAISE NOTICE 'Seed data inserted for testing';
END $$; 