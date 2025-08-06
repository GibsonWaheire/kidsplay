import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PageContainer from '../components/layout/PageContainer';
import { dataService, fallbackData } from '../lib/dataService';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    age: ''
  });

  // Load user profile from Supabase
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user?.id) {
        try {
          setLoading(true);
          const profile = await dataService.getUserProfile(user.id);
          setUserProfile(profile);
        } catch (err) {
          console.error('Error loading user profile:', err);
          // Use fallback data if Supabase is not available
          setUserProfile(fallbackData.userProfile);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserProfile();
  }, [user]);

  // Initialize form with user data
  useEffect(() => {
    if (user || userProfile) {
      setEditForm({
        firstName: user?.firstName || userProfile?.first_name || '',
        lastName: user?.lastName || userProfile?.last_name || '',
        bio: user?.bio || userProfile?.bio || '',
        age: user?.age || userProfile?.age || ''
      });
    }
  }, [user, userProfile]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user?.id) {
        // Update user profile in Supabase
        const updatedProfile = await dataService.updateUserProfile(user.id, {
          first_name: editForm.firstName,
          last_name: editForm.lastName,
          bio: editForm.bio,
          age: editForm.age
        });
        
        // Update local user state
        const updatedUser = {
          ...user,
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          bio: editForm.bio,
          age: editForm.age
        };
        updateUser(updatedUser);
        setUserProfile(updatedProfile);
      }
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return formatDate(dateString);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'game_completed':
        return '🎮';
      case 'achievement_unlocked':
        return '🏆';
      case 'review_posted':
        return '⭐';
      default:
        return '📝';
    }
  };

  if (loading) {
    return (
      <PageContainer className="py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PageContainer>
    );
  }

  const currentUser = user || userProfile;
  const displayName = currentUser?.firstName || currentUser?.first_name || 'User';
  const displayLastName = currentUser?.lastName || currentUser?.last_name || '';
  const displayUsername = currentUser?.username || 'user';
  const displayAvatar = currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';

  return (
    <PageContainer className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account and view your gaming progress</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
            {/* Avatar and Basic Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={displayAvatar}
                  alt={`${displayName} ${displayLastName}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-4">
                {displayName} {displayLastName}
              </h2>
              <p className="text-gray-500">@{displayUsername}</p>
              <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium mt-2">
                {user?.membership || userProfile?.membership} Member
              </span>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Bio</h3>
              <p className="text-gray-600 text-sm">{user?.bio || userProfile?.bio}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{userProfile?.stats?.totalGames || fallbackData.userProfile.stats.totalGames}</div>
                <div className="text-xs text-gray-600">Games Played</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">{userProfile?.stats?.achievements || fallbackData.userProfile.stats.achievements}</div>
                <div className="text-xs text-gray-600">Achievements</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{userProfile?.stats?.totalPlaytime || fallbackData.userProfile.stats.totalPlaytime}h</div>
                <div className="text-xs text-gray-600">Playtime</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">{userProfile?.stats?.badges || fallbackData.userProfile.stats.badges}</div>
                <div className="text-xs text-gray-600">Badges</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
              <Link
                to="/orders"
                className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium text-center"
              >
                View Orders
              </Link>
              <button
                onClick={logout}
                className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-xl hover:bg-red-200 transition-colors duration-200 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', name: 'Overview', icon: '📊' },
                  { id: 'achievements', name: 'Achievements', icon: '🏆' },
                  { id: 'activity', name: 'Recent Activity', icon: '📝' },
                  { id: 'preferences', name: 'Preferences', icon: '⚙️' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {isEditing ? (
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={editForm.firstName}
                            onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={editForm.lastName}
                            onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <input
                          type="number"
                          value={editForm.age}
                          onChange={(e) => setEditForm({...editForm, age: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          value={editForm.bio}
                          onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Full Name:</span>
                            <span className="font-medium">{user?.firstName || userProfile?.first_name} {user?.lastName || userProfile?.last_name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Age:</span>
                            <span className="font-medium">{user?.age || userProfile?.age} years old</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{user?.email || userProfile?.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Member since:</span>
                            <span className="font-medium">{formatDate(user?.joinDate || userProfile?.join_date)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Gaming Stats</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Reviews:</span>
                            <span className="font-medium">{userProfile?.stats?.reviews || fallbackData.userProfile.stats.reviews}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Favorites:</span>
                            <span className="font-medium">{userProfile?.stats?.favorites || fallbackData.userProfile.stats.favorites}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Average Rating:</span>
                            <span className="font-medium">4.8 ⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProfile?.achievements || fallbackData.userProfile.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          {achievement.unlocked && (
                            <p className="text-xs text-green-600 mt-1">
                              Unlocked {formatDate(achievement.unlockedDate)}
                            </p>
                          )}
                          {!achievement.unlocked && achievement.progress && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}/10</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${(achievement.progress / 10) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Recent Activity Tab */}
              {activeTab === 'activity' && (
                <div className="space-y-4">
                  {userProfile?.recentActivity || fallbackData.userProfile.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Favorite Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile?.preferences?.favoriteCategories || fallbackData.userProfile.preferences.favoriteCategories.map((category) => (
                        <span
                          key={category}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Preferred Platforms</h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile?.preferences?.platforms || fallbackData.userProfile.preferences.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Notification Settings</h3>
                    <div className="space-y-3">
                      {Object.entries(userProfile?.preferences?.notifications || fallbackData.userProfile.preferences.notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-700 capitalize">{key} notifications</span>
                          <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                            value ? 'bg-blue-600' : 'bg-gray-300'
                          }`}>
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile; 