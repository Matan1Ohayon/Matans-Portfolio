function SectionWrapper({ id, children, className = "" }) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

export default SectionWrapper;
