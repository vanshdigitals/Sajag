"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingTexts = [
  "Understanding elections...",
  "Finding your booth...",
  "Preparing your vote...",
];

export const SplashScreen = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // exit after a short while so splash can gracefully disappear
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsVisible(false), 800);
    }, 6000);

    // Text rotation animation every 2 seconds
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => {
      clearTimeout(exitTimer);
      clearInterval(textInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-center justify-center min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF]"
        >
          {/* Single blurred circle behind logo */}
          <div
            aria-hidden
            className="absolute bg-[#1D4ED8] opacity-20 rounded-full filter blur-3xl w-80 h-80"
            style={{
              transform: "translate(-40%, -10%)",
              left: "50%",
              top: "30%",
            }}
          />

          <div className="flex flex-col items-center justify-center z-10 text-center px-6">
            {/* Logo */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl font-bold text-[#1D4ED8] leading-none inline-flex items-center"
            >
              <span>SA</span>
              <span className="relative inline-block mx-1">
                <span className="relative z-10">J</span>

                {/* Pulse elements positioned perfectly above the J */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-6 flex items-center justify-center pointer-events-none">
                  {/* Dot */}
                  <motion.div
                    aria-hidden
                    className="bg-[#1D4ED8] rounded-full"
                    style={{ width: 12, height: 12 }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.3, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Arcs (rings) stacked behind dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-1/2">
                    {[0, 1].map((i) => (
                      <motion.span
                        key={i}
                        aria-hidden
                        className="block rounded-full border-[#1D4ED8] border-2"
                        style={{
                          width: 28 + i * 18,
                          height: 28 + i * 18,
                          marginLeft: -(14 + i * 9),
                        }}
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                        transition={{
                          duration: 0.9 + i * 0.15,
                          repeat: Infinity,
                          delay: 0.06 + i * 0.08,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </span>
              <span>AG</span>
            </motion.div>

            {/* Rotating text */}
            <div className="mt-6 h-8 perspective-[800px]">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={textIndex}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    style={{ backfaceVisibility: "hidden" }}
                    className="text-base text-[#0f172a] font-medium"
                  >
                    {loadingTexts[textIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom loading bar: continuous left->right using two bars for seamless effect */}
          <div className="absolute left-0 right-0 bottom-0 h-[2px] overflow-hidden">
            <div className="relative w-full h-full">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 h-full bg-[#1D4ED8]"
                  style={{ width: "35%" }}
                  animate={{ x: ["-110%", "110%"] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 2.2,
                    delay: i * 1.1,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
