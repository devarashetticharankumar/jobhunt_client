// import React from "react";

// const PageHeader = ({ title, path }) => {
//   return (
//     <div className="py-14 mt-3 bg-[#FAFAFA] flex items-center justify-center rounded">
//       <div>
//         <h2 className=" text-3xl font-medium mb-1 text-center text-blue rounded-sm">
//           {title}
//         </h2>
//         <p className="text-sm text-center">
//           <a href="/">Home</a>/{path}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PageHeader;

import React from "react";

const PageHeader = ({ title, path }) => {
  return (
    <div className="py-14 mt-3 bg-gradient-to-r from-blue to-purple-600 flex items-center justify-center rounded-lg shadow-lg">
      <div className="text-white text-center">
        <h2 className="text-4xl font-bold mb-2">{title}</h2>
        <p className="text-sm opacity-80">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          / {path}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
