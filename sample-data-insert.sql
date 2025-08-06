-- =====================================================
-- SAMPLE DATA INSERT SCRIPT FOR KIDSPLAY CONNECT
-- =====================================================
-- This script inserts comprehensive sample data that can be easily removed later
-- All sample data is tagged with 'sample_' prefix or specific identifiers for easy cleanup

-- =====================================================
-- SAMPLE CATEGORIES
-- =====================================================

INSERT INTO categories (id, name, description, icon, image, color, accessibility, accessibility_features) VALUES
('11111111-1111-1111-1111-111111111111', 'Educational', 'Learning games and educational content for all ages', '📚', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', '#3B82F6', true, ARRAY['Screen reader support', 'High contrast mode']),
('22222222-2222-2222-2222-222222222222', 'Gaming', 'Fun and interactive games that engage and entertain', '🎮', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400', '#10B981', false, ARRAY[]::text[]),
('33333333-3333-3333-3333-333333333333', 'Creative', 'Art, music, and creativity tools for young artists', '🎨', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', '#F59E0B', true, ARRAY['Color blind friendly', 'Large buttons']),
('44444444-4444-4444-4444-444444444444', 'Science', 'Science experiments and STEM learning adventures', '🔬', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', '#8B5CF6', true, ARRAY['Audio descriptions', 'Text alternatives']),
('55555555-5555-5555-5555-555555555555', 'Language', 'Language learning tools and multilingual content', '🌍', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400', '#EF4444', true, ARRAY['Multiple languages', 'Speech synthesis']),
('66666666-6666-6666-6666-666666666666', 'Math', 'Mathematics and problem-solving games', '🧮', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', '#06B6D4', true, ARRAY['Visual math aids', 'Step-by-step guides']),
('77777777-7777-7777-7777-777777777777', 'Special Needs', 'Specially designed content for children with special needs', '♿', 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400', '#84CC16', true, ARRAY['Full accessibility', 'Customizable interface', 'Sensory-friendly'])
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- SAMPLE PRODUCTS (18 products total)
-- =====================================================

-- Featured Products (6)
INSERT INTO products (id, title, description, age_range, featured, price, old_price, rating, reviews_count, image, platforms, badge, category_id, in_stock) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Coding for Kids Starter Pack', 'Visual programming for beginners with drag-and-drop interface. Perfect introduction to coding concepts without overwhelming complexity. Includes 50+ interactive lessons and projects.', '8-16 years', true, 0, NULL, 4.5, 89, 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400', ARRAY['Windows', 'macOS', 'Linux'], 'Free', '11111111-1111-1111-1111-111111111111', true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Ultimate Learning Bundle', 'Complete educational bundle with games and tools for all ages. Comprehensive learning experience across multiple subjects including math, science, language arts, and creative activities.', 'All ages', true, 39.99, 69.99, 4.8, 245, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400', ARRAY['Windows', 'macOS', 'iOS'], 'Sale', '11111111-1111-1111-1111-111111111111', true),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Math Adventure Pro', 'Interactive math games that make learning fun and engaging. Covers arithmetic, geometry, algebra, and problem-solving with adaptive difficulty levels.', '6-12 years', true, 24.99, NULL, 4.7, 156, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', ARRAY['Windows', 'macOS', 'Android'], 'Popular', '66666666-6666-6666-6666-666666666666', true),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Creative Studio Suite', 'Digital art and creativity tools for young artists. Paint, draw, animate, and create digital masterpieces with professional-grade tools designed for kids.', '10-18 years', true, 29.99, 49.99, 4.6, 178, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400', ARRAY['Windows', 'macOS'], 'Sale', '33333333-3333-3333-3333-333333333333', true),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Language Learning Pro', 'Interactive language learning with speech recognition. Learn Spanish, French, German, and more with native speaker pronunciation and cultural context.', '5-12 years', true, 34.99, NULL, 4.9, 203, 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400', ARRAY['Windows', 'macOS', 'iOS', 'Android'], 'Best Seller', '55555555-5555-5555-5555-555555555555', true),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Accessibility Learning Tools', 'Specially designed learning tools for children with special needs. Fully accessible with screen reader support, high contrast mode, and customizable interface.', '5-18 years', true, 42.99, NULL, 4.8, 134, 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400', ARRAY['Windows', 'macOS', 'iOS'], 'Accessible', '77777777-7777-7777-7777-777777777777', true),

-- Regular Products (12)
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'Science Explorer Kit', 'Virtual science experiments and educational content. Explore chemistry, physics, and biology safely with 100+ interactive experiments.', '9-15 years', false, 19.99, NULL, 4.4, 92, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', ARRAY['Windows', 'macOS', 'Linux'], 'New', '44444444-4444-4444-4444-444444444444', true),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'Puzzle Master Collection', 'Brain-teasing puzzles and logic games to develop critical thinking skills. Features 200+ puzzles across multiple difficulty levels.', '7-14 years', false, 15.99, NULL, 4.3, 67, 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400', ARRAY['Windows', 'macOS', 'iOS', 'Android'], NULL, '22222222-2222-2222-2222-222222222222', true),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'Music Maker Studio', 'Create, compose, and learn music with kid-friendly instruments and recording tools. Includes music theory lessons and composition challenges.', '6-16 years', false, 27.99, 35.99, 4.5, 112, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', ARRAY['Windows', 'macOS', 'iOS'], 'Sale', '33333333-3333-3333-3333-333333333333', true),
('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'Reading Adventures', 'Interactive storytelling and reading comprehension games. Features 50+ classic stories with comprehension quizzes and vocabulary building.', '5-10 years', false, 18.99, NULL, 4.6, 89, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', ARRAY['Windows', 'macOS', 'iOS', 'Android'], NULL, '11111111-1111-1111-1111-111111111111', true),
('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'Geography Quest', 'Explore the world through interactive maps, quizzes, and cultural activities. Learn about countries, capitals, landmarks, and cultures.', '8-14 years', false, 22.99, NULL, 4.4, 76, 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400', ARRAY['Windows', 'macOS', 'Android'], NULL, '11111111-1111-1111-1111-111111111111', true),
('llllllll-llll-llll-llll-llllllllllll', 'Junior Chef Academy', 'Learn cooking basics and kitchen safety through fun, interactive lessons. Includes healthy recipes and nutrition education.', '7-12 years', false, 16.99, NULL, 4.2, 54, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', ARRAY['Windows', 'macOS', 'iOS'], NULL, '11111111-1111-1111-1111-111111111111', true),
('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'Space Explorer VR', 'Virtual reality space exploration experience. Visit planets, learn about astronomy, and conduct space missions.', '10-16 years', false, 49.99, NULL, 4.7, 143, 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400', ARRAY['Windows', 'PlayStation VR'], 'VR', '44444444-4444-4444-4444-444444444444', false),
('nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn', 'Typing Tutor Pro', 'Learn touch typing with fun games and exercises. Adaptive lessons that adjust to your skill level and progress tracking.', '8-16 years', false, 12.99, NULL, 4.1, 198, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', ARRAY['Windows', 'macOS', 'Linux'], NULL, '11111111-1111-1111-1111-111111111111', true),
('oooooooo-oooo-oooo-oooo-oooooooooooo', 'Animal Kingdom Explorer', 'Discover wildlife through interactive documentaries, quizzes, and virtual zoo visits. Learn about animal habitats and conservation.', '5-12 years', false, 21.99, 28.99, 4.5, 87, 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400', ARRAY['Windows', 'macOS', 'iOS', 'Android'], 'Sale', '44444444-4444-4444-4444-444444444444', true),
('pppppppp-pppp-pppp-pppp-pppppppppppp', 'Memory Palace Builder', 'Develop memory skills through fun games and mnemonic techniques. Includes memory challenges and brain training exercises.', '9-15 years', false, 17.99, NULL, 4.3, 72, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', ARRAY['Windows', 'macOS', 'iOS'], NULL, '22222222-2222-2222-2222-222222222222', true),
('qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', 'Social Skills Simulator', 'Practice social interactions and emotional intelligence through role-playing scenarios. Designed for children with autism and social anxiety.', '6-14 years', false, 38.99, NULL, 4.8, 95, 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400', ARRAY['Windows', 'macOS', 'iOS'], 'Therapeutic', '77777777-7777-7777-7777-777777777777', true),
('rrrrrrrr-rrrr-rrrr-rrrr-rrrrrrrrrrrr', 'Time Management for Kids', 'Learn organization and time management skills through interactive planners, timers, and productivity games.', '8-16 years', false, 14.99, NULL, 4.0, 43, 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400', ARRAY['Windows', 'macOS', 'iOS', 'Android'], NULL, '11111111-1111-1111-1111-111111111111', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- SAMPLE TUTORS
-- =====================================================

INSERT INTO tutors (id, name, email, avatar, bio, subjects, experience_years, hourly_rate, rating, reviews_count, availability, accessibility_features, verified, is_available) VALUES
('t1111111-1111-1111-1111-111111111111', 'Sarah Chen', 'sample.sarah.chen@example.com', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 'Experienced educator specializing in STEM subjects for children. 8 years of teaching experience with a focus on making complex concepts accessible and fun.', ARRAY['Math', 'Science', 'Coding'], 8, 45.00, 4.8, 127, '{"monday": ["9:00-12:00", "14:00-17:00"], "tuesday": ["9:00-12:00", "14:00-17:00"], "wednesday": ["9:00-12:00"], "thursday": ["9:00-12:00", "14:00-17:00"], "friday": ["9:00-12:00", "14:00-17:00"]}', ARRAY['Sign language', 'Visual aids'], true, true),
('t2222222-2222-2222-2222-222222222222', 'Michael Rodriguez', 'sample.michael.rodriguez@example.com', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'Creative arts teacher with a passion for digital media and design. Helps children express their creativity through various digital platforms.', ARRAY['Art', 'Creative Writing', 'Digital Design'], 5, 40.00, 4.7, 89, '{"monday": ["10:00-13:00", "15:00-18:00"], "tuesday": ["10:00-13:00", "15:00-18:00"], "wednesday": ["10:00-13:00", "15:00-18:00"], "thursday": ["10:00-13:00"], "friday": ["10:00-13:00", "15:00-18:00"]}', ARRAY['Large text options', 'Color contrast tools'], true, true),
('t3333333-3333-3333-3333-333333333333', 'Dr. Emily Thompson', 'sample.emily.thompson@example.com', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'Child psychologist and learning specialist with expertise in special needs education. Dedicated to creating inclusive learning environments.', ARRAY['Special Needs', 'Psychology', 'Learning Support'], 12, 60.00, 4.9, 203, '{"monday": ["9:00-12:00", "13:00-16:00"], "tuesday": ["9:00-12:00", "13:00-16:00"], "wednesday": ["9:00-12:00", "13:00-16:00"], "thursday": ["9:00-12:00", "13:00-16:00"], "friday": ["9:00-12:00"]}', ARRAY['Full accessibility support', 'Sensory-friendly sessions', 'Adaptive tools'], true, true),
('t4444444-4444-4444-4444-444444444444', 'Alex Johnson', 'sample.alex.johnson@example.com', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'Language instructor specializing in English and Spanish for young learners. Native bilingual speaker with interactive teaching methods.', ARRAY['English', 'Spanish', 'ESL'], 6, 35.00, 4.6, 156, '{"monday": ["8:00-11:00", "14:00-17:00"], "tuesday": ["8:00-11:00", "14:00-17:00"], "wednesday": ["8:00-11:00", "14:00-17:00"], "thursday": ["8:00-11:00", "14:00-17:00"], "friday": ["8:00-11:00", "14:00-17:00"]}', ARRAY['Multiple language support', 'Speech-to-text'], true, true),
('t5555555-5555-5555-5555-555555555555', 'Lisa Wang', 'sample.lisa.wang@example.com', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', 'Music teacher and early childhood development specialist. Combines music education with cognitive development principles.', ARRAY['Music', 'Early Childhood', 'Development'], 7, 42.00, 4.8, 178, '{"monday": ["10:00-13:00", "15:00-18:00"], "tuesday": ["10:00-13:00", "15:00-18:00"], "wednesday": ["10:00-13:00"], "thursday": ["10:00-13:00", "15:00-18:00"], "friday": ["10:00-13:00", "15:00-18:00"], "saturday": ["9:00-12:00"]}', ARRAY['Audio-focused learning', 'Rhythm-based tools'], true, true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- SAMPLE TESTIMONIALS (4 testimonials - focused and quality)
-- =====================================================

INSERT INTO testimonials (id, user_name, content, rating, featured) VALUES
('test1111-1111-1111-1111-111111111111', 'Jennifer Smith', 'My daughter loves the educational games on KidsPlay Connect. She''s learning so much while having fun!', 5, true),
('test2222-2222-2222-2222-222222222222', 'David Wilson', 'The tutors are amazing and really know how to engage with kids. Highly recommend!', 5, true),
('test3333-3333-3333-3333-333333333333', 'Maria Garcia', 'Great platform for children with special needs. The accessibility features are wonderful.', 5, true),
('test4444-4444-4444-4444-444444444444', 'Robert Brown', 'Safe, educational, and fun. Exactly what we were looking for!', 4, false)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- SAMPLE STATS
-- =====================================================

INSERT INTO stats (key, value) VALUES
('total_users', 1250),
('total_products', 156),
('total_tutors', 23),
('total_orders', 892),
('active_sessions', 45),
('avg_rating', 47), -- Stored as integer (4.7 * 10)
('completion_rate', 87),
('satisfaction_score', 92)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- =====================================================
-- SAMPLE BLOG POSTS
-- =====================================================

INSERT INTO blog_posts (id, title, slug, excerpt, content, featured, published, category, read_time, image, meta_title, meta_description, tags) VALUES
('blog1111-1111-1111-1111-111111111111', 'The Future of Educational Technology for Kids', 'future-of-educational-technology-for-kids', 'Exploring how technology is revolutionizing the way children learn and engage with educational content.', '# The Future of Educational Technology for Kids

Educational technology has come a long way from simple computer games to sophisticated AI-powered learning platforms. Today''s children are growing up in a digital world, and educational technology is evolving to meet their needs.

## Interactive Learning Experiences

Modern educational technology focuses on creating interactive experiences that engage children in ways traditional methods cannot. From virtual reality field trips to AI tutors that adapt to each child''s learning pace, technology is making education more personalized and effective.

## Accessibility and Inclusion

One of the most exciting developments in educational technology is the focus on accessibility. Tools are being developed to ensure that children with different abilities can access the same quality education, breaking down barriers that have existed for generations.

## The Role of Parents and Educators

While technology offers incredible opportunities, the role of parents and educators remains crucial. The best educational technology solutions are those that complement human interaction rather than replace it.', true, true, 'Technology', 5, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600', 'The Future of Educational Technology for Kids - KidsPlay Connect', 'Discover how educational technology is transforming learning for children with interactive experiences, accessibility features, and personalized learning.', ARRAY['education', 'technology', 'kids', 'learning', 'future']),
('blog2222-2222-2222-2222-222222222222', 'Creating Inclusive Learning Environments', 'creating-inclusive-learning-environments', 'How to design educational experiences that work for children of all abilities and backgrounds.', '# Creating Inclusive Learning Environments

Inclusion in education means ensuring that every child, regardless of their abilities, background, or circumstances, has access to quality learning opportunities. This goes beyond just physical accessibility to encompass cognitive, social, and emotional inclusion.

## Universal Design for Learning

Universal Design for Learning (UDL) is a framework that guides the development of flexible learning environments. By providing multiple means of representation, engagement, and expression, we can create educational experiences that work for all learners.

## Technology as an Enabler

Assistive technology plays a crucial role in creating inclusive environments. From screen readers to alternative input devices, technology can help level the playing field for children with disabilities.

## Building Empathy and Understanding

Inclusive education benefits all children by teaching empathy, understanding, and acceptance of differences. When children learn alongside peers with different abilities, they develop important social skills and a broader worldview.', true, true, 'Education', 6, 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600', 'Creating Inclusive Learning Environments - KidsPlay Connect', 'Learn how to design educational experiences that work for children of all abilities with Universal Design for Learning principles.', ARRAY['inclusion', 'accessibility', 'education', 'special-needs', 'UDL']),
('blog3333-3333-3333-3333-333333333333', 'The Science of Play-Based Learning', 'science-of-play-based-learning', 'Understanding how play enhances learning and development in children.', '# The Science of Play-Based Learning

Play is not just fun and games – it''s a fundamental way that children learn about the world around them. Research in neuroscience and developmental psychology has shown that play-based learning can be more effective than traditional instructional methods.

## How Play Enhances Brain Development

When children play, their brains are incredibly active. Play stimulates the growth of neural connections, particularly in areas responsible for executive function, creativity, and social skills.

## Types of Educational Play

Not all play is created equal when it comes to learning. Structured play activities, guided discovery, and free play all serve different educational purposes and can be strategically used to achieve specific learning outcomes.

## Balancing Play and Structure

The key to effective play-based learning is finding the right balance between free exploration and guided instruction. This balance varies depending on the child''s age, development level, and learning objectives.', false, true, 'Research', 7, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600', 'The Science of Play-Based Learning - KidsPlay Connect', 'Discover how play enhances brain development and learning in children through research-backed play-based learning methods.', ARRAY['play-based-learning', 'child-development', 'neuroscience', 'education', 'research'])
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'SAMPLE DATA INSERTED SUCCESSFULLY!';
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'Inserted:';
    RAISE NOTICE '- 7 sample categories';
    RAISE NOTICE '- 8 sample products';
    RAISE NOTICE '- 5 sample tutors';
    RAISE NOTICE '- 8 sample testimonials';
    RAISE NOTICE '- 8 sample stats';
    RAISE NOTICE '- 3 sample blog posts';
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'To remove all sample data later, run:';
    RAISE NOTICE 'sample-data-cleanup.sql';
    RAISE NOTICE '==============================================';
END $$;