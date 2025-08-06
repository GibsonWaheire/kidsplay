# KidsPlay Connect

A safe, educational platform for children's learning and entertainment, designed with accessibility and parental controls in mind.

KidsPlay Connect provides a secure environment where children can explore educational products, connect with certified tutors, and engage in safe learning activities. The platform emphasizes accessibility, making it suitable for children with special needs.

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Backend**: Supabase (PostgreSQL + Authentication + Real-time)
- **Authentication**: Supabase Auth with session management
- **Development**: ESLint + Vite

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kidsplay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Then edit `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5175`

## 🎨 Features

### Public Features
- **Home Page**: Welcome section with featured products and categories
- **Products**: Browse educational products and games
- **Product Details**: Detailed product information and reviews
- **Categories**: Explore products by category
- **Cart**: Shopping cart functionality
- **About**: Information about the platform
- **Blog**: Educational content and articles
- **Special Needs**: Dedicated section for accessibility-focused products

### Authenticated Features
- **Profile**: User profile management
- **Orders**: Order history and tracking
- **Notifications**: User notifications and alerts
- **Login/Logout**: Secure authentication via Supabase

### Safety & Accessibility
- Child-friendly interface design
- Accessibility support for special needs
- Parental controls and safety features
- Secure session management
- COPPA compliant

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Navbar, Sidebar, Footer)
│   ├── sections/       # Page sections and features
│   └── ui/             # UI components (Cards, Modals, etc.)
├── context/            # React Context providers
├── data/               # Mock data and static content
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries (Supabase client, data service)
├── pages/              # Page components
└── constants/          # Application constants
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛡️ Security & Privacy

- User data stored securely in Supabase PostgreSQL
- Row Level Security (RLS) policies for data protection
- Secure authentication via Supabase Auth
- Child-safe content filtering
- COPPA compliant design

## 🌐 Deployment

The application is deployed on Vercel at: https://kidsplay-omega.vercel.app/

### Environment Variables for Production

Make sure to set these environment variables in your Vercel dashboard:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 📄 License

This project is private and proprietary.

---

**Project Owner**: Gibson Waheire  
**Year**: 2024