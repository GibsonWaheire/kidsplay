// Comprehensive sample data for KidsPlay Connect
// This data will be used as fallback when database is empty
// Can be easily removed once real data is added

export const sampleCategories = [
  {
    id: 'cat-1',
    name: 'Educational',
    description: 'Interactive learning experiences that make education fun and engaging for curious minds',
    icon: '📚',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    color: 'blue',
    accessibility: true,
    accessibility_features: ['Screen reader support', 'High contrast mode', 'Keyboard navigation'],
    highlight: 'Most Popular',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-2',
    name: 'Gaming',
    description: 'Action-packed adventures and strategic challenges that develop critical thinking skills',
    icon: '🎮',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
    color: 'green',
    accessibility: false,
    accessibility_features: [],
    highlight: 'Most Engaging',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-3',
    name: 'Creative Arts',
    description: 'Unleash imagination through digital art, music composition, and creative storytelling',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    color: 'yellow',
    accessibility: true,
    accessibility_features: ['Color blind friendly', 'Large buttons', 'Voice commands'],
    highlight: 'Creative Boost',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-4',
    name: 'STEM Explorer',
    description: 'Hands-on science experiments, coding challenges, and engineering projects',
    icon: '🔬',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
    color: 'purple',
    accessibility: true,
    accessibility_features: ['Audio descriptions', 'Text alternatives', 'Simplified interface'],
    highlight: 'Future Ready',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-5',
    name: 'World Languages',
    description: 'Master new languages through immersive games and cultural exploration',
    icon: '🌍',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
    color: 'red',
    accessibility: true,
    accessibility_features: ['Multiple languages', 'Speech synthesis', 'Cultural context'],
    highlight: 'Global Connect',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-6',
    name: 'Math Mastery',
    description: 'From basic counting to advanced algebra through interactive puzzles and games',
    icon: '🧮',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    color: 'cyan',
    accessibility: true,
    accessibility_features: ['Visual math aids', 'Step-by-step guides', 'Progress tracking'],
    highlight: 'Skill Builder',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-7',
    name: 'Inclusive Learning',
    description: 'Thoughtfully designed experiences for children with diverse learning needs',
    icon: '🌟',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400',
    color: 'teal',
    accessibility: true,
    accessibility_features: ['Full accessibility', 'Customizable interface', 'Sensory-friendly', 'Adaptive difficulty'],
    highlight: 'Inclusive',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-8',
    name: 'Life Skills',
    description: 'Practical skills like cooking, time management, and social interaction',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    color: 'orange',
    accessibility: false,
    accessibility_features: [],
    highlight: 'Real World',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const sampleProducts = [
  // Featured Products (6 products)
  {
    id: 'prod-1',
    title: 'Coding for Kids Starter Pack',
    description: 'Visual programming for beginners with drag-and-drop interface. Perfect introduction to coding concepts without overwhelming complexity. Includes 50+ interactive lessons and projects.',
    age_range: '8-16 years',
    featured: true,
    price: 0,
    old_price: null,
    rating: 4.5,
    reviews_count: 89,
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
    platforms: ['Windows', 'macOS', 'Linux'],
    badge: 'Free',
    category_id: 'cat-1',
    in_stock: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'prod-2',
    title: 'Ultimate Learning Bundle',
    description: 'Complete educational bundle with games and tools for all ages. Comprehensive learning experience across multiple subjects including math, science, language arts, and creative activities.',
    age_range: 'All ages',
    featured: true,
    price: 39.99,
    old_price: 69.99,
    rating: 4.8,
    reviews_count: 245,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
    platforms: ['Windows', 'macOS', 'iOS'],
    badge: 'Sale',
    category_id: 'cat-1',
    in_stock: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'prod-3',
    title: 'Math Adventure Pro',
    description: 'Interactive math games that make learning fun and engaging. Covers arithmetic, geometry, algebra, and problem-solving with adaptive difficulty levels.',
    age_range: '6-12 years',
    featured: true,
    price: 24.99,
    old_price: null,
    rating: 4.7,
    reviews_count: 156,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    platforms: ['Windows', 'macOS', 'Android'],
    badge: 'Popular',
    category_id: 'cat-6',
    in_stock: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'prod-4',
    title: 'Creative Studio Suite',
    description: 'Digital art and creativity tools for young artists. Paint, draw, animate, and create digital masterpieces with professional-grade tools designed for kids.',
    age_range: '10-18 years',
    featured: true,
    price: 29.99,
    old_price: 49.99,
    rating: 4.6,
    reviews_count: 178,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
    platforms: ['Windows', 'macOS'],
    badge: 'Sale',
    category_id: 'cat-3',
    in_stock: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'prod-5',
    title: 'Language Learning Pro',
    description: 'Interactive language learning with speech recognition. Learn Spanish, French, German, and more with native speaker pronunciation and cultural context.',
    age_range: '5-12 years',
    featured: true,
    price: 34.99,
    old_price: null,
    rating: 4.9,
    reviews_count: 203,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
    platforms: ['Windows', 'macOS', 'iOS', 'Android'],
    badge: 'Best Seller',
    category_id: 'cat-5',
    in_stock: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'prod-6',
    title: 'Accessibility Learning Tools',
    description: 'Specially designed learning tools for children with special needs. Fully accessible with screen reader support, high contrast mode, and customizable interface.',
    age_range: '5-18 years',
    featured: true,
    price: 42.99,
    old_price: null,
    rating: 4.8,
    reviews_count: 134,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400',
    platforms: ['Windows', 'macOS', 'iOS'],
    badge: 'Accessible',
    category_id: 'cat-7',
    in_stock: true,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Regular Products (12 products)
  {
    id: 'prod-7',
    title: 'Science Explorer Kit',
    description: 'Virtual science experiments and educational content. Explore chemistry, physics, and biology safely with 100+ interactive experiments.',
    age_range: '9-15 years',
    featured: false,
    price: 19.99,
    old_price: null,
    rating: 4.4,
    reviews_count: 92,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
    platforms: ['Windows', 'macOS', 'Linux'],
    badge: 'New',
    category_id: 'cat-4',
    in_stock: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'prod-8',
    title: 'Puzzle Master Collection',
    description: 'Brain-teasing puzzles and logic games to develop critical thinking skills. Features 200+ puzzles across multiple difficulty levels.',
    age_range: '7-14 years',
    featured: false,
    price: 15.99,
    old_price: null,
    rating: 4.3,
    reviews_count: 67,
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
    platforms: ['Windows', 'macOS', 'iOS', 'Android'],
    badge: null,
    category_id: 'cat-2',
    in_stock: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'prod-9',
    title: 'Music Maker Studio',
    description: 'Create, compose, and learn music with kid-friendly instruments and recording tools. Includes music theory lessons and composition challenges.',
    age_range: '6-16 years',
    featured: false,
    price: 27.99,
    old_price: 35.99,
    rating: 4.5,
    reviews_count: 112,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    platforms: ['Windows', 'macOS', 'iOS'],
    badge: 'Sale',
    category_id: 'cat-3',
    in_stock: true,
    created_at: '2024-01-02T00:00:00Z'
  },
  {
    id: 'prod-10',
    title: 'Reading Adventures',
    description: 'Interactive storytelling and reading comprehension games. Features 50+ classic stories with comprehension quizzes and vocabulary building.',
    age_range: '5-10 years',
    featured: false,
    price: 18.99,
    old_price: null,
    rating: 4.6,
    reviews_count: 89,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    platforms: ['Windows', 'macOS', 'iOS', 'Android'],
    badge: null,
    category_id: 'cat-1',
    in_stock: true,
    created_at: '2024-01-03T00:00:00Z'
  },
  {
    id: 'prod-11',
    title: 'Geography Quest',
    description: 'Explore the world through interactive maps, quizzes, and cultural activities. Learn about countries, capitals, landmarks, and cultures.',
    age_range: '8-14 years',
    featured: false,
    price: 22.99,
    old_price: null,
    rating: 4.4,
    reviews_count: 76,
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400',
    platforms: ['Windows', 'macOS', 'Android'],
    badge: null,
    category_id: 'cat-1',
    in_stock: true,
    created_at: '2024-01-04T00:00:00Z'
  },
  {
    id: 'prod-12',
    title: 'Junior Chef Academy',
    description: 'Learn cooking basics and kitchen safety through fun, interactive lessons. Includes healthy recipes and nutrition education.',
    age_range: '7-12 years',
    featured: false,
    price: 16.99,
    old_price: null,
    rating: 4.2,
    reviews_count: 54,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    platforms: ['Windows', 'macOS', 'iOS'],
    badge: null,
    category_id: 'cat-1',
    in_stock: true,
    created_at: '2024-01-05T00:00:00Z'
  },
  {
    id: 'prod-13',
    title: 'Space Explorer VR',
    description: 'Virtual reality space exploration experience. Visit planets, learn about astronomy, and conduct space missions.',
    age_range: '10-16 years',
    featured: false,
    price: 49.99,
    old_price: null,
    rating: 4.7,
    reviews_count: 143,
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
    platforms: ['Windows', 'PlayStation VR'],
    badge: 'VR',
    category_id: 'cat-4',
    in_stock: false,
    created_at: '2024-01-06T00:00:00Z'
  },
  {
    id: 'prod-14',
    title: 'Typing Tutor Pro',
    description: 'Learn touch typing with fun games and exercises. Adaptive lessons that adjust to your skill level and progress tracking.',
    age_range: '8-16 years',
    featured: false,
    price: 12.99,
    old_price: null,
    rating: 4.1,
    reviews_count: 198,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    platforms: ['Windows', 'macOS', 'Linux'],
    badge: null,
    category_id: 'cat-1',
    in_stock: true,
    created_at: '2024-01-07T00:00:00Z'
  },
  {
    id: 'prod-15',
    title: 'Animal Kingdom Explorer',
    description: 'Discover wildlife through interactive documentaries, quizzes, and virtual zoo visits. Learn about animal habitats and conservation.',
    age_range: '5-12 years',
    featured: false,
    price: 21.99,
    old_price: 28.99,
    rating: 4.5,
    reviews_count: 87,
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400',
    platforms: ['Windows', 'macOS', 'iOS', 'Android'],
    badge: 'Sale',
    category_id: 'cat-4',
    in_stock: true,
    created_at: '2024-01-08T00:00:00Z'
  },
  {
    id: 'prod-16',
    title: 'Memory Palace Builder',
    description: 'Develop memory skills through fun games and mnemonic techniques. Includes memory challenges and brain training exercises.',
    age_range: '9-15 years',
    featured: false,
    price: 17.99,
    old_price: null,
    rating: 4.3,
    reviews_count: 72,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    platforms: ['Windows', 'macOS', 'iOS'],
    badge: null,
    category_id: 'cat-2',
    in_stock: true,
    created_at: '2024-01-09T00:00:00Z'
  },
  {
    id: 'prod-17',
    title: 'Social Skills Simulator',
    description: 'Practice social interactions and emotional intelligence through role-playing scenarios. Designed for children with autism and social anxiety.',
    age_range: '6-14 years',
    featured: false,
    price: 38.99,
    old_price: null,
    rating: 4.8,
    reviews_count: 95,
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400',
    platforms: ['Windows', 'macOS', 'iOS'],
    badge: 'Therapeutic',
    category_id: 'cat-7',
    in_stock: true,
    created_at: '2024-01-10T00:00:00Z'
  },
  {
    id: 'prod-18',
    title: 'Time Management for Kids',
    description: 'Learn organization and time management skills through interactive planners, timers, and productivity games.',
    age_range: '8-16 years',
    featured: false,
    price: 14.99,
    old_price: null,
    rating: 4.0,
    reviews_count: 43,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400',
    platforms: ['Windows', 'macOS', 'iOS', 'Android'],
    badge: null,
    category_id: 'cat-1',
    in_stock: true,
    created_at: '2024-01-11T00:00:00Z'
  }
];

export const sampleTutors = [
  {
    id: 'tutor-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Experienced educator specializing in STEM subjects for children. 8 years of teaching experience with a focus on making complex concepts accessible and fun.',
    subjects: ['Math', 'Science', 'Coding'],
    experience_years: 8,
    hourly_rate: 45.00,
    rating: 4.8,
    reviews_count: 127,
    availability: {
      monday: ['9:00-12:00', '14:00-17:00'],
      tuesday: ['9:00-12:00', '14:00-17:00'],
      wednesday: ['9:00-12:00'],
      thursday: ['9:00-12:00', '14:00-17:00'],
      friday: ['9:00-12:00', '14:00-17:00']
    },
    accessibility_features: ['Sign language', 'Visual aids'],
    verified: true,
    is_available: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'tutor-2',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Creative arts teacher with a passion for digital media and design. Helps children express their creativity through various digital platforms.',
    subjects: ['Art', 'Creative Writing', 'Digital Design'],
    experience_years: 5,
    hourly_rate: 40.00,
    rating: 4.7,
    reviews_count: 89,
    availability: {
      monday: ['10:00-13:00', '15:00-18:00'],
      tuesday: ['10:00-13:00', '15:00-18:00'],
      wednesday: ['10:00-13:00', '15:00-18:00'],
      thursday: ['10:00-13:00'],
      friday: ['10:00-13:00', '15:00-18:00']
    },
    accessibility_features: ['Large text options', 'Color contrast tools'],
    verified: true,
    is_available: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'tutor-3',
    name: 'Dr. Emily Thompson',
    email: 'emily.thompson@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Child psychologist and learning specialist with expertise in special needs education. Dedicated to creating inclusive learning environments.',
    subjects: ['Special Needs', 'Psychology', 'Learning Support'],
    experience_years: 12,
    hourly_rate: 60.00,
    rating: 4.9,
    reviews_count: 203,
    availability: {
      monday: ['9:00-12:00', '13:00-16:00'],
      tuesday: ['9:00-12:00', '13:00-16:00'],
      wednesday: ['9:00-12:00', '13:00-16:00'],
      thursday: ['9:00-12:00', '13:00-16:00'],
      friday: ['9:00-12:00']
    },
    accessibility_features: ['Full accessibility support', 'Sensory-friendly sessions', 'Adaptive tools'],
    verified: true,
    is_available: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'tutor-4',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Language instructor specializing in English and Spanish for young learners. Native bilingual speaker with interactive teaching methods.',
    subjects: ['English', 'Spanish', 'ESL'],
    experience_years: 6,
    hourly_rate: 35.00,
    rating: 4.6,
    reviews_count: 156,
    availability: {
      monday: ['8:00-11:00', '14:00-17:00'],
      tuesday: ['8:00-11:00', '14:00-17:00'],
      wednesday: ['8:00-11:00', '14:00-17:00'],
      thursday: ['8:00-11:00', '14:00-17:00'],
      friday: ['8:00-11:00', '14:00-17:00']
    },
    accessibility_features: ['Multiple language support', 'Speech-to-text'],
    verified: true,
    is_available: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'tutor-5',
    name: 'Lisa Wang',
    email: 'lisa.wang@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Music teacher and early childhood development specialist. Combines music education with cognitive development principles.',
    subjects: ['Music', 'Early Childhood', 'Development'],
    experience_years: 7,
    hourly_rate: 42.00,
    rating: 4.8,
    reviews_count: 178,
    availability: {
      monday: ['10:00-13:00', '15:00-18:00'],
      tuesday: ['10:00-13:00', '15:00-18:00'],
      wednesday: ['10:00-13:00'],
      thursday: ['10:00-13:00', '15:00-18:00'],
      friday: ['10:00-13:00', '15:00-18:00'],
      saturday: ['9:00-12:00']
    },
    accessibility_features: ['Audio-focused learning', 'Rhythm-based tools'],
    verified: true,
    is_available: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'tutor-6',
    name: 'James Patterson',
    email: 'james.patterson@example.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    bio: 'Former NASA engineer turned education specialist. Makes physics and engineering concepts accessible and exciting for young minds.',
    subjects: ['Physics', 'Engineering', 'Robotics'],
    experience_years: 10,
    hourly_rate: 55.00,
    rating: 4.9,
    reviews_count: 245,
    availability: {
      monday: ['9:00-12:00', '14:00-17:00'],
      tuesday: ['9:00-12:00', '14:00-17:00'],
      wednesday: ['9:00-12:00', '14:00-17:00'],
      thursday: ['9:00-12:00'],
      friday: ['9:00-12:00', '14:00-17:00']
    },
    accessibility_features: ['Hands-on demonstrations', 'Visual modeling'],
    verified: true,
    is_available: true,
    created_at: '2024-01-02T00:00:00Z'
  },
  {
    id: 'tutor-7',
    name: 'Maria Gonzalez',
    email: 'maria.gonzalez@example.com',
    avatar: 'https://images.unsplash.com/photo-1559941899-b0e73b5e6b0b?w=150&h=150&fit=crop&crop=face',
    bio: 'Bilingual education specialist with expertise in cultural studies and history. Creates immersive learning experiences.',
    subjects: ['History', 'Geography', 'Cultural Studies'],
    experience_years: 9,
    hourly_rate: 38.00,
    rating: 4.7,
    reviews_count: 134,
    availability: {
      monday: ['8:00-11:00', '13:00-16:00'],
      tuesday: ['8:00-11:00', '13:00-16:00'],
      wednesday: ['8:00-11:00', '13:00-16:00'],
      thursday: ['8:00-11:00', '13:00-16:00'],
      friday: ['8:00-11:00'],
      saturday: ['10:00-13:00']
    },
    accessibility_features: ['Bilingual support', 'Cultural sensitivity training'],
    verified: true,
    is_available: true,
    created_at: '2024-01-03T00:00:00Z'
  },
  {
    id: 'tutor-8',
    name: 'Dr. Kevin Park',
    email: 'kevin.park@example.com',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    bio: 'Pediatric occupational therapist and educational consultant. Specializes in sensory integration and adaptive learning techniques.',
    subjects: ['Occupational Therapy', 'Sensory Integration', 'Life Skills'],
    experience_years: 15,
    hourly_rate: 65.00,
    rating: 4.9,
    reviews_count: 312,
    availability: {
      monday: ['9:00-12:00', '14:00-17:00'],
      tuesday: ['9:00-12:00', '14:00-17:00'],
      wednesday: ['9:00-12:00'],
      thursday: ['9:00-12:00', '14:00-17:00'],
      friday: ['9:00-12:00', '14:00-17:00']
    },
    accessibility_features: ['Sensory-friendly environment', 'Adaptive equipment', 'Individualized approaches'],
    verified: true,
    is_available: true,
    created_at: '2024-01-04T00:00:00Z'
  },
  {
    id: 'tutor-9',
    name: 'Rachel Green',
    email: 'rachel.green@example.com',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    bio: 'Environmental scientist and nature educator. Passionate about outdoor learning and environmental conservation education.',
    subjects: ['Environmental Science', 'Biology', 'Nature Studies'],
    experience_years: 6,
    hourly_rate: 41.00,
    rating: 4.8,
    reviews_count: 167,
    availability: {
      monday: ['10:00-13:00', '15:00-18:00'],
      tuesday: ['10:00-13:00', '15:00-18:00'],
      wednesday: ['10:00-13:00', '15:00-18:00'],
      thursday: ['10:00-13:00', '15:00-18:00'],
      friday: ['10:00-13:00'],
      saturday: ['9:00-12:00', '14:00-17:00']
    },
    accessibility_features: ['Outdoor accommodations', 'Nature-based tools'],
    verified: true,
    is_available: true,
    created_at: '2024-01-05T00:00:00Z'
  },
  {
    id: 'tutor-10',
    name: 'Thomas Mitchell',
    email: 'thomas.mitchell@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Professional chef and nutrition educator. Teaches cooking skills, food science, and healthy eating habits to children.',
    subjects: ['Cooking', 'Nutrition', 'Food Science'],
    experience_years: 8,
    hourly_rate: 43.00,
    rating: 4.6,
    reviews_count: 198,
    availability: {
      monday: ['11:00-14:00', '16:00-19:00'],
      tuesday: ['11:00-14:00', '16:00-19:00'],
      wednesday: ['11:00-14:00'],
      thursday: ['11:00-14:00', '16:00-19:00'],
      friday: ['11:00-14:00', '16:00-19:00'],
      saturday: ['10:00-13:00']
    },
    accessibility_features: ['Kitchen safety adaptations', 'Texture-sensitive accommodations'],
    verified: true,
    is_available: true,
    created_at: '2024-01-06T00:00:00Z'
  },
  {
    id: 'tutor-11',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@example.com',
    avatar: 'https://images.unsplash.com/photo-1594824388853-5d6fd2b6b78d?w=150&h=150&fit=crop&crop=face',
    bio: 'Child development specialist and mindfulness instructor. Focuses on emotional intelligence and stress management for children.',
    subjects: ['Mindfulness', 'Emotional Intelligence', 'Stress Management'],
    experience_years: 11,
    hourly_rate: 52.00,
    rating: 4.9,
    reviews_count: 276,
    availability: {
      monday: ['9:00-12:00', '14:00-17:00'],
      tuesday: ['9:00-12:00', '14:00-17:00'],
      wednesday: ['9:00-12:00', '14:00-17:00'],
      thursday: ['9:00-12:00', '14:00-17:00'],
      friday: ['9:00-12:00']
    },
    accessibility_features: ['Calming environment', 'Anxiety-sensitive approaches', 'Meditation tools'],
    verified: true,
    is_available: true,
    created_at: '2024-01-07T00:00:00Z'
  },
  {
    id: 'tutor-12',
    name: 'Marcus Williams',
    email: 'marcus.williams@example.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    bio: 'Former professional athlete turned physical education specialist. Promotes healthy living and motor skill development.',
    subjects: ['Physical Education', 'Sports', 'Health & Wellness'],
    experience_years: 7,
    hourly_rate: 39.00,
    rating: 4.7,
    reviews_count: 142,
    availability: {
      monday: ['8:00-11:00', '15:00-18:00'],
      tuesday: ['8:00-11:00', '15:00-18:00'],
      wednesday: ['8:00-11:00', '15:00-18:00'],
      thursday: ['8:00-11:00', '15:00-18:00'],
      friday: ['8:00-11:00', '15:00-18:00'],
      saturday: ['9:00-12:00']
    },
    accessibility_features: ['Adaptive sports equipment', 'Modified activities'],
    verified: true,
    is_available: true,
    created_at: '2024-01-08T00:00:00Z'
  },
  {
    id: 'tutor-13',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@example.com',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face',
    bio: 'French native speaker and international education specialist. Expert in language immersion and cultural exchange programs.',
    subjects: ['French', 'International Studies', 'Cultural Exchange'],
    experience_years: 9,
    hourly_rate: 46.00,
    rating: 4.8,
    reviews_count: 189,
    availability: {
      monday: ['10:00-13:00', '15:00-18:00'],
      tuesday: ['10:00-13:00', '15:00-18:00'],
      wednesday: ['10:00-13:00', '15:00-18:00'],
      thursday: ['10:00-13:00'],
      friday: ['10:00-13:00', '15:00-18:00']
    },
    accessibility_features: ['Multi-language resources', 'Cultural adaptation support'],
    verified: true,
    is_available: true,
    created_at: '2024-01-09T00:00:00Z'
  },
  {
    id: 'tutor-14',
    name: 'Daniel Kim',
    email: 'daniel.kim@example.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    bio: 'Software developer and coding instructor for kids. Makes programming fun and accessible through game-based learning.',
    subjects: ['Programming', 'Game Development', 'Computer Science'],
    experience_years: 5,
    hourly_rate: 48.00,
    rating: 4.7,
    reviews_count: 156,
    availability: {
      monday: ['14:00-17:00', '19:00-22:00'],
      tuesday: ['14:00-17:00', '19:00-22:00'],
      wednesday: ['14:00-17:00', '19:00-22:00'],
      thursday: ['14:00-17:00', '19:00-22:00'],
      friday: ['14:00-17:00'],
      saturday: ['10:00-13:00', '15:00-18:00']
    },
    accessibility_features: ['Screen reader compatibility', 'Keyboard navigation support'],
    verified: true,
    is_available: true,
    created_at: '2024-01-10T00:00:00Z'
  },
  {
    id: 'tutor-15',
    name: 'Isabella Martinez',
    email: 'isabella.martinez@example.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    bio: 'Drama therapist and performing arts educator. Uses theater and creative expression to build confidence and communication skills.',
    subjects: ['Drama Therapy', 'Theater Arts', 'Public Speaking'],
    experience_years: 8,
    hourly_rate: 44.00,
    rating: 4.8,
    reviews_count: 173,
    availability: {
      monday: ['10:00-13:00', '16:00-19:00'],
      tuesday: ['10:00-13:00', '16:00-19:00'],
      wednesday: ['10:00-13:00'],
      thursday: ['10:00-13:00', '16:00-19:00'],
      friday: ['10:00-13:00', '16:00-19:00'],
      saturday: ['11:00-14:00']
    },
    accessibility_features: ['Non-verbal communication support', 'Confidence-building techniques'],
    verified: true,
    is_available: false,
    created_at: '2024-01-11T00:00:00Z'
  }
];

export const sampleTestimonials = [
  {
    id: 'test-1',
    user_name: 'Jennifer Smith',
    content: 'My daughter loves the educational games on KidsPlay Connect. She\'s learning so much while having fun!',
    rating: 5,
    featured: true,
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'test-2',
    user_name: 'David Wilson',
    content: 'The tutors are amazing and really know how to engage with kids. Highly recommend!',
    rating: 5,
    featured: true,
    created_at: '2024-01-20T00:00:00Z'
  },
  {
    id: 'test-3',
    user_name: 'Maria Garcia',
    content: 'Great platform for children with special needs. The accessibility features are wonderful.',
    rating: 5,
    featured: true,
    created_at: '2024-01-25T00:00:00Z'
  },
  {
    id: 'test-4',
    user_name: 'Robert Brown',
    content: 'Safe, educational, and fun. Exactly what we were looking for!',
    rating: 4,
    featured: false,
    created_at: '2024-02-01T00:00:00Z'
  }
];

export const sampleStats = [
  { 
    id: 'stat-1', 
    key: 'happy_families', 
    value: '50K+', 
    label: 'Happy Families',
    icon: '👨‍👩‍👧‍👦',
    color: 'blue',
    created_at: '2024-01-01T00:00:00Z' 
  },
  { 
    id: 'stat-2', 
    key: 'countries', 
    value: '120+', 
    label: 'Countries',
    icon: '🌍',
    color: 'green',
    created_at: '2024-01-01T00:00:00Z' 
  },
  { 
    id: 'stat-3', 
    key: 'learning_hours', 
    value: '2M+', 
    label: 'Learning Hours',
    icon: '📚',
    color: 'purple',
    created_at: '2024-01-01T00:00:00Z' 
  },
  { 
    id: 'stat-4', 
    key: 'parent_satisfaction', 
    value: '98%', 
    label: 'Parent Satisfaction',
    icon: '⭐',
    color: 'yellow',
    created_at: '2024-01-01T00:00:00Z' 
  },
  { 
    id: 'stat-5', 
    key: 'expert_tutors', 
    value: '500+', 
    label: 'Expert Tutors',
    icon: '👩‍🏫',
    color: 'pink',
    created_at: '2024-01-01T00:00:00Z' 
  },
  { 
    id: 'stat-6', 
    key: 'safety_score', 
    value: '100%', 
    label: 'Safety Score',
    icon: '🛡️',
    color: 'orange',
    created_at: '2024-01-01T00:00:00Z' 
  }
];

export const sampleBlogPosts = [
  {
    id: 'blog-1',
    title: 'The Future of Educational Technology for Kids',
    slug: 'future-of-educational-technology-for-kids',
    excerpt: 'Exploring how technology is revolutionizing the way children learn and engage with educational content.',
    content: `# The Future of Educational Technology for Kids

Educational technology has come a long way from simple computer games to sophisticated AI-powered learning platforms. Today's children are growing up in a digital world, and educational technology is evolving to meet their needs.

## Interactive Learning Experiences

Modern educational technology focuses on creating interactive experiences that engage children in ways traditional methods cannot. From virtual reality field trips to AI tutors that adapt to each child's learning pace, technology is making education more personalized and effective.

## Accessibility and Inclusion

One of the most exciting developments in educational technology is the focus on accessibility. Tools are being developed to ensure that children with different abilities can access the same quality education, breaking down barriers that have existed for generations.

## The Role of Parents and Educators

While technology offers incredible opportunities, the role of parents and educators remains crucial. The best educational technology solutions are those that complement human interaction rather than replace it.`,
    author_id: null,
    featured: true,
    published: true,
    category: 'Technology',
    read_time: 5,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
    meta_title: 'The Future of Educational Technology for Kids - KidsPlay Connect',
    meta_description: 'Discover how educational technology is transforming learning for children with interactive experiences, accessibility features, and personalized learning.',
    tags: ['education', 'technology', 'kids', 'learning', 'future'],
    created_at: '2024-01-10T00:00:00Z'
  },
  {
    id: 'blog-2',
    title: 'Creating Inclusive Learning Environments',
    slug: 'creating-inclusive-learning-environments',
    excerpt: 'How to design educational experiences that work for children of all abilities and backgrounds.',
    content: `# Creating Inclusive Learning Environments

Inclusion in education means ensuring that every child, regardless of their abilities, background, or circumstances, has access to quality learning opportunities. This goes beyond just physical accessibility to encompass cognitive, social, and emotional inclusion.

## Universal Design for Learning

Universal Design for Learning (UDL) is a framework that guides the development of flexible learning environments. By providing multiple means of representation, engagement, and expression, we can create educational experiences that work for all learners.

## Technology as an Enabler

Assistive technology plays a crucial role in creating inclusive environments. From screen readers to alternative input devices, technology can help level the playing field for children with disabilities.

## Building Empathy and Understanding

Inclusive education benefits all children by teaching empathy, understanding, and acceptance of differences. When children learn alongside peers with different abilities, they develop important social skills and a broader worldview.`,
    author_id: null,
    featured: true,
    published: true,
    category: 'Education',
    read_time: 6,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600',
    meta_title: 'Creating Inclusive Learning Environments - KidsPlay Connect',
    meta_description: 'Learn how to design educational experiences that work for children of all abilities with Universal Design for Learning principles.',
    tags: ['inclusion', 'accessibility', 'education', 'special-needs', 'UDL'],
    created_at: '2024-01-12T00:00:00Z'
  },
  {
    id: 'blog-3',
    title: 'The Science of Play-Based Learning',
    slug: 'science-of-play-based-learning',
    excerpt: 'Understanding how play enhances learning and development in children.',
    content: `# The Science of Play-Based Learning

Play is not just fun and games – it's a fundamental way that children learn about the world around them. Research in neuroscience and developmental psychology has shown that play-based learning can be more effective than traditional instructional methods.

## How Play Enhances Brain Development

When children play, their brains are incredibly active. Play stimulates the growth of neural connections, particularly in areas responsible for executive function, creativity, and social skills.

## Types of Educational Play

Not all play is created equal when it comes to learning. Structured play activities, guided discovery, and free play all serve different educational purposes and can be strategically used to achieve specific learning outcomes.

## Balancing Play and Structure

The key to effective play-based learning is finding the right balance between free exploration and guided instruction. This balance varies depending on the child's age, development level, and learning objectives.`,
    author_id: null,
    featured: false,
    published: true,
    category: 'Research',
    read_time: 7,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600',
    meta_title: 'The Science of Play-Based Learning - KidsPlay Connect',
    meta_description: 'Discover how play enhances brain development and learning in children through research-backed play-based learning methods.',
    tags: ['play-based-learning', 'child-development', 'neuroscience', 'education', 'research'],
    created_at: '2024-01-14T00:00:00Z'
  }
];

// Helper function to get sample data by type
export const getSampleData = (type) => {
  switch (type) {
    case 'categories':
      return sampleCategories;
    case 'products':
      return sampleProducts;
    case 'tutors':
      return sampleTutors;
    case 'testimonials':
      return sampleTestimonials;
    case 'stats':
      return sampleStats;
    case 'blog_posts':
      return sampleBlogPosts;
    default:
      return [];
  }
};