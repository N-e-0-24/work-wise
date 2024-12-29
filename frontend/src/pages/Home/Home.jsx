import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Menu, X } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900">
     {/* Navbar */}
     <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
               src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TripEase
            </span>
          </a>
{/* Desktop Navigation - Centered */}
<div className="hidden md:flex md:items-center md:space-x-4 md:mx-auto">
  <button
    onClick={() => navigate("/book-ticket")}
    className="border border-gray-900 dark:border-white text-gray-900 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-500 px-3 py-1 rounded-md text-sm font-medium transition-colors bg-transparent whitespace-nowrap"
  >
    Book a Ticket
  </button>
  <button
    onClick={() => navigate("/my-bookings")}
    className="border border-gray-900 dark:border-white text-gray-900 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-500 px-3 py-1 rounded-md text-sm font-medium transition-colors bg-transparent whitespace-nowrap"
  >
    My Bookings
  </button>
  <button
    onClick={() => navigate("/profile")}
    className="border border-gray-900 dark:border-white text-gray-900 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-500 px-3 py-1 rounded-md text-sm font-medium transition-colors bg-transparent whitespace-nowrap"
  >
    My Profile
  </button>
</div>



          {/* Logout Button - Right aligned */}
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-blue-700 dark:text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  navigate("/book-ticket");
                  setIsMenuOpen(false);
                }}
                className="text-gray-900 hover:text-emerald-600 w-full text-left px-3 py-2 rounded-md text-base font-medium dark:text-white dark:hover:text-emerald-500 transition-colors"
              >
                Book a Ticket
              </button>
              <button
                onClick={() => {
                  navigate("/my-bookings");
                  setIsMenuOpen(false);
                }}
                className="text-gray-900 hover:text-emerald-600 w-full text-left px-3 py-2 rounded-md text-base font-medium dark:text-white dark:hover:text-emerald-500 transition-colors"
              >
                My Bookings
              </button>
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsMenuOpen(false);
                }}
                className="text-gray-900 hover:text-emerald-600 w-full text-left px-3 py-2 rounded-md text-base font-medium dark:text-white dark:hover:text-emerald-500 transition-colors"
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-blue-700 text-white w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative">
  <div className="absolute inset-0">
    <img
      src="https://www.wallpaperflare.com/search?wallpaper=sea+forest+island+water"
      alt="Travel background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gray-900/50 mix-blend-multiply" />
  </div>

  <div className="relative  max-w-7xl  mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
    <h1 className="text-4xl text-start font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
      Discover Your Next Adventure
    </h1>
    <p className="mt-6 text-xl text-gray-300 max-w-3xl">
      Experience seamless travel booking with TripEase. Whether you're planning a weekend getaway or an extended vacation, we've got you covered with the best deals and destinations worldwide.
    </p>
    <div className="mt-10">
      <button
        onClick={() => navigate("/book-ticket")}
        className="inline-flex items-center px-6 py-3 border text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 transition-colors w-auto"
      >
        Start Booking Now
      </button>
    </div>
  </div>
</div>


      {/* Features Section */}
      <div className="bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-white">Easy Booking</h3>
              <p className="mt-2 text-gray-400">
                Book your tickets in just a few clicks with our intuitive interface.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-white">Best Prices</h3>
              <p className="mt-2 text-gray-400">
                Get access to exclusive deals and competitive prices on all bookings.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-white">24/7 Support</h3>
              <p className="mt-2 text-gray-400">
                Our customer support team is always ready to help you with any queries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
