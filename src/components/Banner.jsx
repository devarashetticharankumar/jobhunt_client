// /* eslint-disable react/prop-types */

// import React from "react";
// import { FiMapPin, FiSearch } from "react-icons/fi";
// import { motion } from "framer-motion";

// const fadeIn = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0 },
// };

// const Banner = ({
//   query,
//   handleInputChange,
//   location,
//   handleSearchByLocation,
//   handleSearch,
// }) => {
//   return (
//     <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20">
//       <motion.h1
//         className="text-5xl font-bold text-primary py-1"
//         variants={fadeIn}
//         initial="hidden"
//         animate="visible"
//         transition={{ duration: 0.8 }}
//       >
//         Find your <span className="text-blue">new job</span> today
//       </motion.h1>
//       <motion.p
//         className="text-lg text-black/70 mb-8"
//         variants={fadeIn}
//         initial="hidden"
//         animate="visible"
//         transition={{ duration: 0.8, delay: 0.2 }}
//       >
//         Thousands of jobs in the computer, engineering and technology sectors
//         are waiting for you.
//       </motion.p>

//       <form onSubmit={handleSearch}>
//         <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
//           <motion.div
//             className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full"
//             variants={fadeIn}
//             initial="hidden"
//             animate="visible"
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <input
//               type="text"
//               name="title"
//               id="title"
//               value={query}
//               onChange={handleInputChange}
//               placeholder="What position are you looking for?"
//               className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
//             />
//             <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
//           </motion.div>
//           <motion.div
//             className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full"
//             variants={fadeIn}
//             initial="hidden"
//             animate="visible"
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             <input
//               type="text"
//               name="location"
//               id="location"
//               value={location}
//               onChange={handleSearchByLocation}
//               placeholder="Location"
//               className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
//             />
//             <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
//           </motion.div>
//           <motion.button
//             type="submit"
//             className="bg-blue hover:bg-indigo-700 py-2 px-8 text-white md:rounded-s-none rounded"
//             variants={fadeIn}
//             initial="hidden"
//             animate="visible"
//             transition={{ duration: 0.8, delay: 0.8 }}
//           >
//             Search
//           </motion.button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Banner;

/* eslint-disable react/prop-types */

/* eslint-disable react/prop-types */

import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Banner = ({
  query,
  handleInputChange,
  location,
  handleSearchByLocation,
  handleSearch,
}) => {
  const { scrollY } = useScroll();

  // Adjust these values as needed
  const opacity1 = useTransform(scrollY, [0, 200], [1, 0]);
  const opacity2 = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20">
      <motion.h1
        className="text-5xl font-bold text-primary pt-8"
        style={{ opacity: opacity1 }}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
      >
        Find your <span className="text-blue">new job</span> today
      </motion.h1>
      <motion.p
        className="text-lg text-black/70 mb-8"
        style={{ opacity: opacity2 }}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Thousands of jobs in the computer, engineering and technology sectors
        are waiting for you.
      </motion.p>

      <form onSubmit={handleSearch}>
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
          <motion.div
            className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <input
              type="text"
              name="title"
              id="title"
              value={query}
              onChange={handleInputChange}
              placeholder="What position are you looking for?"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
            />
            <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
          </motion.div>
          <motion.div
            className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <input
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={handleSearchByLocation}
              placeholder="Location"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
            />
            <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
          </motion.div>
          <motion.button
            type="submit"
            className="bg-blue hover:bg-indigo-700 py-2 px-8 text-white md:rounded-s-none rounded"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Search
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
