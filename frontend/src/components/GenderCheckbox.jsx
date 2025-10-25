const GenderCheckbox = ({ selectedGender, onCheckboxChange }) => {
  return (
    <div className='flex gap-4 mt-2'>
      {/* Male */}
      <label className='flex items-center gap-2 cursor-pointer'>
        <input
          type='radio'
          name='gender'
          value='boy'
          checked={selectedGender === "male"}
          onChange={() => onCheckboxChange("male")}
          className='w-4 h-4 accent-[#FA9500]'
        />
        <span className='text-[#7C6A0A] font-medium'>Male</span>
      </label>

      {/* Female */}
      <label className='flex items-center gap-2 cursor-pointer'>
        <input
          type='radio'
          name='gender'
          value='girl'
          checked={selectedGender === "female"}
          onChange={() => onCheckboxChange("female")}
          className='w-4 h-4 accent-[#FA9500]'
        />
        <span className='text-[#7C6A0A] font-medium'>Female</span>
      </label>
    </div>
  );
};

export default GenderCheckbox;
