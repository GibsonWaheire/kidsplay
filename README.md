# KidsPlay Connect

A safe, educational platform for children's learning and entertainment, designed with accessibility and parental controls in mind.

## 🎯 Purpose

KidsPlay Connect provides a secure environment where children can explore educational products, connect with certified tutors, and engage in safe learning activities. The platform emphasizes accessibility, making it suitable for children with special needs.

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Local Data**: JSON Server
- **Authentication**: Local storage with session management
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

3. **Start the local data server**
   ```bash
   npm run server
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

### Authenticated Features
- **Profile**: User profile management
- **Orders**: Order history and tracking
- **Notifications**: User notifications and alerts
- **Login/Logout**: Secure authentication

### Safety & Accessibility
- Child-friendly interface design
- Accessibility support for special needs
- Parental controls and safety features
- Secure session management

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
├── pages/              # Page components
└── constants/          # Application constants
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON server for local data
- `npm run lint` - Run ESLint

## 🛡️ Security & Privacy

- All user data is stored locally
- Sessions are properly managed for security
- No external data collection
- Child-safe content filtering

## 📄 License

This project is private and proprietary.

---

**Project Owner**: Gibson Waheire  
**Year**: 2024