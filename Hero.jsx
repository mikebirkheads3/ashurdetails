import { useEffect, useRef } from "react";

/**
 * Ashur Details — full-screen dark luxury car-detailing hero.
 * Self-contained: styles (Google Font, global reset, layout) are injected
 * via the <style> block below. Drop <Hero /> in and render it.
 */

const VIDEO_SRC =
  "https://cdn.sceneai.art/Hero%20section%20video%20file%20(2)/37091057-3719-4207-815c-745ebf57aeb4.mp4";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Resume playback, swallowing any autoplay-policy promise rejection.
    const resume = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    // Kick off immediately on mount.
    resume();

    // Re-assert playback on every event that could interrupt it.
    const mediaEvents = ["pause", "ended", "loadedmetadata", "canplay"];
    mediaEvents.forEach((evt) => video.addEventListener(evt, resume));

    // Tab re-focus.
    const onVisibility = () => {
      if (!document.hidden) resume();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // 1-second watchdog: resume whenever the video is paused.
    const watchdog = window.setInterval(() => {
      if (video.paused) resume();
    }, 1000);

    return () => {
      mediaEvents.forEach((evt) => video.removeEventListener(evt, resume));
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(watchdog);
    };
  }, []);

  return (
    <section className="hero">
      <style>{CSS}</style>

      <video
        ref={videoRef}
        className="hero__video"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="hero__overlay" />

      <nav className="hero__nav">
        <div className="hero__navlinks">
          <a href="#" className="is-active">
            Home
          </a>
          <a href="#">About</a>
          <a href="#">Cars</a>
          <a href="#">Contact</a>
        </div>

        <button type="button" className="hero__browse">
          Book It!<span className="hero__arrow">&rarr;</span>
        </button>
      </nav>

      <h1 className="hero__headline">ASHUR KING DETAILS</h1>

      <div className="hero__copy">
        <h2 className="hero__copy-title">Get Your Car Snazzy!</h2>
        <p className="hero__copy-text">
          Enjoy a premium detail experience with top pros, seamless booking, and
          honest pricing.
        </p>
        <button type="button" className="hero__discover">
          BOOK IT!<span className="hero__arrow">&#8599;</span>
        </button>
      </div>
    </section>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html, body { overflow-x: hidden; max-width: 100vw; }

.hero, .hero * {
  font-family: 'Archivo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.hero a { text-decoration: none; color: inherit; }
.hero a:hover { color: #fff; }

.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 720px;
  overflow: hidden;
  background: #0a0a0b;
}

/* ---- Background video ---- */
.hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
  pointer-events: none;
  z-index: 0;
}

/* ---- Legibility gradient ---- */
.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(8, 8, 10, 0.55) 0%,
    rgba(8, 8, 10, 0.15) 30%,
    rgba(8, 8, 10, 0.25) 55%,
    rgba(8, 8, 10, 0.92) 100%
  );
}

/* ---- Navbar ---- */
.hero__nav {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 34px 56px;
}

.hero__navlinks {
  display: flex;
  align-items: center;
  gap: 42px;
}

.hero__navlinks a {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
}

.hero__navlinks a.is-active {
  color: #fff;
  border-bottom: 2px solid #fff;
  padding-bottom: 3px;
}

.hero__browse {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #FAF9F5;
  font-size: 14px;
  font-weight: 600;
  padding: 11px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.hero__browse:hover { background: #e9e9ec; }

.hero__arrow { font-size: 15px; }

/* ---- Giant headline ---- */
.hero__headline {
  position: absolute;
  top: 92px;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 2;
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.03em;
  white-space: nowrap;
  font-size: 13.3vw;
  background: linear-gradient(180deg, #ffffff 55%, #b8b8bd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* ---- Bottom-left copy ---- */
.hero__copy {
  position: absolute;
  left: 56px;
  bottom: 56px;
  z-index: 3;
  max-width: 620px;
}

.hero__copy-title {
  color: #fff;
  font-weight: 600;
  font-size: clamp(38px, 5.8vw, 66px);
  line-height: 0.98;
  letter-spacing: -0.02em;
}

.hero__copy-text {
  color: rgba(255, 255, 255, 0.82);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  max-width: 480px;
  margin-top: 18px;
}

.hero__discover {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 32px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 13px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.hero__discover:hover {
  background: #fff;
  color: #0a0a0b;
  border-color: #fff;
}
`;
