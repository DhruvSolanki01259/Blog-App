import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBlogStore } from "../store/blog.store";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const Blogs = () => {
  const { blogs, getBlogs, isLoading } = useBlogStore();

  useEffect(() => {
    getBlogs();
  }, []);

  // Sort by newest → oldest
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const featured = sortedBlogs.slice(0, 6); // top 6 as featured

  return (
    <section className='min-h-screen w-full bg-[#FBF9F2] px-5 sm:px-10 md:px-16 py-20'>
      {/* Page Title */}
      <motion.h1
        {...fadeUp(0)}
        className='text-4xl sm:text-5xl font-extrabold text-[#2B2B2B] text-center mb-4'>
        Explore All Blogs
      </motion.h1>

      <motion.p
        {...fadeUp(0.1)}
        className='text-center max-w-2xl mx-auto text-[#6F6652] text-sm sm:text-lg mb-14'>
        Dive into the latest articles, tutorials, and project breakdowns written
        by me.
      </motion.p>

      {/* Featured Section */}
      <div className='max-w-6xl mx-auto mb-20'>
        <motion.h2
          {...fadeUp(0.2)}
          className='text-2xl sm:text-3xl font-bold text-[#7C6A0A] mb-6'>
          Featured Posts
        </motion.h2>

        {isLoading && (
          <p className='text-[#6F6652] text-center'>Loading blogs...</p>
        )}

        {!isLoading && featured.length === 0 && (
          <p className='text-center text-[#6F6652]'>No featured posts yet.</p>
        )}

        {/* Featured Blogs Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {!isLoading &&
            featured.map((blog, i) => (
              <motion.div
                key={blog._id}
                {...fadeUp(0.1 * (i + 1))}
                className='rounded-2xl border border-[#E9E2CE] bg-white p-5 shadow-sm hover:shadow-lg transition-all group cursor-pointer'>
                <div className='h-44 rounded-xl overflow-hidden mb-4'>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className='w-full h-full object-cover'
                  />
                </div>

                <h3 className='text-lg font-semibold text-[#2B2B2B] group-hover:text-[#EB6424] transition'>
                  {blog.title}
                </h3>

                <p className='text-sm text-[#6F6652] mt-2 line-clamp-2'>
                  {blog.content}
                </p>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className='mt-3 inline-flex items-center gap-1 text-[#C67A0E] text-sm font-medium group-hover:gap-2 transition-all'>
                  Read More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
        </div>
      </div>

      {/* All Posts Section */}
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          {...fadeUp(0.3)}
          className='text-2xl sm:text-3xl font-bold text-[#7C6A0A] mb-6'>
          All Posts
        </motion.h2>

        {isLoading && (
          <p className='text-[#6F6652] text-center'>Loading blogs...</p>
        )}

        {!isLoading && sortedBlogs.length === 0 && (
          <p className='text-center text-[#6F6652]'>
            No blogs have been published yet.
          </p>
        )}

        {/* All Blogs Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {!isLoading &&
            sortedBlogs.map((blog, i) => (
              <motion.div
                key={blog._id}
                {...fadeUp(0.1 * (i + 1))}
                className='rounded-2xl border border-[#E9E2CE] bg-white p-5 shadow-sm hover:shadow-lg transition-all group cursor-pointer'>
                <div className='h-44 rounded-xl overflow-hidden mb-4'>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className='w-full h-full object-cover'
                  />
                </div>

                <h3 className='text-lg font-semibold text-[#2B2B2B] group-hover:text-[#EB6424] transition'>
                  {blog.title}
                </h3>

                <p className='text-sm text-[#6F6652] mt-2 line-clamp-2'>
                  {blog.content}
                </p>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className='mt-3 inline-flex items-center gap-1 text-[#C67A0E] text-sm font-medium group-hover:gap-2 transition-all'>
                  Read More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
