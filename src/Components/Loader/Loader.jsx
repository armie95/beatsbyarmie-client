import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Loader.scss";

const Loader = ({ showCountdown }) => {
  const [countdown, setCountdown] = useState(50);

  useEffect(() => {
    if (!showCountdown) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showCountdown]);

  return (
    <div className="loader-body">
      <motion.h4
        className="loader-body__text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Loading...{" "}
        {showCountdown && countdown > 0 ? `${countdown}s` : ""}
      </motion.h4>
      <div className="loader-body__loader">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ y: 0 }}
            animate={{ y: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;