import React from "react";

export default function SpenderDemo() {

    const year = new Date().getFullYear();


  return (
    <>
      <style>{responsiveStyles}</style>
      <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <img 
          src="/projects_img/spender_page/Theme1.png" 
          alt="Spender Logo" 
          style={styles.logo}   
        />
        <p style={styles.subtitle}>Meet Spender. Swipe your way to better spending.</p>
        
      </header>

      <div style={styles.container} className="spender-container">

        <section style={styles.instructions}>
            <h2 style={styles.sectionTitle}>How to Download the App</h2>

            <div style={styles.stepsContainer}>
            <div style={styles.stepBox}>
                <div style={styles.stepNumber}>1</div>
                <p>Install <strong>Expo Go</strong> on your device</p>
            </div>

            <div style={styles.stepBox}>
                <div style={styles.stepNumber}>2</div>
                <p>Open the camera and scan the QR code below or&nbsp;
                    <a 
                      href="https://expo.dev/preview/update?message=Minor+fixes&updateRuntimeVersion=1.0.0&createdAt=2025-11-29T15%3A30%3A42.269Z&slug=exp&projectId=e3a12fd3-502a-4fc2-8b29-47468781c59b&group=64f34df7-6495-4b97-8e2d-453349d26ff5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        Click here
                    </a>
                </p>
            </div>

            <div style={styles.stepBox}>
                <div style={styles.stepNumber}>3</div>
                <p>Register quickly with your phone. <br /><strong>Note: </strong>The OTP code is 123456</p>
            </div>

            <div style={styles.stepBox}>
                <div style={styles.stepNumber}>4</div>
                <p>Enjoy the live demo of Spender 🎉</p>
            </div>

            </div>

            <img 
            src="/projects_img/spender_page/spender-update.svg" 
            alt="QR Code"
            style={styles.qr}
            />
        </section>

        <section style={styles.heroSection}>
            <h2 style={styles.sectionTitle}>How it works?</h2>
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
        </section>

      </div>

      {/* MOCKUPS SECTION */}
      <section style={styles.gallery}>
        <h2 style={styles.sectionTitle}>App Preview</h2>

        <div style={styles.mockupsWrap}>
          <img src="/projects_img/spender_page/9.jpg" style={styles.mockup} />
          <img src="/projects_img/spender_page/10.jpg" style={styles.mockup} />
          <img src="/projects_img/spender_page/11.jpg" style={styles.mockup} />
          <img src="/projects_img/spender_page/12.jpg" style={styles.mockup} />
          <img src="/projects_img/spender_page/13.jpg" style={styles.mockup} />
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
const ACCENT = "#8B73FF";
const LIGHT = "#efe7ff";

const styles = {
  page: {
    fontFamily: "Poppins",
    padding: "40px 20px",
    textAlign: "center",
    background: PRIMARY,
    minHeight: "100vh",
    position: "relative",
  },

  header: {
    marginBottom: "3px",
  },

  logo: {
    width: "200px",
    marginBottom: "10px",
  },

  title: {
    fontSize: "36px",
    margin: "0",
    color: PRIMARY,
    fontWeight: "900",
  },

  subtitle: {
    marginTop: "8px",
    fontSize: "20px",
    color: "white",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "50px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },

  heroSection: {
    marginTop: "30px",
    marginBottom: "40px",
  },

  heroVideo: {
    width: "300px",
    borderRadius: "50px",
  },

  instructions: {
    // marginTop: "40px",
  },

  sectionTitle: {
    fontSize: "26px",
    color: "white",
    marginBottom: "20px",
    fontWeight: 700,
  },

  stepsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "25px",
    marginBottom: "25px",
  },

  stepBox: {
    width: "300px",
    background: "white",
    padding: "16px",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  stepNumber: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: ACCENT,
    margin: "0 auto 10px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "18px",
  },

  qr: {
    width: "180px",
    marginTop: "10px",
  },

  downloadBtn: {
    display: "inline-block",
    marginTop: "30px",
    background: PRIMARY,
    color: "white",
    padding: "16px 28px",
    fontSize: "18px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: 600,
    boxShadow: "0 8px 20px rgba(57,4,146,0.25)",
  },

  gallery: {
    marginTop: "60px",
  },

  mockupsWrap: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "20px",
  },

  mockup: {
    width: "100%",
    maxWidth: "450px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "18px",
    border: "5px solid #efe7ff", // השתמש בצבע HEX ולא במילת מפתח "LIGHT"
    boxShadow: "0 10px 25px rgba(127, 127, 198, 0.13)",
    padding: "6px",
    boxSizing: "border-box",
  },

  footer: {
    color: "white",
    marginTop: "60px",
    opacity: 0.6,
    fontSize: "14px",
  },
};

const responsiveStyles = `
  @media (min-width: 768px) {
    .spender-container {
      gap: 100px !important;
    }
  }
  @media (min-width: 1024px) {
    .spender-container {
      gap: 150px !important;
    }
  }
`;
