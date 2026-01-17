import React from "react";
import { motion } from "framer-motion";
const Jobs = ({ result }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div>
        <h3 className="text-lg font-bold mt-2 flex items-center justify-center">
          {result.length} jobs
        </h3>
      </div>
      <section className="space-y-6 mt-6">{result}</section>
    </motion.div>
  );
};

export default Jobs;
