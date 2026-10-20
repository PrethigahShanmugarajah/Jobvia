// Jobvia / Client / src / pages / Home / Components / CandidateCard.jsx
import "../Styles/Candidate.css";
import React from "react";
import { CheckCircle, Target } from "lucide-react";

const CandidateCard = ({
  card,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <div
      className="relative group candidate-card"
      onMouseEnter={() => handleMouseEnter(card.id)}
      onMouseLeave={handleMouseLeave}
    >
      {/* -------- Glow Effect -------- */}
      <div
        className={`absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${card.colors.accent}/20`}
      ></div>

      {/* -------- Flip-card Container -------- */}
      <div
        className={`relative cursor-pointer flip-card h-64 sm:h-72 md:h-80 lg:h-96 ${
          isHovered ? "flip-card-hovered" : ""
        }`}
      >
        {/* -------- Front -------- */}
        <div
          className={`absolute inset-0 flip-card-face rounded-3xl p-2 sm:p-6 md:p-6 lg:p-6 flex flex-col justify-between border-2 border-white/40 shadow-2xl overflow-hidden bg-linear-to-br ${card.colors.front}`}
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
          </div>

          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                {React.cloneElement(card.icon, {
                  className: "w-6 h-6 text-white",
                })}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">
                {card.title}
              </h3>

              <p className="text-white/90 text-sm sm:text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>

          <div className="relative mt-4 p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/20">
                {card.statIcon}
              </div>

              <div className="flex-1">
                <span className="text-sm font-medium text-white">
                  {card.stats}
                </span>

                <div className="w-full h-1 bg-white/20 rounded-full mt-2">
                  <div
                    className={`h-full rounded-full w-3/4 ${card.colors.accent}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -------- Back -------- */}
        <div
          className={`absolute inset-0 flip-card-face flip-card-back rounded-3xl p-5 sm:p-6 md:p-6 lg:p-6 flex flex-col justify-center border-2 border-white/40 shadow-2xl overflow-hidden bg-linear-to-br ${card.colors.back}`}
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="relative space-y-6">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <div className={`p-2 rounded-full ${card.colors.accent}`}>
                  <Target className="w-5 h-5 text-white" />
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Key Strengths
                </h4>
              </div>
              <div className="w-20 h-1 bg-white/30 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-3 max-w-xs mx-auto">
              {card.points.map((point) => (
                <div
                  key={point.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="shrink-0 p-2 rounded-lg bg-white/20">
                    {React.cloneElement(point.icon, {
                      className: "w-4 h-4 text-white",
                    })}
                  </div>

                  <span className="text-white font-medium text-sm flex-1 text-center">
                    {point.text}
                  </span>
                  <CheckCircle className="w-4 h-4 text-white/60 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* -------- Edge Border -------- */}
      <div className="absolute inset-0 rounded-3xl border-2 border-white/20 pointer-events-none" />
    </div>
  );
};

export default CandidateCard;
