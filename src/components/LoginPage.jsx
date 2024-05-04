import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config";

import { getAuth } from "firebase/auth";

const LoginPage = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="h-screen w-full items-center justify-center flex">
      <button
        className="px-8 py-2 bg-blue text-white text-semibold rounded-sm"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
