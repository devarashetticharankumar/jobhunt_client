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
    <div className="flex justify-center h-screen items-center m-auto bg-img-login">
      <div className="bg-[#FAFAFA] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl text-center mb-4 flex items-center justify-center text-blue">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mt-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(event) => setEmail(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mt-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="min 6 Chatacters"
              onChange={(event) => setPassword(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              <strong className="font-sm">{error}</strong>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login
          </button>
          <br></br>
          <small className="mx-5 my-2 flex items-center justify-center">
            {`Don't have an Account?`}
            <Link to={"/sign-up"}>
              <span className="text-blue underline">Register</span>
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
