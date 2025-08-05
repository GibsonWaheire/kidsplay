import React from "react";
import Hero from "../components/sections/Hero";
import ExploreCategories from "../components/sections/ExploreCategories";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import Stats from "../components/sections/Stats";
import Testimonials from "../components/sections/Testimonials";
import Newsletter from "../components/sections/Newsletter";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Explore Categories Section */}
      <ExploreCategories />
      
      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Trusted by Families Worldwide - Stats Section */}
      <Stats />
      
      {/* What Parents & Educators Say - Testimonials Section */}
      <Testimonials />
      
      {/* Stay Updated with Latest Releases - Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home; 