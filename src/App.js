import React, { useState, useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { motion, useAnimation } from "framer-motion";

function App() {
  const controls = useAnimation();
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    controls
      .start({
        x: ["100vw", "40vw", "0vw"],
        y: ["60vh", "30vh", "0vh"],
        scale: [0.4, 1.3, 0.8, 0.5],
        transition: {
          duration: 3,
          ease: "easeInOut",
        },
      })
      .then(() => setSticky(true));
  }, [controls]);

  return (
    <div className="App">
      {/* Background Sticker */}
      <motion.img
        src="/insura-lens/il_sticker-2.png"
        alt="Background Sticker"
        className="background-sticker"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <motion.img
        src="/insura-lens/il_sticker-1.jpg"
        alt="Background Sticker"
        className="background-sticker-2"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Logo Animation */}
      <motion.img
        src="/insura-lens/il_bg.png"
        alt="InsuraLens Logo"
        className={`logo-image ${isSticky ? "sticky-logo" : ""}`}
        animate={controls}
        initial={{ x: "100vw", y: "60vh", scale: 0.4 }}
      />

      <Hero />
      <Footer />
    </div>
  );
}

export default App;
