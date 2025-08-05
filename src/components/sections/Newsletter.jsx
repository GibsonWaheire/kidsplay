import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-3xl text-white">📧</span>
          </div>

          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay Updated with Latest Releases
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get notified about new educational games, exclusive content, and special offers. 
            Join our newsletter and never miss out on the latest learning adventures!
          </p>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Subscribing...
                    </span>
                  ) : (
                    'Subscribe Now'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-semibold text-green-800">Successfully Subscribed!</h3>
                    <p className="text-green-600 text-sm">You'll receive our latest updates soon.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 justify-center">
              <span className="text-2xl">🎁</span>
              <span className="text-sm text-gray-600">Exclusive Content</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <span className="text-2xl">🚀</span>
              <span className="text-sm text-gray-600">Early Access</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <span className="text-2xl">💰</span>
              <span className="text-sm text-gray-600">Special Offers</span>
            </div>
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-500 mt-6">
            We respect your privacy. Unsubscribe at any time. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 