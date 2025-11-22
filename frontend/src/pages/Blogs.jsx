import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBlogStore } from "../store/user.blog.store";
import { useThemeStore } from "../store/theme.store";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const Blogs = () => {
  const { blogs, getBlogs, isLoading } = useBlogStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    getBlogs();
  }, []);

  // Sort by newest → oldest
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const featured = sortedBlogs.filter((blog) => blog.isFeatured === true);

  // Theme-based colors
  const bgColor = theme === "light" ? "bg-[#FBF9F2]" : "bg-[#1E1E2F]";
  const cardBg = theme === "light" ? "bg-white" : "bg-[#2B2B3A]";
  const cardBorder =
    theme === "light" ? "border-[#E9E2CE]" : "border-[#4B4B5A]";
  const headingColor = theme === "light" ? "text-[#2B2B2B]" : "text-[#E0E0E0]";
  const subTextColor = theme === "light" ? "text-[#6F6652]" : "text-[#CFCFCF]";
  const linkColor = theme === "light" ? "text-[#C67A0E]" : "text-[#FFA550]";

  return (
    <section
      className={`min-h-screen w-full px-5 sm:px-10 md:px-16 py-20 ${bgColor}`}>
      {/* Page Title */}
      <motion.h1
        {...fadeUp(0)}
        className={`text-4xl sm:text-5xl font-extrabold text-center mb-4 ${headingColor}`}>
        Explore All Blogs
      </motion.h1>

      <motion.p
        {...fadeUp(0.1)}
        className={`text-center max-w-2xl mx-auto text-sm sm:text-lg mb-14 ${subTextColor}`}>
        Dive into the latest articles, tutorials, and project breakdowns written
        by me.
      </motion.p>

      {/* Featured Section */}
      <div className='max-w-6xl mx-auto mb-20'>
        <motion.h2
          {...fadeUp(0.2)}
          className={`text-2xl sm:text-3xl font-bold mb-6 ${headingColor}`}>
          Featured Posts
        </motion.h2>

        {isLoading && (
          <p className={`text-center ${subTextColor}`}>Loading blogs...</p>
        )}
        {!isLoading && featured.length === 0 && (
          <p className={`text-center ${subTextColor}`}>
            No featured posts yet.
          </p>
        )}

        {/* Featured Blogs Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {!isLoading &&
            featured.map((blog, i) => (
              <motion.div
                key={blog._id}
                {...fadeUp(0.1 * (i + 1))}
                className={`rounded-2xl border ${cardBorder} ${cardBg} p-5 shadow-sm hover:shadow-lg transition-all group cursor-pointer`}>
                <div className='h-44 rounded-xl overflow-hidden mb-4'>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className='w-full h-full object-cover'
                  />
                </div>

                <h3
                  className={`text-lg font-semibold group-hover:text-[#EB6424] transition ${headingColor}`}>
                  {blog.title}
                </h3>

                <p className={`text-sm mt-2 line-clamp-2 ${subTextColor}`}>
                  {blog.content}
                </p>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className={`mt-3 inline-flex items-center gap-1 font-medium ${linkColor} group-hover:gap-2 transition-all text-sm`}>
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
          className={`text-2xl sm:text-3xl font-bold mb-6 ${headingColor}`}>
          All Posts
        </motion.h2>

        {isLoading && (
          <p className={`text-center ${subTextColor}`}>Loading blogs...</p>
        )}
        {!isLoading && sortedBlogs.length === 0 && (
          <p className={`text-center ${subTextColor}`}>
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
                className={`rounded-2xl border ${cardBorder} ${cardBg} p-5 shadow-sm hover:shadow-lg transition-all group cursor-pointer`}>
                <div className='h-44 rounded-xl overflow-hidden mb-4'>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className='w-full h-full object-cover'
                  />
                </div>

                <h3
                  className={`text-lg font-semibold group-hover:text-[#EB6424] transition ${headingColor}`}>
                  {blog.title}
                </h3>

                <p className={`text-sm mt-2 line-clamp-2 ${subTextColor}`}>
                  {blog.content}
                </p>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className={`mt-3 inline-flex items-center gap-1 font-medium ${linkColor} group-hover:gap-2 transition-all text-sm`}>
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
