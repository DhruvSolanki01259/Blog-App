import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useBlogStore } from "../store/user.blog.store";
import { useThemeStore } from "../store/theme.store";

const Footer = () => {
  const APP_NAME = import.meta.env.VITE_APP_NAME || "Blogify";
  const currentYear = new Date().getFullYear();
  const { theme } = useThemeStore();
  const { blogs, getBlogs, isLoading } = useBlogStore();

  useEffect(() => {
    if (blogs.length === 0) getBlogs();
  }, []);

  const recentBlogs = blogs.slice(0, 3);

  // Theme-based colors
  const textColor = theme === "light" ? "text-[#4B3B2A]" : "text-[#E0E0E0]";
  const headingColor = theme === "light" ? "text-[#7C6A0A]" : "text-[#FAFAFA]";
  const subTextColor =
    theme === "light" ? "text-[#7C6A0A]/80" : "text-[#CFCFCF]/70";
  const borderColor =
    theme === "light" ? "border-[#BABD8D]/30" : "border-[#4B4B5A]/30";
  const bgColor = theme === "light" ? "bg-[#FFDAC6]" : "bg-[#2B2B3A]";

  const logoSrc =
    theme === "dark" ? "/dark-mode-logo.png" : "/light-mode-logo.png";

  return (
    <footer className={`${bgColor} ${textColor} mt-12`}>
      <div
        className='
          max-w-7xl mx-auto px-6 py-10 
          grid grid-cols-1 md:grid-cols-3 
          gap-12 
        '>
        {/* Logo + App Name */}
        <div className='flex flex-col items-start'>
          <div className='flex items-center mb-2'>
            <img
              src={logoSrc}
              alt='Blogify Logo'
              className='h-12 sm:h-16 w-auto'
            />
            <span className='text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FA9500] to-[#EB6424] ml-2'>
              {APP_NAME}
            </span>
          </div>

          <p className={`${subTextColor} text-sm max-w-xs`}>
            Share ideas, explore insights, and discover inspiring blogs crafted
            for curious minds.
          </p>
        </div>

        {/* Quick Links */}
        <div className='flex flex-col items-start'>
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
        <div className='flex flex-col items-start'>
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
