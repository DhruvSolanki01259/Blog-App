import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className='mt-3 space-y-1'>
      {criteria.map((item) => (
        <div
          key={item.label}
          className='flex items-center text-xs'>
          {item.met ? (
            <Check className='w-4 h-4 text-[#FA9500] mr-2' />
          ) : (
            <X className='w-4 h-4 text-[#EB6424]/70 mr-2' />
          )}
          <span
            className={`${item.met ? "text-[#7C6A0A]" : "text-[#7C6A0A]/50"}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-[#EB6424]";
    if (strength === 1) return "bg-[#FA9500]";
    if (strength === 2) return "bg-[#BABD8D]";
    if (strength === 3) return "bg-[#7C6A0A]";
    return "bg-green-600";
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className='mt-3'>
      <div className='flex justify-between items-center mb-1'>
        <span className='text-xs text-[#7C6A0A]/70'>Password Strength</span>
        <span
          className={`text-xs ${
            strength < 2
              ? "text-[#EB6424]"
              : strength < 4
              ? "text-[#FA9500]"
              : "text-[#7C6A0A]"
          }`}>
          {getStrengthText(strength)}
        </span>
      </div>

      <div className='flex space-x-1'>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1/4 rounded-full transition-all duration-300 ${
              index < strength ? `${getColor(strength)}` : "bg-[#FFDAC6]"
            }`}
          />
        ))}
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
