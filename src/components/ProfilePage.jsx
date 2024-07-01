// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`http://localhost:3000/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUserProfile();
//   }, []);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <div>
//         {/* <img src={user.profilePicture} alt={user.name} /> */}
//         <h3>name{user.name}</h3>
//         <p>email{user.email}</p>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="bg-white shadow-md rounded p-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
