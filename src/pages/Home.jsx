import React from "react";
import Hero from "../components/sections/Hero";
import ExploreCategories from "../components/sections/ExploreCategories";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import OnlineTutors from "../components/sections/OnlineTutors";
import Stats from "../components/sections/Stats";
import Testimonials from "../components/sections/Testimonials";
import ChildSafety from "../components/sections/ChildSafety";
import Newsletter from "../components/sections/Newsletter";

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home; 