import React from "react";
import Hero from "../components/sections/Hero";
import ExploreCategories from "../components/sections/ExploreCategories";
import FeaturedProducts from "../components/sections/FeaturedProducts";

const Home = () => {
  return (
    <div>
      <Hero />
      <ExploreCategories />
      <FeaturedProducts />
      {/* Add Testimonials, Newsletter, etc. below here when ready */}
    </div>
  );
};

export default Home; 