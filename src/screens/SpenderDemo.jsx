import React, { useEffect } from "react";

export default function SpenderDemo() {
  const year = new Date().getFullYear();

  useEffect(() => {
    document.body.style.cursor = "auto";
    const style = document.createElement("style");
    style.textContent = `* { cursor: auto !important; } a, button { cursor: pointer !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <style>{responsiveStyles}</style>
      <div style={styles.page}>
        <div style={styles.glowOrb1} />
        <div style={styles.glowOrb2} />

        <header style={styles.header}>
          <img
            src="/projects_img/spender_page/Theme1.png"
            alt="Spender Logo"
            style={styles.logo}
          />
          <p style={styles.subtitle}>
            Meet <span style={styles.accentText}>Spender</span>. Swipe your way
            to better spending.
          </p>
        </header>

        <div style={styles.container} className="spender-container">
          <section style={styles.instructions}>
            <h2 style={styles.sectionTitle}>How to Download the App</h2>

            <div style={styles.stepsContainer}>
              {[
                {
                  num: 1,
                  content: (
                    <>
                      Install <strong>Expo Go</strong> on your device
                    </>
                  ),
                },
                {
                  num: 2,
                  content: (
                    <>
                      Open the camera and scan the QR code below or&nbsp;
                      <a
                        href="https://expo.dev/preview/update?message=Minor+fixes&updateRuntimeVersion=1.0.0&createdAt=2025-11-29T15%3A30%3A42.269Z&slug=exp&projectId=e3a12fd3-502a-4fc2-8b29-47468781c59b&group=64f34df7-6495-4b97-8e2d-453349d26ff5"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                      >
                        Click here
                      </a>
                    </>
                  ),
                },
                {
                  num: 3,
                  content: (
                    <>
                      Register quickly with your phone.
                      <br />
                      <strong>Note: </strong>The OTP code is{" "}
                      <code style={styles.code}>123456</code>
                    </>
                  ),
                },
                {
                  num: 4,
                  content: <>Enjoy the live demo of Spender 🎉</>,
                },
              ].map((step) => (
                <div key={step.num} style={styles.stepBox} className="step-box">
                  <div style={styles.stepNumber}>{step.num}</div>
                  <p style={styles.stepText}>{step.content}</p>
                </div>
              ))}
            </div>

            <img
              src="/projects_img/spender_page/spender-update.svg"
              alt="QR Code"
              style={styles.qr}
            />
          </section>

          <section style={styles.heroSection}>
            <h2 style={styles.sectionTitle}>How it works?</h2>
            <div style={styles.videoWrap}>
              <video
                autoPlay
                loop
                muted
                controls
                playsInline
                preload="auto"
                src="/projects_img/spender_page/spender-video.mp4"
                style={styles.heroVideo}
              />
            </div>
          </section>
        </div>

        <section style={styles.gallery}>
          <h2 style={styles.sectionTitle}>App Preview</h2>

          <div style={styles.mockupsWrap} className="mockups-wrap">
            {[9, 10, 11, 12, 13].map((n) => (
              <img
                key={n}
                src={`/projects_img/spender_page/${n}.jpg`}
                alt={`App screenshot ${n}`}
                style={styles.mockup}
                className="mockup-img"
              />
            ))}
          </div>
        </section>

        <footer style={styles.footer}>
          All Rights Reserved | Matan Ohayon © {year}
        </footer>
      </div>
    </>
  );
}

const PRIMARY = "#390492";
const PRIMARY_DARK = "#2a036e";
const ACCENT = "#8B73FF";
const LIGHT = "#efe7ff";

const styles = {
  page: {
    fontFamily: "'Poppins', 'Inter', sans-serif",
    padding: "0",
    textAlign: "center",
    background: `linear-gradient(175deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 40%, #1a0148 100%)`,
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },

  glowOrb1: {
    position: "absolute",
    top: "-120px",
    right: "-120px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${ACCENT}30 0%, transparent 70%)`,
    pointerEvents: "none",
  },

  glowOrb2: {
    position: "absolute",
    bottom: "10%",
    left: "-150px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${ACCENT}20 0%, transparent 70%)`,
    pointerEvents: "none",
  },

  header: {
    padding: "60px 20px 30px",
    position: "relative",
    zIndex: 1,
  },

  logo: {
    width: "180px",
    marginBottom: "12px",
    filter: "drop-shadow(0 4px 20px rgba(139,115,255,0.4))",
  },

  subtitle: {
    marginTop: "8px",
    fontSize: "19px",
    color: "rgba(255,255,255,0.85)",
    fontWeight: 400,
    letterSpacing: "0.3px",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.5,
  },

  accentText: {
    color: ACCENT,
    fontWeight: 600,
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "50px",
    flexWrap: "wrap",
    padding: "20px 20px 40px",
    position: "relative",
    zIndex: 1,
  },

  heroSection: {
    marginTop: "10px",
  },

  videoWrap: {
    padding: "4px",
    borderRadius: "54px",
    background: `linear-gradient(135deg, ${ACCENT}60, ${PRIMARY}60)`,
    display: "inline-block",
    boxShadow: `0 20px 60px rgba(57,4,146,0.4), 0 0 40px ${ACCENT}15`,
  },

  heroVideo: {
    width: "300px",
    borderRadius: "50px",
    display: "block",
  },

  instructions: {
    position: "relative",
    zIndex: 1,
  },

  sectionTitle: {
    fontSize: "28px",
    color: "white",
    marginBottom: "24px",
    fontWeight: 700,
    letterSpacing: "-0.3px",
  },

  stepsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    marginBottom: "30px",
  },

  stepBox: {
    width: "320px",
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    padding: "20px 22px",
    borderRadius: "18px",
    boxShadow: `0 8px 30px rgba(0,0,0,0.15), 0 0 0 1px rgba(139,115,255,0.1)`,
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    textAlign: "left",
  },

  stepNumber: {
    minWidth: "40px",
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "17px",
    flexShrink: 0,
    boxShadow: `0 4px 12px ${ACCENT}40`,
  },

  stepText: {
    margin: 0,
    fontSize: "14.5px",
    lineHeight: 1.5,
    color: "#333",
  },

  link: {
    color: PRIMARY,
    fontWeight: 600,
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },

  code: {
    background: LIGHT,
    color: PRIMARY,
    padding: "2px 8px",
    borderRadius: "6px",
    fontWeight: 700,
    fontSize: "14px",
    fontFamily: "monospace",
    letterSpacing: "2px",
  },

  qr: {
    width: "180px",
    marginTop: "10px",
    filter: "drop-shadow(0 6px 20px rgba(139,115,255,0.25))",
    borderRadius: "12px",
  },

  gallery: {
    padding: "60px 20px 20px",
    position: "relative",
    zIndex: 1,
  },

  mockupsWrap: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    flexWrap: "wrap",
    marginTop: "20px",
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  mockup: {
    width: "100%",
    maxWidth: "420px",
    borderRadius: "20px",
    border: `3px solid ${LIGHT}40`,
    boxShadow: `0 16px 40px rgba(57,4,146,0.25), 0 0 0 1px rgba(139,115,255,0.1)`,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    background: "rgba(255,255,255,0.05)",
  },

  footer: {
    color: "white",
    padding: "40px 20px 30px",
    opacity: 0.5,
    fontSize: "13px",
    letterSpacing: "0.5px",
    position: "relative",
    zIndex: 1,
  },
};

const responsiveStyles = `
  .step-box:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 12px 35px rgba(0,0,0,0.2), 0 0 0 1px rgba(139,115,255,0.2) !important;
  }

  .mockup-img:hover {
    transform: scale(1.03) !important;
    box-shadow: 0 24px 50px rgba(57,4,146,0.35), 0 0 30px rgba(139,115,255,0.15) !important;
  }

  @media (min-width: 768px) {
    .spender-container {
      gap: 80px !important;
      padding: 40px 40px 60px !important;
    }
    .mockups-wrap {
      gap: 30px !important;
    }
  }

  @media (min-width: 1024px) {
    .spender-container {
      gap: 120px !important;
    }
  }

  @media (max-width: 480px) {
    .mockup-img {
      max-width: 90vw !important;
    }
  }
`;
