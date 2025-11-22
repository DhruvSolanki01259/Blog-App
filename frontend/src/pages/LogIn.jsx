import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/auth.store";
import { useThemeStore } from "../store/theme.store";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error, login, clearError } = useAuthStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    clearError();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await login({ email, password });

      if (result?.success) {
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error(result?.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Try again later.");
    }
  };

  // Theme-aware styles
  const containerBg = theme === "dark" ? "bg-[#121212]" : "";
  const formBg =
    theme === "dark"
      ? "bg-[#1A1A1A]/90 border-[#FA9500]/70"
      : "bg-[#FFDAC6]/20 border-[#FABD8D]/70";
  const headingText = theme === "dark" ? "text-[#FA9500]" : "text-[#7C6A0A]";
  const infoText = theme === "dark" ? "text-[#CCCCCC]" : "text-[#7C6A0A]/80";
  const sideBg = theme === "dark" ? "bg-[#1E1E1E]" : "bg-[#FFFAF0]";
  const errorText = theme === "dark" ? "text-[#FF7C5F]" : "text-[#EB6424]";
  const linkText = theme === "dark" ? "text-[#FA9500]" : "text-[#EB6424]";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 mt-8 ${containerBg}`}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='flex flex-col md:flex-row max-w-4xl w-full md:rounded-2xl md:shadow-lg overflow-hidden'>
        {/* Left Side - Form */}
        <div
          className={`w-full md:w-1/2 max-w-md mx-auto md:mx-0 p-8 rounded-2xl md:rounded-l-2xl md:rounded-r-none border ${formBg} backdrop-blur-md`}>
          <h2 className={`text-3xl font-bold text-center mb-6 ${headingText}`}>
            Welcome Back! Please Login
          </h2>

          <form
            onSubmit={handleLogin}
            className='space-y-4'>
            <Input
              icon={Mail}
              type='email'
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              theme={theme}
            />
            <Input
              icon={Lock}
              type='password'
              placeholder='Enter your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              theme={theme}
            />

            {error && (
              <p className={`text-sm font-semibold mt-1 ${errorText}`}>
                {error.message}
              </p>
            )}

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
                "Login"
              )}
            </motion.button>
          </form>

          <div className='mt-6 text-center'>
            <p className={`text-sm ${infoText}`}>
              Don't have an account?{" "}
              <Link
                to='/signup'
                className={`${linkText} font-medium hover:underline`}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image / Info */}
        <div
          className={`hidden md:flex w-1/2 flex-col items-center justify-center p-8 ${sideBg}`}>
          <img
            src='/login-side-image.png'
            alt='Login'
            className='w-64 h-64 object-contain mb-6'
          />
          <h3 className={`text-2xl font-bold ${headingText} text-center mb-2`}>
            Secure & Fast Login
          </h3>
          <p className={`text-lg ${infoText} text-center`}>
            Access your account quickly and safely, and stay on top of your
            tasks.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
