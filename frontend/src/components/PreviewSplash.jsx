// PreviewSplash.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (delay) => ({
    y: 0,
    opacity: 1,
    transition: { delay, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const logoVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const pulseBg = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.2, 0.9, 3],
    opacity: [1, 0.8, 0.5, 0],
    transition: { duration: 1.2, ease: [0.42, 0, 0.58, 1] },
  },
};

const PreviewSplash = ({ onComplete, theme }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onComplete?.(), 900);
    }, 3600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const logoSrc =
    theme === "dark" ? "/dark-mode-logo.png" : "/light-mode-logo.png";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className='fixed inset-0 flex justify-center items-center z-[9999] bg-[#FAF9F6] dark:bg-[#1E1E2F]'
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: "easeInOut" },
          }}>
          {/* Logo + Title */}
          <motion.div
            className='flex flex-col sm:flex-row items-center sm:gap-3 px-6'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.8, ease: "easeOut" },
            }}>
            <motion.img
              src={logoSrc}
              alt='Blogify Logo'
              className='max-w-[160px] sm:max-w-[200px] h-auto'
              variants={logoVariants}
              initial='hidden'
              animate='visible'
            />

            <div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
              <motion.h1
                custom={0.4}
                variants={textVariants}
                initial='hidden'
                animate='visible'
                className='text-5xl sm:text-7xl font-bold text-[#7C6A0A] dark:text-[#FFDAC6]'>
                Blogify
              </motion.h1>
            </div>
          </motion.div>

          {/* Background Pulse */}
          <motion.div
            className='absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-r from-[#FA9500]/30 to-[#EB6424]/25 blur-3xl'
            variants={pulseBg}
            initial='initial'
            animate='animate'
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewSplash;
