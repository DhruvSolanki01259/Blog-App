import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBlogStore } from "../store/user.blog.store";
import { useEffect } from "react";
import { useThemeStore } from "../store/theme.store";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: "easeOut", delay },
});

const Home = () => {
  const { blogs, getBlogs, isLoading } = useBlogStore();
  const { theme } = useThemeStore();
  const isLight = theme === "light";

  useEffect(() => {
    getBlogs();
  }, []);

  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const topFeatured = sortedBlogs.slice(0, 6);

  return (
    <section
      className={`${
        isLight ? "bg-[#FBF9F2]" : "bg-[#1E1E2F]"
      } min-h-[100vh] w-full px-5 sm:px-8 md:px-16 py-20`}>
      {/* Hero Section */}
      <motion.div
        {...fadeUp(0)}
        className='max-w-5xl mx-auto text-center'>
        <motion.h1
          {...fadeUp(0.1)}
          className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
            isLight ? "text-[#2B2B2B]" : "text-[#E0E0E0]"
          }`}>
          Discover Stories That Inspire
          <br />
          <span className='bg-gradient-to-r from-[#FA9500] via-[#EB6424] to-[#FA9500] bg-clip-text text-transparent'>
            Learn. Explore. Grow.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className={`max-w-2xl mx-auto mt-5 text-sm sm:text-lg font-medium leading-relaxed ${
            isLight ? "text-[#6F6652]" : "text-[#CFCFCF]"
          }`}>
          Welcome to a space where ideas flow freely and voices find their
          audience.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className='mt-8 flex justify-center'>
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
        <h2
          className={`text-2xl sm:text-3xl font-bold mb-6 ${
            isLight ? "text-[#7C6A0A]" : "text-[#FAE19C]"
          }`}>
          Featured Posts
        </h2>

        {isLoading && (
          <p
            className={`${
              isLight ? "text-[#6F6652]" : "text-[#CFCFCF]"
            } text-center`}>
            Loading blogs...
          </p>
        )}
        {!isLoading && topFeatured.length === 0 && (
          <p
            className={`${
              isLight ? "text-[#6F6652]" : "text-[#CFCFCF]"
            } text-center`}>
            No blogs yet ⭐
          </p>
        )}

        {/* Blog Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
          {!isLoading &&
            topFeatured.map((blog, i) => (
              <motion.div
                key={blog._id}
                {...fadeUp(0.1 * (i + 1))}
                className={`rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer group ${
                  isLight
                    ? "border border-[#E9E2CE] bg-white"
                    : "border border-[#555] bg-[#2A2A3C]"
                }`}>
                <div className='h-40 rounded-xl mb-4 overflow-hidden'>
                  <img
                    src={blog.image || "/placeholder-blog.png"}
                    alt={blog.title}
                    className='w-full h-full object-cover'
                  />
                </div>

                <h3
                  className={`text-lg font-semibold group-hover:text-[#EB6424] transition ${
                    isLight ? "text-[#2B2B2B]" : "text-[#E0E0E0]"
                  }`}>
                  {blog.title}
                </h3>

                <p
                  className={`mt-1 text-sm leading-relaxed line-clamp-2 ${
                    isLight ? "text-[#6F6652]" : "text-[#CFCFCF]"
                  }`}>
                  {blog.content}
                </p>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className={`mt-3 inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all ${
                    isLight ? "text-[#C67A0E]" : "text-[#F5B940]"
                  }`}>
                  Read More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
        </div>

        {sortedBlogs.length > 6 && (
          <motion.div
            {...fadeUp(0.6)}
            className='text-center mt-8'>
            <Link
              className={`${
                isLight ? "text-[#EB6424]" : "text-[#F5B940]"
              } font-medium text-sm hover:underline`}
              to='/blogs'>
              Explore More Posts...
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Home;
