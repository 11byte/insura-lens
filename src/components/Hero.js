import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  return (
    <motion.div
      className="hero"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="title">Insura-Lens</h1>
      <p className="tagline">Your AI-Powered Insurance Planner & Recommender</p>

      <motion.p
        className="description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Analyze, Compare & Choose the Best Insurance Plans with Agentic AI. Get
        insights from real-time web content tailored to your needs.
      </motion.p>

      <motion.a
        href="https://github.com/11byte/insura-lens"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="install-button"
      >
        ➕ Add to Chrome
      </motion.a>
    </motion.div>
  );
}
