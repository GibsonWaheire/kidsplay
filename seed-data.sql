-- =====================================================
-- SEED DATA FOR KIDSPLAY CONNECT
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

-- Insert sample blog posts (if blog_posts table exists)
INSERT INTO blog_posts (title, slug, excerpt, content, author_id, featured, published, category, read_time, image, tags) VALUES
('The Future of Educational Gaming: Trends to Watch in 2024', 'future-educational-gaming-2024', 'Discover the latest trends in educational gaming and how they''re shaping the future of learning for children worldwide.', 'Educational gaming has evolved significantly over the past decade, and 2024 promises to bring even more exciting developments...', (SELECT id FROM user_profiles LIMIT 1), true, true, 'Education', 5, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400', ARRAY['education', 'gaming', 'trends', '2024']),
('How to Choose the Right Educational Games for Your Child', 'choose-right-educational-games', 'A comprehensive guide for parents on selecting age-appropriate and educational games that support your child''s development.', 'Choosing the right educational games for your child can be overwhelming with so many options available...', (SELECT id FROM user_profiles LIMIT 1), false, true, 'Parenting', 7, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', ARRAY['parenting', 'education', 'games', 'selection']),
('The Science Behind Learning Through Play', 'science-learning-through-play', 'Explore the research and science that proves why play-based learning is so effective for children''s cognitive development.', 'Research has consistently shown that play is not just a way for children to have fun—it''s a crucial component of their cognitive development...', (SELECT id FROM user_profiles LIMIT 1), false, true, 'Research', 8, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', ARRAY['science', 'learning', 'play', 'development'])
ON CONFLICT (slug) DO NOTHING; 