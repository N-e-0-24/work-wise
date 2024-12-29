import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../../fetchRequestBuilder/apifetch";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import "./styles.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = await apiFetch("/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      alert("Registration successful");
      if (data.token) {
        Cookies.set("jwtToken", data.token, { expires: 1, secure: true });
        navigate("/");
      }
    } catch (error) {
      alert(`Error signing up: ${error.message}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-lg w-full bg-gray-300 shadow-lg rounded-3xl p-8 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us and explore the best experience.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:from-pink-500 hover:to-indigo-600 transition-all duration-300 shadow-md"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? {" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-500 hover:text-indigo-700 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
