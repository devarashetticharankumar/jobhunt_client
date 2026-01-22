import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../data/apiPath";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        const response = await axios.post(`${API_URL}/users/register`, {
          name,
          email,
          password,
        });
        if (response.status === 200) {
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setError(null);
          window.location.href = "/login";
        } else {
          setError("Failed to register");
        }

        if (response.data.status === "false") {
          setError(response.data.message);
        } else {
          // Handle successful registration
          // You can redirect the user to the login page or show a success message
          console.log("user registered successfully!!");
        }
      } catch (error) {
        setError("Error registering user. Please try again later.");
      }
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 dark:bg-gray-900 bg-img transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-8 pt-8 pb-8 mb-4 w-full max-w-md border border-gray-100 dark:border-gray-700 mx-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
              id="name"
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
              id="email"
              type="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
              id="password"
              type="password"
              value={password}
              placeholder="At least 6 characters"
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 mt-2"
            type="submit"
          >
            Create Account
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Already have an account? </span>
            <Link to={"/login"} className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
