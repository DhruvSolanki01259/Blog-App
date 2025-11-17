import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import { adminData } from "../data/admin.data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

const Contact = () => {
  const emailContent = adminData.email;
  const phoneContent = adminData.phone;
  const addressContent = adminData.address;

  return (
    <section className='min-h-screen w-full py-16 px-4 sm:px-6 md:px-10 lg:px-16 flex justify-center'>
      <div className='w-full max-w-7xl'>
        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className='text-center px-2'>
          <h1 className='text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] leading-snug'>
            <span className='bg-gradient-to-r from-[#FA9500] to-[#EB6424] bg-clip-text text-transparent'>
              Get In Touch
            </span>
          </h1>

          <p className='mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-xl mx-auto text-[#4b4b4b] font-medium px-2'>
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
              content: `${emailContent}`,
            },
            {
              icon: <Phone className='w-6 h-6' />,
              title: "Phone",
              content: `${phoneContent}`,
            },
            {
              icon: <MapPin className='w-6 h-6' />,
              title: "Address",
              content: `${addressContent}`,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              {...fadeUp(0.1 * idx + 0.1)}
              className='group bg-white/90 backdrop-blur-lg border border-[#efe7d9] rounded-2xl p-7 sm:p-8 shadow-sm 
              hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center'>
              <div className='flex flex-col items-center gap-4'>
                <div
                  className='p-4 rounded-full bg-[#FFE6D7] text-[#7C6A0A]
                  group-hover:bg-[#EB6424] group-hover:text-white shadow-sm transition-all duration-300'>
                  {item.icon}
                </div>
                <h3 className='text-lg sm:text-xl font-bold text-[#1a1a1a]'>
                  {item.title}
                </h3>
                <p className='text-[#7C6A0A] text-sm sm:text-base font-medium break-all'>
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FORM */}
        <motion.div
          {...fadeUp(0.4)}
          className='w-full max-w-4xl mx-auto rounded-3xl bg-white/90 backdrop-blur-xl shadow-lg hover:shadow-2xl border border-[#eee4d3] p-7 sm:p-10 md:p-12 lg:p-14 transition-all duration-300'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold text-center text-[#1a1a1a] mb-8 sm:mb-10'>
            Send a Message
          </h2>

          <form className='space-y-6 sm:space-y-7'>
            {/* Full Name */}
            <div className='relative'>
              <User className='absolute top-3.5 left-3.5 text-[#C08E42] w-5 h-5' />
              <input
                type='text'
                placeholder='Your full name'
                className='w-full pl-12 pr-4 py-3 rounded-lg bg-[#FFF8F0] border border-[#E4DCC7]
                text-[#1a1a1a] focus:ring-2 focus:ring-[#EB6424]/60 outline-none shadow-sm text-sm sm:text-base'
              />
            </div>

            {/* Email */}
            <div className='relative'>
              <Mail className='absolute top-3.5 left-3.5 text-[#C08E42] w-5 h-5' />
              <input
                type='email'
                placeholder='Your email address'
                className='w-full pl-12 pr-4 py-3 rounded-lg bg-[#FFF8F0] border border-[#E4DCC7]
                text-[#1a1a1a] focus:ring-2 focus:ring-[#EB6424]/60 outline-none shadow-sm text-sm sm:text-base'
              />
            </div>

            {/* Message */}
            <div className='relative'>
              <MessageSquare className='absolute top-3 left-3 text-[#C08E42] w-5 h-5' />
              <textarea
                rows='5'
                placeholder='Write your message...'
                className='w-full pl-12 pr-4 py-3 rounded-lg bg-[#FFF8F0] border border-[#E4DCC7]
                text-[#1a1a1a] focus:ring-2 focus:ring-[#EB6424]/60 outline-none resize-none shadow-sm text-sm sm:text-base'></textarea>
            </div>

            {/* Button */}
            <div className='flex justify-center'>
              <button
                type='button'
                className='flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-[#FA9500] to-[#EB6424]
                text-white font-semibold rounded-xl hover:scale-[1.03] shadow-md transition-transform duration-300 text-sm sm:text-base'>
                <Send className='w-5 h-5' />
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
