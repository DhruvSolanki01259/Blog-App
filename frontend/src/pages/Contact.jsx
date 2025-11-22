import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import { adminData } from "../data/admin.data";
import { useThemeStore } from "../store/theme.store";
import axios from "axios";
import toast from "react-hot-toast";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

const Contact = () => {
  const { theme } = useThemeStore();
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

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/user/contact", {
        name,
        email,
        message,
      });

      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
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
            animate={{ width: "120px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className='h-[3px] sm:h-[4px] mt-6 mx-auto rounded-full bg-gradient-to-r from-[#FA9500] to-[#EB6424]'
          />
        </motion.div>

        {/* Contact Static Info */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 mb-14 px-2'>
          {[
            {
              icon: <Mail className='w-6 h-6' />,
              title: "Email",
              content: emailContent,
            },
            {
              icon: <Phone className='w-6 h-6' />,
              title: "Phone",
              content: phoneContent,
            },
            {
              icon: <MapPin className='w-6 h-6' />,
              title: "Address",
              content: addressContent,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              {...fadeUp(0.1 * idx + 0.1)}
              className={`${bgContainer} backdrop-blur-lg border ${borderColor} rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center`}>
              <div className='flex flex-col items-center gap-4'>
                <div
                  className={`p-4 rounded-full ${iconBg} ${iconColor} shadow-sm transition-all duration-300`}>
                  {item.icon}
                </div>
                <h3 className={`text-lg sm:text-xl font-bold ${headingColor}`}>
                  {item.title}
                </h3>
                <p
                  className={`text-sm sm:text-base font-medium break-all ${iconColor}`}>
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          {...fadeUp(0.4)}
          className={`${bgContainer} backdrop-blur-xl shadow-lg hover:shadow-2xl border ${borderColor} rounded-3xl p-7 sm:p-10 md:p-12 lg:p-14 transition-all duration-300 w-full max-w-4xl mx-auto`}>
          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-8 sm:mb-10 ${headingColor}`}>
            Send a Message
          </h2>

          <form
            className='space-y-6 sm:space-y-7'
            onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className='relative'>
              <User
                className={`absolute top-3.5 left-3.5 w-5 h-5 ${iconColor}`}
              />
              <input
                type='text'
                placeholder='Your full name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:ring-2 focus:ring-[#EB6424]/60 outline-none shadow-sm text-sm sm:text-base`}
              />
            </div>

            {/* Email */}
            <div className='relative'>
              <Mail
                className={`absolute top-3.5 left-3.5 w-5 h-5 ${iconColor}`}
              />
              <input
                type='email'
                placeholder='Your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:ring-2 focus:ring-[#EB6424]/60 outline-none shadow-sm text-sm sm:text-base`}
              />
            </div>

            {/* Message */}
            <div className='relative'>
              <MessageSquare
                className={`absolute top-3 left-3 w-5 h-5 ${iconColor}`}
              />
              <textarea
                placeholder='Write your message...'
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className={`w-full pl-12 pr-4 py-3 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:ring-2 focus:ring-[#EB6424]/60 outline-none resize-none shadow-sm text-sm sm:text-base overflow-hidden`}
              />
            </div>

            {/* Button */}
            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={loading}
                className='flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-[#FA9500] to-[#EB6424] text-white font-semibold rounded-xl hover:scale-[1.03] shadow-md transition-transform duration-300 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed'>
                <Send className='w-5 h-5' />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
