import React, { useState, useEffect } from "react";
import apiFetch from "../../fetchRequestBuilder/apifetch";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiFetch("profile");
        setProfile(data.user);
      } catch (error) {
        setError("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col lg:flex-row">
      {/* Left Section: Profile Details */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <h1 className="text-4xl font-extrabold text-white mb-6">User Profile</h1>
        {loading ? (
          <p className="text-lg text-gray-400 animate-pulse">Loading your profile...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : profile ? (
          <div className="space-y-8">
            <div className="flex items-center bg-gray-700 rounded-lg p-6 shadow-md">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{profile.name.charAt(0)}</span>
              </div>
              <div className="ml-6">
                <p className="text-2xl text-white font-semibold">{profile.name}</p>
                <p className="text-gray-400 text-sm">Your Name</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg p-6 shadow-md">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">@</span>
              </div>
              <div className="ml-6">
                <p className="text-2xl text-white font-semibold">{profile.email}</p>
                <p className="text-gray-400 text-sm">Email Address</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-lg">No profile found.</p>
        )}
        <button
          onClick={() => navigate("/")}
          className="mt-10 inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Back to Homepage
        </button>
      </div>

      {/* Right Section: Decorative Panel */}
      <div className="w-full lg:w-1/2 relative">
        <img
          src="https://source.unsplash.com/900x1200/?abstract,technology"
          alt="Decorative Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h2 className="text-5xl font-extrabold mb-4">Welcome Back!</h2>
            <p className="text-lg text-gray-300">
              Explore and manage your profile information effortlessly. Let’s make your journey seamless and enjoyable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
