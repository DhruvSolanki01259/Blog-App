import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import { adminData } from "../data/admin.data";
import { useThemeStore } from "../store/theme.store";
import { useAuthStore } from "../store/auth.store";
import axios from "axios";
import toast from "react-hot-toast";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

const Contact = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const emailContent = adminData.email;
  const phoneContent = adminData.phone;
  const addressContent = adminData.address;

  const isLight = theme === "light";

  const bgContainer = isLight ? "bg-white/90" : "bg-[#2A2A3C]/70";
  const borderColor = isLight ? "border-[#efe7d9]" : "border-[#4B4B5A]";
  const headingColor = isLight ? "text-[#1a1a1a]" : "text-[#E0E0E0]";
  const subTextColor = isLight ? "text-[#4b4b4b]" : "text-[#CFCFCF]";
  const iconBg = isLight ? "bg-[#FFE6D7]" : "bg-[#4B4B5A]";
  const iconColor = isLight ? "text-[#7C6A0A]" : "text-[#E0E0E0]";
  const inputBg = isLight ? "bg-[#FFF8F0]" : "bg-[#3B3B4F]";
  const inputText = isLight ? "text-[#1a1a1a]" : "text-[#E0E0E0]";
  const inputBorder = isLight ? "border-[#E4DCC7]" : "border-[#4B4B5A]";

  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setName("");
      setEmail("");
    } else {
      setName(user?.username || "");
      setEmail(user?.email || "");
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !isAuthenticated) {
      toast.error("You must be logged in to send a message!");
      navigate("/login");
      return;
    }

    if (!name || !email || !message.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/user/contact`,
        { name, email, message: message.trim() }
      );

      toast.success("Message sent successfully!");
      setMessage("");

      // Reset textarea height
      setTimeout(() => {
        const textarea = document.querySelector("#contact-message");
        if (textarea) textarea.style.height = "25px";
      }, 0);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send message. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`min-h-screen w-full py-16 px-4 sm:px-6 md:px-10 lg:px-16 flex justify-center ${
        isLight ? "bg-[#FBF9F2]" : "bg-[#1E1E2F]"
      }`}>
      <div className='w-full max-w-7xl'>
        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className='text-center px-2'>
          <h1
            className={`text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-snug ${headingColor}`}>
            <span className='bg-gradient-to-r from-[#FA9500] to-[#EB6424] bg-clip-text text-transparent'>
              Get In Touch
            </span>
          </h1>

          <p
            className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-medium px-2 ${subTextColor}`}>
            Have feedback, questions, or ideas? I’d love to hear from you. Reach
            out anytime — I’m always listening.
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "90px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='h-[3px] mx-auto mt-4 bg-gradient-to-r from-[#FA9500] to-[#EB6424] rounded-full'
          />
        </motion.div>

        {/* Content */}
        <div className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10'>
          {/* Contact Details */}
          <motion.div
            {...fadeUp(0.1)}
            className={`p-6 sm:p-8 rounded-2xl border ${borderColor} ${bgContainer} shadow-md backdrop-blur-md`}>
            <h2
              className={`text-xl sm:text-2xl font-bold mb-6 ${headingColor}`}>
              Contact Information
            </h2>

            <div className='space-y-6'>
              {/* Email */}
              <div className='flex items-center space-x-4'>
                <div
                  className={`p-3 rounded-xl ${iconBg} shadow-sm ${iconColor}`}>
                  <Mail size={22} />
                </div>
                <p className={`font-medium ${subTextColor}`}>{emailContent}</p>
              </div>

              {/* Phone */}
              <div className='flex items-center space-x-4'>
                <div
                  className={`p-3 rounded-xl ${iconBg} shadow-sm ${iconColor}`}>
                  <Phone size={22} />
                </div>
                <p className={`font-medium ${subTextColor}`}>{phoneContent}</p>
              </div>

              {/* Address */}
              <div className='flex items-center space-x-4'>
                <div
                  className={`p-3 rounded-xl ${iconBg} shadow-sm ${iconColor}`}>
                  <MapPin size={22} />
                </div>
                <p className={`font-medium ${subTextColor}`}>
                  {addressContent}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            {...fadeUp(0.15)}
            onSubmit={handleSubmit}
            className={`p-6 sm:p-8 rounded-2xl border ${borderColor} ${bgContainer} shadow-md backdrop-blur-md`}>
            <h2
              className={`text-xl sm:text-2xl font-bold mb-6 ${headingColor}`}>
              Send a Message
            </h2>

            {/* Name */}
            <div className='mb-4'>
              <label className={`text-sm font-medium ${subTextColor}`}>
                Name
              </label>
              <div
                className={`mt-1 flex items-center gap-3 rounded-xl border ${inputBorder} ${inputBg} px-4 py-3`}>
                <User
                  size={20}
                  className={iconColor}
                />
                <input
                  type='text'
                  value={name}
                  disabled
                  className={`w-full bg-transparent outline-none ${inputText}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className='mb-4'>
              <label className={`text-sm font-medium ${subTextColor}`}>
                Email
              </label>
              <div
                className={`mt-1 flex items-center gap-3 rounded-xl border ${inputBorder} ${inputBg} px-4 py-3`}>
                <Mail
                  size={20}
                  className={iconColor}
                />
                <input
                  type='email'
                  value={email}
                  disabled
                  className={`w-full bg-transparent outline-none ${inputText}`}
                />
              </div>
            </div>

            {/* Message */}
            <div className='mb-5'>
              <label className={`text-sm font-medium ${subTextColor}`}>
                Message
              </label>
              <div
                className={`mt-1 flex items-start gap-3 rounded-xl border ${inputBorder} ${inputBg} px-4 py-3`}>
                <MessageSquare
                  size={20}
                  className={iconColor}
                />
                <textarea
                  id='contact-message'
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    e.target.style.height = "25px";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  placeholder='Type your message...'
                  rows={1}
                  className={`w-full bg-transparent resize-none outline-none overflow-hidden ${inputText}`}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FA9500] to-[#EB6424] text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 transition active:scale-[0.98]'>
              {loading ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
