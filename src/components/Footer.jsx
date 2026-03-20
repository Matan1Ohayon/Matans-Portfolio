function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full py-8 text-center">
      {/* Gradient line */}
      <div
        className="w-full h-px mb-8"
        style={{ background: "linear-gradient(90deg, transparent, #00d9ff33, #ff006e33, transparent)" }}
      />

      <p className="text-xs tracking-widest uppercase" style={{ color: "#444" }}>
        Designed &amp; Built by{" "}
        <span style={{ color: "#888" }}>Matan Ohayon</span>
      </p>
      <p className="text-[10px] mt-2" style={{ color: "#333" }}>
        &copy; {year} &middot; All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
