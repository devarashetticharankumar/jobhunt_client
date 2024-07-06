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
    <div className="flex h-screen justify-center items-center bg-img">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FAFAFA] shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-2xl mb-4 flex items-center justify-center text-blue">
          Register
        </h1>
        <label
          className="block text-gray-700 text-sm font-bold mt-2"
          htmlFor="name"
        >
          User name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(event) => setName(event.target.value)}
          required
        />
        <label
          className="block text-gray-700 text-sm font-bold mt-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          value={email}
          placeholder="example@gamil.com"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label
          className="block text-gray-700 text-sm font-bold mt-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={password}
          placeholder="min 6 Chatacters"
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />
        <label
          className="block text-gray-700 text-sm font-bold mt-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm the above password"
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
          type="submit"
        >
          Register
        </button>
        <br></br>
        <small className="mx-5 my-2 flex items-center justify-center">
          Already have an Account?
          <Link to={"/login"}>
            <span className="text-blue underline">Login</span>
          </Link>
        </small>
      </form>
    </div>
  );
};

export default RegisterUser;
