import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useThemeStore } from "../store/theme.store";

const NotFound = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const isLight = theme === "light";

  const bgColor = isLight ? "bg-[#FAF7F2]" : "bg-[#1E1E2F]";
  const titleColor = isLight ? "text-[#7C6A0A]" : "text-[#FAE19C]";
  const textColor = isLight ? "text-[#4B3B2A]" : "text-[#CFCFCF]";
  const accentColor = isLight ? "#EB6424" : "#F5B940";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${bgColor} px-6 text-center relative`}>
      {/* Icon animation */}
      <motion.div
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className='mb-6'>
        <AlertTriangle
          className={`w-20 h-20`}
          style={{ color: accentColor }}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`text-5xl md:text-6xl font-bold ${titleColor}`}>
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`mt-2 text-lg md:text-xl ${textColor}`}>
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={() => navigate("/")}
        className={`mt-8 px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-200 hover:shadow-lg`}
        style={{
          backgroundColor: accentColor,
          color: "#fff",
        }}>
        Go Back Home
      </motion.button>

      {/* Subtle background motion element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08, scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className='absolute inset-0 pointer-events-none flex items-center justify-center'>
        <div
          className='w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full blur-3xl'
          style={{ backgroundColor: accentColor }}></div>
      </motion.div>
    </div>
  );
};

export default NotFound;
