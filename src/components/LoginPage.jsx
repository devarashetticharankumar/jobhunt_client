import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../data/apiPath";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        navigate("/my-job", {
          state: {
            email: email,
          },
        });
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center m-auto bg-gray-50 dark:bg-gray-900 bg-img-login transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-8 pt-8 pb-8 mb-4 w-full max-w-md border border-gray-100 dark:border-gray-700 mx-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
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
              type="password"
              id="password"
              value={password}
              placeholder="••••••••"
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
            />
          </div>
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
              <strong>{error}</strong>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Login
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Don't have an account? </span>
            <Link to={"/sign-up"} className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
