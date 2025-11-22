import React from "react";

const Input = ({ icon: Icon, theme = "light", ...props }) => {
  const bgColor = theme === "dark" ? "bg-[#2A2A2A]/50" : "bg-[#FFDAC6]/40";
  const borderColor =
    theme === "dark" ? "border-[#3B3B3B]/50" : "border-[#BABD8D]/50";
  const textColor = theme === "dark" ? "text-[#EDEDED]" : "text-[#7C6A0A]";
  const placeholderColor =
    theme === "dark" ? "placeholder-[#AAAAAA]" : "placeholder-[#7C6A0A]/60";

  return (
    <div className='relative'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Icon className={`w-5 h-5 ${textColor}/90`} />
      </div>

      <input
        className={`w-full pl-10 pr-3 py-2 ${bgColor} border ${borderColor} 
          rounded-lg ${placeholderColor} ${textColor} font-medium
          focus:ring-2 focus:ring-[#FA9500] focus:border-[#FA9500] 
          outline-none transition-all duration-300`}
        {...props}
      />
    </div>
  );
};

export default Input;
