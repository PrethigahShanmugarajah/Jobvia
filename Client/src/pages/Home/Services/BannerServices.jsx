// Jobvia / Client / src / pages / Home / Services / BannerServices.jsx
import { useEffect, useRef, useState } from "react";
import { B1 } from "../../../assets/assets";
import { useAppContext } from "../../../context/appContext";

export const useBannerService = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const videoRef = useRef(null);
  const closeBtnRef = useRef(null);

  const [showVideo, setShowVideo] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1366,
  );

  const isXL = windowWidth >= 1280;
  const lottieSize = windowWidth < 640 ? 48 : windowWidth < 1024 ? 64 : 72;

  const DEMO_VIDEO_URL = B1;
  const { navigate, CURRENCY } = useAppContext();

  /* -------- Handle window resize -------- */
  useEffect(() => {
    let timeout = null;

    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setWindowWidth(window.innerWidth), 80);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timeout);
    };
  }, []);

  /* -------- Handle canvas particles -------- */
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let animationActive = true;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(canvas.offsetWidth * dpr);
      canvas.height = Math.round(canvas.offsetHeight * dpr);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const particleCount =
        window.innerWidth < 640 ? 28 : window.innerWidth < 1024 ? 50 : 80;

      if (particlesRef.current.length !== particleCount) {
        class Particle {
          constructor() {
            this.reset();
          }

          reset() {
            this.x = Math.random() * canvas.offsetWidth;
            this.y = Math.random() * canvas.offsetHeight;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.08})`;
            this.waveOffset = Math.random() * Math.PI * 2;
          }

          update() {
            const time = Date.now() * 0.001;

            this.x += this.speedX + Math.sin(time + this.waveOffset) * 0.3;
            this.y += this.speedY + Math.cos(time + this.waveOffset) * 0.3;

            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;

            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
          }

          draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
          }
        }

        particlesRef.current = Array.from(
          { length: particleCount },
          () => new Particle(),
        );
      }
    };

    const animate = () => {
      if (!animationActive) {
        return;
      }

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.offsetWidth,
        canvas.offsetHeight,
      );

      gradient.addColorStop(0, "rgba(224, 231, 255, 0.08)");
      gradient.addColorStop(1, "rgba(199, 210, 254, 0.04)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 90) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - distance / 90)})`;
            ctx.lineWidth = 0.45;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      animationActive = false;
      window.removeEventListener("resize", resizeCanvas);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  /* -------- Handle video modal -------- */
  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = "hidden";

      const timeout = setTimeout(() => closeBtnRef.current?.focus(), 80);

      return () => {
        clearTimeout(timeout);
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";

    const video = videoRef.current;

    if (video) {
      try {
        video.pause();
        video.currentTime = 0;
      } catch {
        // Ignore video reset errors.
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showVideo]);

  /* -------- Handle Escape key -------- */
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && showVideo) {
        setShowVideo(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showVideo]);

  return {
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
  };
};
