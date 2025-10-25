import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#FFDAC6]/40 backdrop-blur-sm'>
      <motion.div
        className='w-14 h-14 border-4 border-[#BABD8D] border-t-[#FA9500] rounded-full'
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
