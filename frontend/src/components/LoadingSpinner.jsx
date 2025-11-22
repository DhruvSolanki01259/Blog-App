import { motion } from "framer-motion";

const LoadingSpinner = ({ theme = "light" }) => {
  // Colors based on theme
  const bgColor = theme === "dark" ? "bg-[#111111]/40" : "bg-[#FFDAC6]/40";
  const borderColor =
    theme === "dark" ? "border-[#3B3B3B]" : "border-[#BABD8D]";
  const borderTopColor =
    theme === "dark" ? "border-t-[#FA9500]" : "border-t-[#FA9500]";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${bgColor} backdrop-blur-sm`}>
      <motion.div
        className={`w-14 h-14 border-4 ${borderColor} ${borderTopColor} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
