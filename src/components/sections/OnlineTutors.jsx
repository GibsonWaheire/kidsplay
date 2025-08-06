import React, { useState } from "react";
import { Link } from "react-router-dom";
import TutorCard from "../ui/TutorCard";
import Toast from "../ui/Toast";
import { tutors, tutorSubjects } from "../../data/tutors";

const OnlineTutors = () => {
  const featuredTutors = tutors.filter((tutor) => tutor.featured).slice(0, 6);
  const [toast, setToast] = useState(null);

  const handleConnect = (tutor) => {
    setToast({
      message: `Connection request sent to ${tutor.name}! They will contact you shortly.`,
      type: 'success'
    });
    
    // In a real app, you would initiate the connection process here
    console.log('Connecting with tutor:', tutor);
  };

  const handleToastClose = () => {
    setToast(null);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Connect with Expert Online Tutors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              One-on-one personalized learning with certified tutors who specialize in making education fun and engaging for children
            </p>
            
            {/* Subject Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {tutorSubjects.slice(0, 6).map((subject) => (
                <span
                  key={subject.name}
                  className="inline-flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <span role="img" aria-label={subject.name}>{subject.icon}</span>
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-sm text-gray-500">({subject.count})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Tutors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTutors.map((tutor, index) => (
              <div 
                key={tutor.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TutorCard 
                  tutor={tutor} 
                  onConnect={handleConnect}
                />
              </div>
            ))}
          </div>

          {/* Value Proposition */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl" role="img" aria-label="Verified">✅</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Verified Tutors</h3>
                <p className="text-gray-600">All tutors are background-checked and certified professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl" role="img" aria-label="Personalized">🎯</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Personalized Learning</h3>
                <p className="text-gray-600">Customized lessons based on your child's learning style and pace</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl" role="img" aria-label="Flexible">⏰</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">Book sessions at times that work for your family's schedule</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/tutors"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center group"
            >
              See All Tutors
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">→</span>
            </Link>
            <Link
              to="/book-session"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center group"
            >
              Book a Session
              <span className="ml-2" role="img" aria-label="Calendar">📅</span>
            </Link>
          </div>

          {/* Special Offer */}
          <div className="text-center mt-8">
            <p className="text-lg text-gray-600">
              <span className="font-bold text-green-600">First session FREE</span> for new families! 
              <span className="text-sm text-gray-500 ml-2">No commitment required</span>
            </p>
          </div>
        </div>
      </section>
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
    </>
  );
};

export default OnlineTutors;