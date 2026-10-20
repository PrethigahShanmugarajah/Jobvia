// Jobvia / Client / src / pages / Home / Components / LottieLogo.jsx
import "../Styles/LottieLogo.css";
import { useLottieLogoService } from "../Services/LottieLogoServices";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottieLogo = ({ src, size = 56, initials = "TV" }) => {
  const { containerRef, preview, playerReady, isUrl } =
    useLottieLogoService(src);

  return (
    <div className="logo-wrapper" data-size={size}>
      {preview && (
        <img
          src={preview}
          alt="preview"
          className={`logo-preview-img ${playerReady ? "is-ready" : ""}`}
        />
      )}

      <div
        aria-hidden
        className={`logo-blur-overlay ${playerReady ? "is-ready" : ""}`}
      />

      <div
        ref={containerRef}
        className={`logo-container ${playerReady ? "is-ready" : ""}`}
      >
        {isUrl ? (
          <DotLottieReact src={src} autoplay loop className="logo-animation" />
        ) : (
          <span className="logo-fallback-text">{initials}</span>
        )}
      </div>

      {!isUrl && <div className="logo-fallback-overlay">{initials}</div>}
    </div>
  );
};

export default LottieLogo;
