import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Hero from "../components/sections/Hero";
import ExploreCategories from "../components/sections/ExploreCategories";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import OnlineTutors from "../components/sections/OnlineTutors";
import Stats from "../components/sections/Stats";
import Testimonials from "../components/sections/Testimonials";
import ChildSafety from "../components/sections/ChildSafety";
import Newsletter from "../components/sections/Newsletter";
import AuthModal from "../components/auth/AuthModal";

const Home = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Check for auth parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authParam = urlParams.get('auth');
    
    if (authParam === 'login' || authParam === 'signin') {
      setAuthModalMode('signin');
      setAuthModalOpen(true);
    } else if (authParam === 'signup' || authParam === 'register') {
      setAuthModalMode('signup');
      setAuthModalOpen(true);
    }
  }, [location.search]);

  const handleAuthModalClose = useCallback(() => {
    setAuthModalOpen(false);
    // Clean up URL parameter
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('auth')) {
      urlParams.delete('auth');
      const newSearch = urlParams.toString();
      navigate(location.pathname + (newSearch ? `?${newSearch}` : ''), { replace: true });
    }
  }, [location.search, location.pathname, navigate]);

  return (
    <div className={isAuthenticated() ? "px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 2xl:-mx-16" : ""}>
      {/* Hero Section */}
      <Hero />
      
      {/* Explore Categories Section (now includes Special Needs Support) */}
      <ExploreCategories />
      
      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Online Tutor Connection Section */}
      <OnlineTutors />
      
      {/* Trusted by Families Worldwide - Stats Section */}
      <Stats />
      
      {/* What Parents & Educators Say - Testimonials Section */}
      <Testimonials />
      
      {/* Child Safety & Security Section */}
      <ChildSafety />
      
      {/* Stay Updated with Latest Releases - Newsletter Section */}
      <Newsletter />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={handleAuthModalClose}
        initialMode={authModalMode}
      />
    </div>
  );
};

export default Home; 