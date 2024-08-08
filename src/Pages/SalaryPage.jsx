import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { motion } from "framer-motion";

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [salary, setSalary] = useState([]);

  useEffect(() => {
    fetch("salary.json").then((res) =>
      res.json().then((data) => setSalary(data))
    );
  }, [searchText]);

  const handleSearch = () => {
    const filter = salary.filter(
      (job) => job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    console.log(filter);
    setSalary(filter);
  };

  return (
    <motion.div
      className="max-w-screen-2xl container mx-auto xl:px-24 px-4 "
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <PageHeader title={"Estimated Salary"} path={"Salary"} />

      <motion.div
        className="mt-5 "
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeIn", delay: 0.2 }}
      >
        <div className="search-box p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-blue text-white font-semibold py-2 rounded-sm px-8  mb-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </motion.div>
      {/* salary dissplay card */}
      <motion.div
        className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeIn", delay: 0.4 }}
      >
        {salary.map((data) => {
          return (
            <div key={data.id} className="shadow px-4 py-8">
              <h4 className="font-semibold text-xl">{data.title}</h4>
              <p className="my-2 font-medium text-blue text-lg">
                {data.salary}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/" className="underline">
                  {data.status}
                </a>
                <a href="/" className="underline">
                  {data.skills}
                </a>
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default SalaryPage;
