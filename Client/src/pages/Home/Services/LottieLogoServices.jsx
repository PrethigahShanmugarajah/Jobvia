// Jobvia / Client / src / pages / Home / Services / LottieLogoServices.jsx
import { useEffect, useRef, useState } from "react";

export const useLottieLogoService = (src) => {
  const containerRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [attemptedPreview, setAttemptedPreview] = useState(false);

  useEffect(() => {
    if (!src || !src.startsWith("http") || attemptedPreview) {
      return;
    }

    let cancelled = false;

    const tryPreview = async () => {
      try {
        const pngUrl = src.replace(/\.lottie(\?.*)?$/i, ".png");
        const response = await fetch(pngUrl, { method: "HEAD" });

        if (!cancelled && response.ok) {
          setPreview(pngUrl);
        }
      } catch (error) {
        console.error("Fetch Lottie Preview Error:", error);
      } finally {
        if (!cancelled) {
          setAttemptedPreview(true);
        }
      }
    };

    tryPreview();

    return () => {
      cancelled = true;
    };
  }, [src, attemptedPreview]);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    let observer;

    const checkReady = () => {
      if (element.children.length > 0) {
        setPlayerReady(true);
        return true;
      }

      return false;
    };

    if (!checkReady()) {
      observer = new MutationObserver(() => {
        if (checkReady()) {
          observer.disconnect();
        }
      });

      observer.observe(element, {
        childList: true,
        subtree: true,
      });

      const timeout = setTimeout(() => {
        setPlayerReady(true);
      }, 2500);

      return () => {
        clearTimeout(timeout);
        observer?.disconnect();
      };
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  const isUrl = typeof src === "string" && src.startsWith("http");

  return {
    containerRef,
    preview,
    playerReady,
    isUrl,
  };
};
