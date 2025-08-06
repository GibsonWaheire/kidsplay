-- =====================================================
-- SAMPLE DATA CLEANUP SCRIPT FOR KIDSPLAY CONNECT
-- =====================================================
-- This script removes all sample data inserted by sample-data-insert.sql
-- Run this when you want to remove sample data and use only real data

-- =====================================================
-- REMOVE SAMPLE BLOG POSTS
-- =====================================================

DELETE FROM blog_posts WHERE id IN (
  'blog1111-1111-1111-1111-111111111111',
  'blog2222-2222-2222-2222-222222222222',
  'blog3333-3333-3333-3333-333333333333'
);

-- =====================================================
-- REMOVE SAMPLE STATS (keep structure, reset values)
-- =====================================================

-- Option 1: Remove sample stats entirely
DELETE FROM stats WHERE key IN (
  'total_users',
  'total_products', 
  'total_tutors',
  'total_orders',
  'active_sessions',
  'avg_rating',
  'completion_rate',
  'satisfaction_score'
);

-- Option 2: Reset to zero (uncomment if you prefer this)
-- UPDATE stats SET value = 0 WHERE key IN (
--   'total_users',
--   'total_products', 
--   'total_tutors',
--   'total_orders',
--   'active_sessions',
--   'completion_rate',
--   'satisfaction_score'
-- );
-- UPDATE stats SET value = 0 WHERE key = 'avg_rating';

-- =====================================================
-- REMOVE SAMPLE TESTIMONIALS
-- =====================================================

DELETE FROM testimonials WHERE id IN (
  'test1111-1111-1111-1111-111111111111',
  'test2222-2222-2222-2222-222222222222',
  'test3333-3333-3333-3333-333333333333',
  'test4444-4444-4444-4444-444444444444',
  'test5555-5555-5555-5555-555555555555',
  'test6666-6666-6666-6666-666666666666',
  'test7777-7777-7777-7777-777777777777',
  'test8888-8888-8888-8888-888888888888'
);

-- =====================================================
-- REMOVE SAMPLE TUTORS
-- =====================================================

DELETE FROM tutors WHERE id IN (
  't1111111-1111-1111-1111-111111111111',
  't2222222-2222-2222-2222-222222222222',
  't3333333-3333-3333-3333-333333333333',
  't4444444-4444-4444-4444-444444444444',
  't5555555-5555-5555-5555-555555555555'
);

-- =====================================================
-- REMOVE SAMPLE PRODUCTS
-- =====================================================

DELETE FROM products WHERE id IN (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  'ffffffff-ffff-ffff-ffff-ffffffffffff',
  'gggggggg-gggg-gggg-gggg-gggggggggggg',
  'hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh'
);

-- =====================================================
-- REMOVE SAMPLE CATEGORIES
-- =====================================================

DELETE FROM categories WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555',
  '66666666-6666-6666-6666-666666666666',
  '77777777-7777-7777-7777-777777777777'
);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check that sample data has been removed
SELECT 'Categories' as table_name, COUNT(*) as remaining_count FROM categories
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Tutors', COUNT(*) FROM tutors
UNION ALL
SELECT 'Testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'Stats', COUNT(*) FROM stats
UNION ALL
SELECT 'Blog Posts', COUNT(*) FROM blog_posts;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'SAMPLE DATA CLEANUP COMPLETED!';
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'Removed all sample data from:';
    RAISE NOTICE '- Categories';
    RAISE NOTICE '- Products';
    RAISE NOTICE '- Tutors';
    RAISE NOTICE '- Testimonials';
    RAISE NOTICE '- Stats';
    RAISE NOTICE '- Blog Posts';
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'Your database is now ready for real data!';
    RAISE NOTICE 'Sample data fallbacks in frontend will still work';
    RAISE NOTICE 'if database is empty.';
    RAISE NOTICE '==============================================';
END $$;