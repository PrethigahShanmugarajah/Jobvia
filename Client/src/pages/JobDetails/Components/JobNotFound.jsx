// Jobvia / Client / src / pages / JobDetails / Components / JobNotFound.jsx
import "../Styles/JobDetails.css";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const JobNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-2xl text-center max-w-md mx-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
          Job not found
        </h2>

        <p className="text-gray-600 mb-6">
          The job you're looking for doesn't exist or has been removed.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back to job search
        </Link>
      </div>
    </div>
  );
};

export default JobNotFound;
