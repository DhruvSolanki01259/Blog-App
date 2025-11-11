import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import Input from "../components/Input";
import GenderCheckbox from "../components/GenderCheckbox"; // Import gender component
import { useAuthStore } from "../store/auth.store";
import toast from "react-hot-toast";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(""); // Gender state

  const { isLoading, error, signup, clearError } = useAuthStore();

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    clearError();

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !gender.trim()
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (!["boy", "girl"].includes(gender)) {
      toast.error("Please select a valid gender.");
      return;
    }

    try {
      const result = await signup({ username, email, password, gender });

      if (result?.user) {
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error(result?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 mt-8'>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='flex flex-col md:flex-row max-w-4xl w-full md:bg-white rounded-2xl md:shadow-lg overflow-hidden'>
        {/* Left Side - Image and Message */}
        <div className='hidden md:flex w-1/2 flex-col items-center justify-center p-8 bg-[#FFFAF0]'>
          <img
            src='/signup-side-image.png'
            alt='Sign Up'
            className='w-64 h-64 object-contain mb-6'
          />
          <h3 className='text-2xl font-bold text-[#7C6A0A] text-center mb-2'>
            Take Control of Your Tasks
          </h3>
          <p className='text-[#7C6A0A] text-center text-lg'>
            Experience a smarter way to organize, track, and achieve your goals
            with ease.
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className='w-full md:w-1/2 max-w-md mx-auto md:mx-0 bg-[#FFDAC6]/20 backdrop-blur-md border border-[#BABD8D]/30 p-8 rounded-2xl md:rounded-none md:rounded-r-2xl'>
          <h2 className='text-3xl font-bold text-center mb-6 text-[#7C6A0A]'>
            Create Your Account
          </h2>

          <form
            onSubmit={handleSignUp}
            className='space-y-4'>
            <Input
              icon={User}
              type='text'
              placeholder='Enter your Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              icon={Mail}
              type='email'
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={Lock}
              type='password'
              placeholder='Enter your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Gender Selection */}
            <p className='text-sm font-bold text-[#7C6A0A]'>Select Gender</p>
            <GenderCheckbox
              selectedGender={gender}
              onCheckboxChange={setGender}
            />

            {error && (
              <p className='text-[#EB6424] text-sm font-semibold mt-1'>
                {error}
              </p>
            )}

            <PasswordStrengthMeter password={password} />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type='submit'
              disabled={isLoading}
              className='mt-4 w-full py-3 px-4 font-semibold text-white 
              rounded-lg bg-gradient-to-r from-[#FA9500] to-[#EB6424]
              shadow-md hover:shadow-lg transition duration-300 focus:ring-2 
              focus:ring-[#FA9500]/50 focus:outline-none'>
              {isLoading ? (
                <Loader className='w-6 h-6 animate-spin mx-auto' />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-[#7C6A0A]/80'>
              Already have an account?{" "}
              <Link
                to='/login'
                className='text-[#EB6424] font-medium hover:underline'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
