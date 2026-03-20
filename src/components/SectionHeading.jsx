import { motion } from "framer-motion";

function SectionHeading({ children }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-text mb-12"
    >
      {children}
    </motion.h2>
  );
}

export default SectionHeading;
