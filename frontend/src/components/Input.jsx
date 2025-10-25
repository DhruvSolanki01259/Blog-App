import React from "react";

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className='relative'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Icon className='w-5 h-5 text-[#7C6A0A]/90' />
      </div>

      <input
        className='w-full pl-10 pr-3 py-2 bg-[#FFDAC6]/40 border border-[#BABD8D]/50 
        rounded-lg placeholder-[#7C6A0A]/60 text-[#7C6A0A] font-medium
        focus:ring-2 focus:ring-[#FA9500] focus:border-[#FA9500] 
        outline-none transition-all duration-300'
        {...props}
      />
    </div>
  );
};

export default Input;
