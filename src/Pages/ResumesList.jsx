import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";

const ResumesList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(`${API_URL}/resume/all-resumes`);
        const data = await response.json();
        setResumes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resumes:", error);
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (loading) {
    return <p>Loading resumes...</p>;
  }

  return (
    <div>
      <h2>Resumes</h2>
      <ul>
        {resumes.map((resume) => (
          <li key={resume._id}>
            <h3>{resume.firstName}</h3>
            <p>{resume.email}</p>
            {/* You can add more fields based on your resume schema */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumesList;
