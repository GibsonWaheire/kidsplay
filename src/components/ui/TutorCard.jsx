import React from "react";
import LazyImage from "./LazyImage";

const TutorCard = ({ tutor, onConnect }) => {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200";
      case "busy":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "offline":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAvailabilityIcon = (status) => {
    switch (status) {
      case "online":
        return "🟢";
      case "busy":
        return "🟡";
      case "offline":
        return "⚫";
      default:
        return "⚫";
    }
  };

  const handleConnect = () => {
    if (onConnect) {
      onConnect(tutor);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 p-6 flex flex-col h-full relative group transition-all duration-300 hover:-translate-y-1">
      {/* Featured Badge */}
      {tutor.featured && (
        <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          Featured
        </div>
      )}

      {/* Profile Section */}
      <div className="flex items-center mb-4">
        <div className="relative">
          <LazyImage
            src={tutor.profilePicture}
            alt={`${tutor.name} profile`}
            className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
          />
          {/* Availability indicator */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-xs" role="img" aria-label={`Status: ${tutor.availabilityStatus}`}>
              {getAvailabilityIcon(tutor.availabilityStatus)}
            </span>
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            {tutor.name}
          </h3>
          <div className="flex items-center text-yellow-500 text-sm mb-1">
            {Array(Math.round(tutor.rating)).fill("★").join("")}
            <span className="ml-1 text-gray-500 font-medium">
              {tutor.rating} ({tutor.reviews} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {tutor.subjects.map((subject) => (
            <span
              key={subject}
              className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
        {tutor.bio}
      </p>

      {/* Experience and Languages */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium text-gray-800">Experience:</span>
          <span className="ml-2">{tutor.experience}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium text-gray-800">Languages:</span>
          <span className="ml-2">{tutor.languages.join(", ")}</span>
        </div>
      </div>

      {/* Accessibility Features (for special needs tutors) */}
      {tutor.accessibilityFeatures && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-teal-700 mb-2">Accessibility Support:</p>
          <div className="flex flex-wrap gap-1">
            {tutor.accessibilityFeatures.slice(0, 2).map((feature) => (
              <span key={feature} className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
            {tutor.accessibilityFeatures.length > 2 && (
              <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                +{tutor.accessibilityFeatures.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Availability Status */}
      <div className="mb-4">
        <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getAvailabilityColor(tutor.availabilityStatus)}`}>
          {tutor.availability}
        </span>
      </div>

      {/* Price and Connect Button */}
      <div className="flex items-center justify-between mt-auto">
        <div className="text-lg font-bold text-blue-700">
          {tutor.price}
        </div>
        <button
          onClick={handleConnect}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            tutor.availabilityStatus === "online"
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
              : tutor.availabilityStatus === "busy"
              ? "bg-yellow-500 text-white hover:bg-yellow-600 hover:scale-105"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
          disabled={tutor.availabilityStatus === "offline"}
          aria-label={`Connect with ${tutor.name} - ${tutor.availability}`}
        >
          {tutor.availabilityStatus === "offline" ? "Unavailable" : "Connect Now"}
        </button>
      </div>
    </div>
  );
};

export default TutorCard;