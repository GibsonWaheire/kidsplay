-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- Create custom types
CREATE TYPE membership_type AS ENUM ('Free', 'Premium', 'Pro');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE product_category AS ENUM ('Educational', 'Gaming', 'Creative', 'Science', 'Language', 'Math', 'Special Needs');

-- Create users table (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  username TEXT UNIQUE,
  avatar TEXT,
  membership membership_type DEFAULT 'Free',
  bio TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image TEXT,
  color TEXT,
  accessibility BOOLEAN DEFAULT FALSE,
  accessibility_features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
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
  category_id UUID REFERENCES categories(id),
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create special needs products table
CREATE TABLE special_needs_products (
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

-- Create tutors table
CREATE TABLE tutors (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
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

-- Create cart items table
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT FALSE,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_needs_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

-- Products policies (public read)
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

-- Special needs products policies (public read)
CREATE POLICY "Anyone can view special needs products" ON special_needs_products
  FOR SELECT USING (true);

-- Tutors policies (public read)
CREATE POLICY "Anyone can view tutors" ON tutors
  FOR SELECT USING (true);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Cart items policies
CREATE POLICY "Users can view their own cart items" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own cart items" ON cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Testimonials policies (public read, authenticated write)
CREATE POLICY "Anyone can view testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_special_needs_products_updated_at BEFORE UPDATE ON special_needs_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tutors_updated_at BEFORE UPDATE ON tutors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO categories (name, description, icon, color, accessibility) VALUES
('Educational', 'Learning games and educational content', '📚', '#3B82F6', false),
('Gaming', 'Fun and interactive games', '🎮', '#10B981', false),
('Creative', 'Art and creativity tools', '🎨', '#F59E0B', false),
('Science', 'Science experiments and learning', '🔬', '#8B5CF6', false),
('Language', 'Language learning tools', '🗣️', '#EF4444', false),
('Math', 'Mathematics and problem solving', '🧮', '#06B6D4', false),
('Special Needs Support', 'Accessibility and special needs support', '🤝', '#84CC16', true);

-- Insert sample products
INSERT INTO products (title, description, age_range, featured, price, rating, reviews_count, image, platforms, badge, category_id) VALUES
('Coding for Kids Starter Pack', 'Visual programming for beginners with drag-and-drop interface.', '8-16 years', true, 0, 4.5, 89, 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400', ARRAY['Windows', 'macOS', 'Linux'], 'Free', (SELECT id FROM categories WHERE name = 'Educational')),
('Ultimate Learning Bundle', 'Complete educational bundle with games and tools for all ages.', 'All ages', true, 39.99, 4.8, 45, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400', ARRAY['Windows', 'macOS', 'iOS'], 'Sale', (SELECT id FROM categories WHERE name = 'Educational')),
('Math Adventure Pro', 'Interactive math games that make learning fun and engaging.', '6-12 years', true, 24.99, 4.7, 156, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', ARRAY['Windows', 'macOS', 'Android'], 'Popular', (SELECT id FROM categories WHERE name = 'Math'));

-- Insert sample special needs products
INSERT INTO special_needs_products (name, description, price, category, image, accessibility_features, age_range, rating, reviews_count) VALUES
('Visual Learning Tablet', 'High-contrast tablet with large text and screen reader support for visually impaired children.', 299.99, 'Visual', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop', ARRAY['High Contrast Mode', 'Screen Reader Support', 'Large Text Options', 'Voice Navigation'], '5-12', 4.8, 127),
('Hearing Aid Compatible Headphones', 'Wireless headphones designed specifically for children with hearing aids and cochlear implants.', 89.99, 'Hearing', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', ARRAY['Hearing Aid Compatible', 'Adjustable Volume', 'Noise Cancellation', 'Bluetooth Connectivity'], '3-15', 4.6, 89),
('Cognitive Development Game Set', 'Educational games designed for children with learning disabilities and cognitive challenges.', 149.99, 'Cognitive', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop', ARRAY['Step-by-Step Instructions', 'Visual Cues', 'Repetitive Learning', 'Progress Tracking'], '4-10', 4.7, 203); 