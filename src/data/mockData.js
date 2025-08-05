export const products = [
  {
    id: 1,
    title: "Coding for Kids Starter Pack",
    description: "Visual programming for beginners with drag-and-drop interface.",
    age: "8-16 years",
    featured: true,
    price: 0,
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400",
    platforms: ["Windows", "macOS", "Linux"],
    badge: "Free",
  },
  {
    id: 2,
    title: "Ultimate Learning Bundle",
    description: "Complete educational bundle with games and tools for all ages.",
    age: "All ages",
    featured: true,
    price: 39.99,
    oldPrice: 69.99,
    rating: 4.8,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400",
    platforms: ["Windows", "macOS", "iOS"],
    badge: "Sale",
  },
  {
    id: 3,
    title: "Math Adventure Pro",
    description: "Interactive math games that make learning fun and engaging.",
    age: "6-12 years",
    featured: true,
    price: 24.99,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    platforms: ["Windows", "macOS", "Android"],
    badge: "Popular",
  },
  {
    id: 4,
    title: "Creative Studio Suite",
    description: "Digital art and creativity tools for young artists.",
    age: "10-18 years",
    featured: true,
    price: 29.99,
    oldPrice: 49.99,
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
    platforms: ["Windows", "macOS"],
    badge: "Sale",
  },
  {
    id: 5,
    title: "Science Explorer Kit",
    description: "Virtual science experiments and educational content.",
    age: "9-15 years",
    featured: true,
    price: 19.99,
    rating: 4.4,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
    platforms: ["Windows", "macOS", "Linux"],
    badge: "New",
  },
  {
    id: 6,
    title: "Language Learning Pro",
    description: "Interactive language learning with speech recognition.",
    age: "5-12 years",
    featured: true,
    price: 34.99,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400",
    platforms: ["Windows", "macOS", "iOS", "Android"],
    badge: "Best Seller",
  },
];

export const userProfile = {
  id: 1,
  username: "gaming_kid",
  email: "alex@kidzplay.com",
  firstName: "Alex",
  lastName: "Johnson",
  age: 12,
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  bio: "Passionate about educational games and learning new things! 🎮📚",
  joinDate: "2024-01-15",
  membership: "Premium",
  preferences: {
    favoriteCategories: ["Educational", "Puzzle", "Adventure"],
    ageRange: "8-12 years",
    platforms: ["Windows", "iOS"],
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  },
  stats: {
    totalGames: 24,
    totalPlaytime: 156, // hours
    achievements: 18,
    badges: 8,
    reviews: 12,
    favorites: 15
  },
  recentActivity: [
    {
      id: 1,
      type: "game_completed",
      title: "Math Adventure Pro",
      timestamp: "2024-01-20T10:30:00Z",
      description: "Completed Level 5 with 3 stars!"
    },
    {
      id: 2,
      type: "achievement_unlocked",
      title: "Speed Learner",
      timestamp: "2024-01-19T15:45:00Z",
      description: "Unlocked new achievement"
    },
    {
      id: 3,
      type: "review_posted",
      title: "Creative Studio Suite",
      timestamp: "2024-01-18T09:20:00Z",
      description: "Posted a 5-star review"
    }
  ],
  achievements: [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first game",
      icon: "🎯",
      unlocked: true,
      unlockedDate: "2024-01-16"
    },
    {
      id: 2,
      name: "Speed Learner",
      description: "Complete 5 games in a week",
      icon: "⚡",
      unlocked: true,
      unlockedDate: "2024-01-19"
    },
    {
      id: 3,
      name: "Review Master",
      description: "Write 10 reviews",
      icon: "✍️",
      unlocked: false,
      progress: 8
    },
    {
      id: 4,
      name: "Explorer",
      description: "Try games from 5 different categories",
      icon: "🗺️",
      unlocked: true,
      unlockedDate: "2024-01-17"
    }
  ]
}; 