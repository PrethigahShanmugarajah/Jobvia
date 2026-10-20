// Jobvia / Client / src / pages / Home / Components / Candidate.jsx
import "../Styles/Candidate.css";
import { useState } from "react";
import { cardData } from "../Data/candidateCardData";
import CandidateCard from "./CandidateCard";
import { ArrowRight, Mail } from "lucide-react";

const Candidate = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30 p-4 md:p-8 font-sans overflow-hidden">
      <div className="max-w-7xl font-mono mx-auto relative z-10">
        <header className="text-center mb-10 pt-6 md:pt-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-30 animate-pulse" />

              <h1 className="relative text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-800">
                Our{" "}
                <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Candidates
                </span>
              </h1>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            Discover exceptional talent across four dynamic categories.
          </p>
        </header>

        {/* -------- Flip Card -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-10 px-2 md:px-4">
          {cardData.map((card) => (
            <CandidateCard
              key={card.id}
              card={card}
              isHovered={hoveredCard === card.id}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="h-px w-16 bg-linear-to-r from-transparent via-blue-300 to-transparent"></div>
          <div className="mx-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          </div>

          <div className="h-px w-16 bg-linear-to-r from-transparent via-cyan-300 to-transparent"></div>
        </div>

        <footer className="text-center py-8 md:py-12">
          <button className="group cursor-pointer relative overflow-hidden px-8 md:px-10 py-3 md:py-4 bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-full font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 inline-block">
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="relative flex items-center justify-center gap-3 md:gap-4">
              <div className="p-2 rounded-full bg-white/20">
                <Mail className="w-5 h-5" />
              </div>

              <span className="tracking-wide">Contact Recruitment Team</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Candidate;
