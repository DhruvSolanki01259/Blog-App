import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useBlogStore } from "../store/user.blog.store";
import { useThemeStore } from "../store/theme.store";

const Footer = () => {
  const APP_NAME = import.meta.env.VITE_APP_NAME || "Blog App";
  const currentYear = new Date().getFullYear();
  const { theme } = useThemeStore();

  const { blogs, getBlogs, isLoading } = useBlogStore();

  // Fetch blogs once when footer loads
  useEffect(() => {
    if (blogs.length === 0) getBlogs();
  }, []);

  // latest 3 blogs
  const recentBlogs = blogs.slice(0, 3);

  // Color variables for light/dark
  const bgColor = theme === "light" ? "bg-[#FFDAC6]" : "bg-[#2B2B3A]";
  const textColor = theme === "light" ? "text-[#4B3B2A]" : "text-[#E0E0E0]";
  const headingColor = theme === "light" ? "text-[#7C6A0A]" : "text-[#FAFAFA]";
  const subTextColor =
    theme === "light" ? "text-[#7C6A0A]/80" : "text-[#CFCFCF]/70";
  const borderColor =
    theme === "light" ? "border-[#BABD8D]/30" : "border-[#4B4B5A]/30";

  return (
    <footer className={`${bgColor} ${textColor} mt-12`}>
      <div className='max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-12'>
        {/* Brand / About */}
        <div className='flex-1'>
          <h2
            className={`text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FA9500] to-[#EB6424]`}>
            {APP_NAME}
          </h2>
          <p className={`${subTextColor} text-sm`}>
            Share ideas, explore insights, and discover inspiring blogs crafted
            for curious minds.
          </p>
        </div>

        {/* Quick Links */}
        <div className='flex-1'>
          <h3 className={`text-lg font-semibold mb-2 ${headingColor}`}>
            Quick Links
          </h3>
          <ul className='space-y-2'>
            <li>
              <Link
                to='/'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-all'>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/blogs'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-all'>
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-all'>
                About
              </Link>
            </li>
            <li>
              <Link
                to='/advance-search'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-all'>
                Search
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-all'>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Recent Blogs */}
        <div className='flex-1'>
          <h3 className={`text-lg font-semibold mb-2 ${headingColor}`}>
            Recent Blogs
          </h3>

          {isLoading && <p className={`${subTextColor} text-sm`}>Loading...</p>}

          {!isLoading && recentBlogs.length === 0 && (
            <p className={`${subTextColor} text-sm`}>No blogs yet.</p>
          )}

          <ul className='space-y-2'>
            {!isLoading &&
              recentBlogs.map((blog) => (
                <li key={blog._id}>
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className='hover:text-[#EB6424] hover:translate-x-1 transition-all line-clamp-1'>
                    {blog.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div
        className={`border-t mt-6 py-4 text-center text-sm ${borderColor} ${subTextColor}`}>
        &copy; {currentYear} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
