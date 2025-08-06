export const specialNeedsProducts = [
  {
    id: 101,
    title: "Accessible Learning Suite",
    description: "Comprehensive learning tools with text-to-speech, high contrast, and keyboard navigation.",
    age: "5-15 years",
    featured: true,
    price: 0,
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400",
    platforms: ["Windows", "macOS", "iOS", "Android"],
    badge: "Free",
    accessibilityFeatures: [
      "Text-to-Speech",
      "High Contrast Mode",
      "Keyboard Navigation",
      "Screen Reader Compatible",
      "Adjustable Font Sizes"
    ],
    category: "special-needs"
  },
  {
    id: 102,
    title: "Visual Learning Games",
    description: "Interactive games designed for children with visual impairments using audio cues and tactile feedback.",
    age: "6-12 years",
    featured: true,
    price: 19.99,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400",
    platforms: ["Windows", "macOS", "iOS"],
    badge: "Popular",
    accessibilityFeatures: [
      "Audio Descriptions",
      "Voice Navigation",
      "Haptic Feedback",
      "Large Button Interface",
      "Sound-Based Gameplay"
    ],
    category: "special-needs"
  },
  {
    id: 103,
    title: "Sign Language Learning App",
    description: "Interactive sign language learning with video demonstrations and practice sessions.",
    age: "4-16 years",
    featured: true,
    price: 24.99,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400",
    platforms: ["Windows", "macOS", "iOS", "Android"],
    badge: "New",
    accessibilityFeatures: [
      "Sign Language Support",
      "Video Demonstrations",
      "Gesture Recognition",
      "Visual Learning Cards",
      "Subtitles Available"
    ],
    category: "special-needs"
  },
  {
    id: 104,
    title: "Cognitive Skills Builder",
    description: "Specially designed games for children with cognitive disabilities to improve memory and attention.",
    age: "6-14 years",
    featured: true,
    price: 29.99,
    rating: 4.9,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    platforms: ["Windows", "macOS", "iPad"],
    badge: "Recommended",
    accessibilityFeatures: [
      "Simplified Interface",
      "Progress Tracking",
      "Adaptive Difficulty",
      "Visual Cues",
      "Reward System"
    ],
    category: "special-needs"
  },
  {
    id: 105,
    title: "Motor Skills Development",
    description: "Touch-based games designed to improve fine motor skills and hand-eye coordination.",
    age: "3-10 years",
    featured: true,
    price: 15.99,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
    platforms: ["iPad", "Android Tablet"],
    badge: "Touch Optimized",
    accessibilityFeatures: [
      "Large Touch Targets",
      "Drag & Drop Interface",
      "Colorful Visual Feedback",
      "Simple Instructions",
      "Parental Progress Reports"
    ],
    category: "special-needs"
  },
  {
    id: 106,
    title: "Autism-Friendly Learning Tools",
    description: "Structured learning environment designed specifically for children on the autism spectrum.",
    age: "5-12 years",
    featured: true,
    price: 34.99,
    rating: 4.8,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
    platforms: ["Windows", "macOS", "iOS"],
    badge: "Specialist Approved",
    accessibilityFeatures: [
      "Predictable Interface",
      "Sensory-Friendly Design",
      "Customizable Environments",
      "Social Stories",
      "Routine Building Tools"
    ],
    category: "special-needs"
  }
];

export const accessibilityCategories = [
  {
    name: "Visual Impairment Support",
    description: "Tools and games for children with visual challenges",
    icon: "👁️",
    features: ["Screen Reader Compatible", "Audio Navigation", "High Contrast"],
    productCount: 15
  },
  {
    name: "Hearing Impairment Support", 
    description: "Visual learning tools and sign language resources",
    icon: "👂",
    features: ["Sign Language Support", "Visual Cues", "Subtitles"],
    productCount: 12
  },
  {
    name: "Cognitive Support",
    description: "Simplified interfaces and adaptive learning tools",
    icon: "🧠",
    features: ["Simplified UI", "Adaptive Difficulty", "Progress Tracking"],
    productCount: 18
  },
  {
    name: "Motor Skills Support",
    description: "Games designed for children with mobility challenges",
    icon: "✋",
    features: ["Large Touch Targets", "Voice Control", "Switch Access"],
    productCount: 10
  }
];