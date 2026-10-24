import "../Styles/Banner.css";
import { useBannerService } from "../Services/BannerServices";
import {
  ArrowRight,
  Backpack,
  Briefcase,
  ChevronRight,
  CircleChevronRight,
  PlayCircle,
} from "lucide-react";
import { jobs } from "../Data/bannerJobs";
import FeaturedJobCard from "./FeaturedJobCard";
import BannerVideoModal from "./BannerVideoModal";

const Banner = () => {
  const {
    canvasRef,
    videoRef,
    closeBtnRef,
    showVideo,
    setShowVideo,
    isXL,
    lottieSize,
    DEMO_VIDEO_URL,
    navigate,
    CURRENCY,
  } = useBannerService();

  return (
    <div className="relative font-mono min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 md:gap-10 items-center">
            {/* -------- Left Side --------  */}
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-200 animate-pulse">
                <Backpack className="w-4 h-4 text-yellow-500" />

                <span className="text-sm sm:text-sm font-medium bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  10,000+ Jobs Available Now
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="block bg-linear-to-r from-blue-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent">
                  Find Your
                </span>

                <span className="relative inline-block">
                  <span className="relative bg-linear-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
                    Dream Job
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-linear-to-r from-blue-400 to-indigo-500 rounded-full blur-sm opacity-70"></span>
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed animate-fade-in-up">
                Join{" "}
                <span className="font-semibold text-indigo-600">50,000+</span>{" "}
                professionals who found their perfect career match through our
                advanced AI-Powered jobvia.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={() => navigate("/jobs")}
                  className="group cursor-pointer relative px-5 sm:px-7 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-semibold overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative flex items-center gap-2 sm:gap-3">
                    <span className="text-sm sm:text-base">Find Jobs Now</span>

                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>

                  <div className="absolute -inset-1 bg-linear-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                </button>

                <button
                  onClick={() => setShowVideo(true)}
                  className="group cursor-pointer px-4 sm:px-6 py-3 sm:py-4 bg-white/90 backdrop-blur-sm text-gray-800 rounded-2xl font-semibold shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 sm:gap-3"
                >
                  <PlayCircle className="w-5 h-5 text-indigo-600" />

                  <span className="text-sm sm:text-base">Watch Demo</span>

                  <CircleChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* -------- Right Side --------  */}
            <div className="relative pb-4">
              <div
                className={`relative transform-gpu transition-transform duration-700 perspective-1000 ${
                  isXL ? "hover:rotate-y-12 rotate-0" : "rotate-0"
                }`}
              >
                <div className="relative bg-linear-to-br from-white to-gray-50 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-800">
                          Featured Jobs
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-500">
                          Updated daily
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {jobs.map((job, index) => (
                      <FeaturedJobCard
                        key={index}
                        job={job}
                        lottieSize={lottieSize}
                        CURRENCY={CURRENCY}
                      />
                    ))}
                  </div>

                  <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => navigate("/jobs")}
                      className="w-full py-2.5 sm:py-3 bg-linear-to-r from-blue-50 to-indigo-50 text-indigo-600 rounded-full cursor-pointer font-medium hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span className="text-sm sm:text-base">
                        View All Jobs
                      </span>

                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------- Video Modal -------- */}
      {showVideo && (
        <BannerVideoModal
          videoRef={videoRef}
          closeBtnRef={closeBtnRef}
          setShowVideo={setShowVideo}
          DEMO_VIDEO_URL={DEMO_VIDEO_URL}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg
          className="relative w-full h-24 sm:h-32 lg:h-48"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current text-white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Banner;
