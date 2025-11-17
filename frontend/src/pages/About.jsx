import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { adminData } from "../data/admin.data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const About = () => {
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  return (
    <section className='min-h-screen w-full py-16 px-4 sm:px-6 md:px-10 lg:px-20 flex justify-center'>
      <motion.div
        {...fadeUp(0)}
        className='w-full max-w-5xl bg-white rounded-3xl border border-[#E5D9C4] shadow-[0px_6px_18px_rgba(0,0,0,0.06)] p-6 sm:p-10 md:p-14 flex flex-col gap-12'>
        {/* Top Section */}
        <motion.div
          {...fadeUp(0.2)}
          className='flex flex-col md:flex-row-reverse items-center gap-10'>
          <motion.img
            {...fadeUp(0.3)}
            src={adminData.profileImg}
            alt={adminData.name}
            className='w-32 h-32 ss:w-36 ss:h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-2xl border border-[#E5D9C4] object-cover'
          />

          <div className='flex-1 text-center md:text-left space-y-4'>
            <h1 className='text-[1.9rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold text-[#7C6A0A] leading-tight'>
              What Is{" "}
              <span className='underline decoration-[#FA9500]'>{APP_NAME}</span>{" "}
              All About?
            </h1>

            <p className='text-[#4B3B2A]/80 text-sm sm:text-base lg:text-lg leading-relaxed'>
              {APP_NAME} is a transparent developer journal — built to show the
              <span className='font-semibold'>
                {" "}
                real workflow behind building digital products
              </span>{" "}
              instead of only showing finished results.
            </p>
          </div>
        </motion.div>

        {/* Core Philosophy Section */}
        <motion.div
          {...fadeUp(0.35)}
          className='space-y-5 text-[#4B3B2A]/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto text-justify'>
          <p>
            In most places, you only see the shiny end result — the UI demo, the
            final GitHub push, and sometimes a fancy LinkedIn post. But the most
            valuable part of development happens <em>before</em> that — in
            errors, redesigns, confusion, trial-and-error, rewriting logic,
            migrating stacks, and solving problems that aren’t on page 1 of
            Google.
          </p>

          <p>
            This platform focuses on the <strong>thinking</strong>, the{" "}
            <strong>process</strong>, and the <strong>mindset</strong> behind
            building projects that grow from scratch to production.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          {...fadeUp(0.45)}
          className='bg-[#FFF8E5] border border-[#E5D9C4] rounded-2xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto shadow-sm'>
          <h3 className='font-semibold text-[#7C6A0A] text-xl sm:text-2xl mb-4 text-center'>
            The Mission 🎯
          </h3>

          <ul className='list-disc space-y-3 pl-6 text-[#4B3B2A] text-sm sm:text-base lg:text-lg leading-relaxed'>
            <li>Document every improvement, failure, and breakthrough</li>
            <li>Think aloud about architecture and tech decisions</li>
            <li>Share realistic lessons, not motivational quotes</li>
            <li>Show exactly what changes and why it changes</li>
            <li>Help developers learn by observation, not memorization</li>
          </ul>
        </motion.div>

        {/* Social Links */}
        <motion.div
          {...fadeUp(0.5)}
          className='w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
          {adminData.socials.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target='_blank'
              rel='noreferrer'
              className='group p-4 flex items-center justify-between border border-[#E5D9C4] rounded-xl bg-white hover:bg-[#FA9500] hover:text-white transition-all duration-300 shadow-sm'>
              <span className='font-medium text-sm sm:text-base'>
                {item.name}
              </span>
              <ExternalLink className='w-5 h-5 opacity-70 group-hover:opacity-100' />
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <p className='text-center text-[#4B3B2A]/60 text-xs sm:text-sm italic'>
          Building is a cycle — Research, Build, Break, Rebuild, Deliver. ♻️
        </p>
      </motion.div>
    </section>
  );
};

export default About;
