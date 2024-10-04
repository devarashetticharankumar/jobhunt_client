// // import React, { useState } from "react";
// // import { Link, NavLink } from "react-router-dom";
// // import { useAuth0 } from "@auth0/auth0-react";

// // import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
// // const Navbar = () => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const { loginWithRedirect } = useAuth0();
// //   const { logout } = useAuth0();
// //   const { user, isAuthenticated, isLoading } = useAuth0();

// //   const handleMenuToggler = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   const navItems = [
// //     {
// //       path: "/",
// //       title: "Start a search",
// //     },
// //     {
// //       path: "/my-job",
// //       title: "My Jobs",
// //     },
// //     {
// //       path: "/salary",
// //       title: "Salary Estimate",
// //     },
// //     {
// //       path: "/post-job",
// //       title: "Post a Job",
// //     },
// //   ];
// //   return (
// //     <header className="max-w-screen-2xl container mx-auto xl:px-24 px-3 sticky top-0 left-0 z-10 bg-transparent  backdrop-blur-xl ">
// //       <nav className="flex justify-between items-center py-6 ">
// //         <a href="/" className="flex items-center gap-1 text-2xl text-black-500">
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             width="45"
// //             height="46"
// //             viewBox="0 0 45 46"
// //             fill="none"
// //           >
// //             <path
// //               d="M35.6392 17.6831C37.1506 17.9768 37.7772 19.7964 36.7673 20.9584L21.9962 37.953C20.9862 39.115 19.097 38.7479 18.5957 37.2923L11.2635 16.0029C10.7621 14.5472 12.0246 13.0946 13.536 13.3883L35.6392 17.6831Z"
// //               fill="#8B94E7"
// //             />
// //             <path
// //               d="M9.10566 15.7428C8.33756 14.4085 9.30193 12.7431 10.8415 12.745L33.3582 12.7737C34.8978 12.7756 35.8579 14.4435 35.0864 15.7759L23.8033 35.2615C23.0318 36.5939 21.1073 36.5914 20.3392 35.2571L9.10566 15.7428Z"
// //               fill="#2D42FF"
// //             />
// //           </svg>
// //           <span className="logo font-ChakraPetch font-semibold">JobHunt</span>
// //           {/* <img src={logo} alt="" className="w-2/4 " /> */}
// //         </a>

// //         {/* nav items for large devices */}
// //         <ul className="hidden md:flex gap-12">
// //           {navItems.map(({ path, title }) => (
// //             <li key={path} className="text-base text-primary">
// //               <NavLink
// //                 to={path}
// //                 className={({ isActive }) => (isActive ? "active" : "")}
// //               >
// //                 {title}
// //               </NavLink>
// //             </li>
// //           ))}
// //         </ul>

// //         {/* signup and login btn */}
// //         <div className="text-base text-primary font-medium space-x-5 hidden lg:flex items-center">
// //           {/* <Link
// //             to="/sign-up"
// //             className="py-2 px-5 border rounded bg-blue hover:bg-indigo-700 text-white"
// //           >
// //             Sign up
// //           </Link> */}

// //           {isAuthenticated && (
// //             <img
// //               src={user.picture}
// //               alt={user.name}
// //               className="w-9 h-9 rounded-full border-blue outline outline-offset-2 outline-1 outline-blue"
// //             />
// //           )}

// //           {isAuthenticated ? (
// //             <button
// //               onClick={() =>
// //                 logout({ logoutParams: { returnTo: window.location.origin } })
// //               }
// //               className="py-2 px-5 border rounded bg-blue hover:bg-indigo-700 text-white"
// //             >
// //               Log Out
// //             </button>
// //           ) : (
// //             <button
// //               onClick={() => loginWithRedirect()}
// //               className="py-2 px-5 border rounded bg-blue hover:bg-indigo-700 text-white"
// //             >
// //               Log In
// //             </button>
// //           )}
// //         </div>

// //         {/* mobile menu */}

// //         <div className="md:hidden block ">
// //           <button onClick={handleMenuToggler}>
// //             {isMenuOpen ? (
// //               <FaXmark className="w-4 h-5 texy-primary" />
// //             ) : (
// //               <FaBarsStaggered className="w-4 h-5 texy-primary" />
// //             )}
// //           </button>
// //         </div>
// //       </nav>

// //       {/* navItems for mobile */}
// //       <div
// //         className={`px-4 bg-[#1a1a1a] py-5 rounded-sm ${
// //           isMenuOpen ? "" : "hidden"
// //         } `}
// //       >
// //         <ul>
// //           {navItems.map(({ path, title }) => (
// //             <li
// //               key={path}
// //               className="text-base text-white first:text-white py-1 my-3"
// //             >
// //               <NavLink
// //                 to={path}
// //                 className={({ isActive }) => (isActive ? "active" : "")}
// //               >
// //                 {title}
// //               </NavLink>
// //             </li>
// //           ))}
// //           <li className="text-white py-1">
// //             {isAuthenticated ? (
// //               <button
// //                 onClick={() =>
// //                   logout({ logoutParams: { returnTo: window.location.origin } })
// //                 }
// //               >
// //                 Log Out
// //               </button>
// //             ) : (
// //               <button onClick={() => loginWithRedirect()}>Log In</button>
// //             )}
// //           </li>
// //         </ul>
// //       </div>
// //     </header>
// //   );
// // };

// import React, { useState, useEffect, useRef } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const prevScrollPos = useRef(window.scrollY);
//   const menuRef = useRef(null);
//   const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

//   const handleMenuToggler = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleScroll = () => {
//     const currentScrollPos = window.scrollY;
//     if (prevScrollPos.current > currentScrollPos) {
//       setIsMenuOpen(false); // Close menu when scrolling up
//     }
//     prevScrollPos.current = currentScrollPos;
//   };

//   const handleClickOutside = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setIsMenuOpen(false); // Close menu when clicking outside
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const navItems = [
//     { path: "/", title: "Start a search" },
//     { path: "/my-job", title: "My Jobs" },
//     { path: "/salary", title: "Salary Estimate" },
//     { path: "/post-job", title: "Post a Job" },
//   ];

//   return (
//     <header className="max-w-screen-2xl container mx-auto xl:px-24 px-3 sticky top-0 left-0 z-10 bg-transparent backdrop-blur-xl">
//       <nav className="flex justify-between items-center py-6">
//         <a href="/" className="flex items-center gap-1 text-2xl text-black-500">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="45"
//             height="46"
//             viewBox="0 0 45 46"
//             fill="none"
//           >
//             <path
//               d="M35.6392 17.6831C37.1506 17.9768 37.7772 19.7964 36.7673 20.9584L21.9962 37.953C20.9862 39.115 19.097 38.7479 18.5957 37.2923L11.2635 16.0029C10.7621 14.5472 12.0246 13.0946 13.536 13.3883L35.6392 17.6831Z"
//               fill="#8B94E7"
//             />
//             <path
//               d="M9.10566 15.7428C8.33756 14.4085 9.30193 12.7431 10.8415 12.745L33.3582 12.7737C34.8978 12.7756 35.8579 14.4435 35.0864 15.7759L23.8033 35.2615C23.0318 36.5939 21.1073 36.5914 20.3392 35.2571L9.10566 15.7428Z"
//               fill="#2D42FF"
//             />
//           </svg>
//           <span className="logo font-ChakraPetch font-semibold">JobHunt</span>
//         </a>

//         {/* nav items for large devices */}
//         <ul className="hidden md:flex gap-12">
//           {navItems.map(({ path, title }) => (
//             <li key={path} className="text-base text-primary">
//               <NavLink
//                 to={path}
//                 className={({ isActive }) => (isActive ? "active" : "")}
//               >
//                 {title}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* signup and login btn */}
//         <div className="text-base text-primary font-medium space-x-5 hidden lg:flex items-center">
//           {isAuthenticated && (
//             <img
//               src={user.picture}
//               alt={user.name}
//               className="w-9 h-9 rounded-full border-blue outline outline-offset-2 outline-1 outline-blue"
//             />
//           )}

//           {isAuthenticated ? (
//             <button
//               onClick={() =>
//                 logout({ logoutParams: { returnTo: window.location.origin } })
//               }
//               className="py-2 px-5 border rounded bg-blue hover:bg-indigo-700 text-white"
//             >
//               Log Out
//             </button>
//           ) : (
//             <button
//               onClick={() => loginWithRedirect()}
//               className="py-2 px-5 border rounded bg-blue hover:bg-indigo-700 text-white"
//             >
//               Log In
//             </button>
//           )}
//         </div>

//         {/* mobile menu */}
//         <div className="md:hidden block">
//           <button onClick={handleMenuToggler}>
//             {isMenuOpen ? (
//               <FaXmark className="w-4 h-5 text-primary" />
//             ) : (
//               <FaBarsStaggered className="w-4 h-5 text-primary" />
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* navItems for mobile */}
//       <div
//         ref={menuRef}
//         className={`px-4 bg-[#1a1a1a] py-5 rounded-sm ${
//           isMenuOpen ? "" : "hidden"
//         } `}
//       >
//         <ul>
//           {navItems.map(({ path, title }) => (
//             <li
//               key={path}
//               className="text-base text-white first:text-white py-1 my-3"
//             >
//               <NavLink
//                 to={path}
//                 className={({ isActive }) => (isActive ? "active" : "")}
//               >
//                 {title}
//               </NavLink>
//             </li>
//           ))}
//           <li className="text-white py-1">
//             {isAuthenticated ? (
//               <button
//                 onClick={() =>
//                   logout({ logoutParams: { returnTo: window.location.origin } })
//                 }
//               >
//                 Log Out
//               </button>
//             ) : (
//               <button onClick={() => loginWithRedirect()}>Log In</button>
//             )}
//           </li>
//         </ul>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prevScrollPos = useRef(window.scrollY);
  const menuRef = useRef(null);
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (prevScrollPos.current > currentScrollPos) {
      setIsMenuOpen(false); // Close menu when scrolling up
    }
    prevScrollPos.current = currentScrollPos;
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false); // Close menu when clicking outside
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storeToken = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        localStorage.setItem("authToken", token);
      }
    };
    storeToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post a Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-3 sticky top-0 left-0 z-10 bg-[#FAFAFA] backdrop-blur-xl border-b-gray-200 border-2">
      <nav className="flex justify-between items-center py-4">
        <a href="/" className="flex items-center text-2xl text-black-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="46"
            viewBox="0 0 45 46"
            fill="none"
          >
            <path
              d="M35.6392 17.6831C37.1506 17.9768 37.7772 19.7964 36.7673 20.9584L21.9962 37.953C20.9862 39.115 19.097 38.7479 18.5957 37.2923L11.2635 16.0029C10.7621 14.5472 12.0246 13.0946 13.536 13.3883L35.6392 17.6831Z"
              fill="#8B94E7"
            />
            <path
              d="M9.10566 15.7428C8.33756 14.4085 9.30193 12.7431 10.8415 12.745L33.3582 12.7737C34.8978 12.7756 35.8579 14.4435 35.0864 15.7759L23.8033 35.2615C23.0318 36.5939 21.1073 36.5914 20.3392 35.2571L9.10566 15.7428Z"
              fill="#2D42FF"
            />
          </svg>
          <span className="logo font-ChakraPetch font-semibold">
            Job<span className="text-blue">N</span>irvana
          </span>
        </a>

        {/* nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* signup and login btn */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:flex items-center">
          {isAuthenticated && (
            <img
              src={user.picture}
              alt={user.name}
              className="w-9 h-9 rounded-full border-blue outline outline-offset-2 outline-1 outline-blue"
            />
          )}

          {isAuthenticated ? (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="w-full bg-blue hover:bg-blue text-white font-bold py-3 px-4 rounded-md transition duration-300"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="w-full bg-blue hover:bg-blue text-white font-bold py-3 px-4 rounded-md transition duration-300"
            >
              Log In
            </button>
          )}
        </div>

        {/* mobile menu */}
        <div className="md:hidden block">
          <button type="button" onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* navItems for mobile */}
      <div
        ref={menuRef}
        className={`px-4 bg-[#1a1a1a] py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        } `}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1 my-3"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="text-white py-1">
            {isAuthenticated ? (
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            ) : (
              <button onClick={() => loginWithRedirect()}>Log In</button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
