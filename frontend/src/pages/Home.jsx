import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: "easeOut", delay },
});

const Home = () => {
  return (
    <section className='min-h-[100vh] w-full bg-[#FBF9F2] px-5 sm:px-8 md:px-16 py-20'>
      {/* Hero Section */}
      <motion.div
        {...fadeUp(0)}
        className='max-w-5xl mx-auto text-center'>
        <motion.h1
          {...fadeUp(0.1)}
          className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#2B2B2B]'>
          Share Ideas, Inspire Minds
          <br />
          <span className='bg-gradient-to-r from-[#FA9500] via-[#EB6424] to-[#FA9500] bg-clip-text text-transparent'>
            Write. Publish. Connect.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className='max-w-2xl text-[#6F6652] mx-auto mt-5 text-sm sm:text-lg font-medium leading-relaxed'>
          A modern blogging platform built for curious minds — where your words
          matter, your stories inspire, and your voice finds an audience.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className='mt-8 flex justify-center gap-4 flex-wrap'>
          <Link
            to='/create'
            className='px-6 py-3 rounded-xl text-sm font-semibold shadow-sm border border-[#E9E2CE] bg-white hover:bg-[#FA9500] hover:text-white transition-all'>
            Create Blog
          </Link>
          <Link
            to='/blogs'
            className='px-6 py-3 rounded-xl text-sm font-semibold bg-[#FA9500] text-white shadow-sm hover:bg-[#EB6424] transition-all'>
            Explore Blogs
          </Link>
        </motion.div>
      </motion.div>

      {/* Featured Section */}
      <motion.div
        {...fadeUp(0.4)}
        className='max-w-5xl mx-auto mt-20'>
        <h2 className='text-2xl sm:text-3xl font-bold text-[#7C6A0A] mb-6'>
          Featured Posts
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
          {[1, 2, 3].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.1 * (i + 1))}
              className='rounded-2xl border border-[#E9E2CE] bg-white p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer group'>
              <div className='h-40 bg-[#FFF4E8] rounded-xl mb-4' />
              <h3 className='text-lg font-semibold text-[#2B2B2B] group-hover:text-[#EB6424] transition'>
                Awesome Story #{i + 1}
              </h3>
              <p className='text-[#6F6652] text-sm mt-1 leading-relaxed'>
                A short description that teases the content just enough to hook
                the reader…
              </p>
              <div className='mt-3 inline-flex items-center gap-1 text-[#C67A0E] text-sm font-medium group-hover:gap-2 transition-all'>
                Read More <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
