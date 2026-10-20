// Jobvia / Client / src / pages / Home / Components / BannerVideoModal.jsx
import "../Styles/Banner.css";
import { X } from "lucide-react";

const BannerVideoModal = ({
  videoRef,
  closeBtnRef,
  setShowVideo,
  DEMO_VIDEO_URL,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowVideo(false)}
      />

      <div className="relative z-10 w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-4xl mx-auto">
        <button
          className="absolute cursor-pointer -top-6 right-0 md:-right-6 bg-white rounded-full p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          ref={closeBtnRef}
          onClick={() => setShowVideo(false)}
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
          <div className="relative modal-video-wrapper">
            <video
              ref={videoRef}
              src={DEMO_VIDEO_URL}
              controls
              autoPlay
              muted
              playsInline
              className="modal-video-container"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerVideoModal;
