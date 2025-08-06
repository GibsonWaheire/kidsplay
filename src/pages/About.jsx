import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';

const About = () => {
  return (
    <PageContainer className="py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About KidzPlay Connect</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Empowering children worldwide through safe, educational, and engaging gaming experiences
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At KidzPlay Connect, we believe that learning should be fun, engaging, and accessible to every child. 
              Our mission is to create a safe digital environment where children can explore, learn, and grow through 
              carefully curated educational games and content.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We partner with educators, parents, and child development experts to ensure that every game on our 
              platform contributes to a child's cognitive, social, and emotional development.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🎯</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learning Through Play</h3>
              <p className="text-gray-600">
                Every game is designed with educational objectives in mind, making learning an adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <span className="text-4xl mb-4 block">🔒</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety First</h3>
            <p className="text-gray-600">
              Every piece of content is carefully reviewed to ensure it's safe and appropriate for children.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <span className="text-4xl mb-4 block">🎓</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Educational Excellence</h3>
            <p className="text-gray-600">
              We partner with educational experts to create content that truly helps children learn and grow.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <span className="text-4xl mb-4 block">🌟</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fun & Engagement</h3>
            <p className="text-gray-600">
              Learning should be enjoyable! We create games that children love to play and want to return to.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-900">Alex Johnson</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-900">Sarah Chen</h3>
            <p className="text-gray-600">Head of Education</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-900">Michael Rodriguez</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-900">Emily Thompson</h3>
            <p className="text-gray-600">Content Director</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Help us create a better future for children through educational gaming. 
          Start your journey with KidzPlay Connect today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Explore Games
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </PageContainer>
  );
};

export default About; 