import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useBlogStore } from "../store/blog.store";

const Footer = () => {
  const APP_NAME = import.meta.env.VITE_APP_NAME || "Blog App";
  const currentYear = new Date().getFullYear();

  const { blogs, getBlogs, isLoading } = useBlogStore();

  // Fetch blogs once when footer loads
  useEffect(() => {
    if (blogs.length === 0) getBlogs();
  }, []);

  // latest 3 blogs
  const recentBlogs = blogs.slice(0, 3);

  return (
    <footer className='bg-[#FFDAC6] text-[#4B3B2A] mt-12'>
      <div className='max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-12'>
        {/* Brand / About */}
        <div className='flex-1'>
          <h2 className='text-2xl font-bold text-[#7C6A0A] mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FA9500] to-[#EB6424]'>
            {APP_NAME}
          </h2>
          <p className='text-[#7C6A0A]/80 text-sm'>
            Share ideas, explore insights, and discover inspiring blogs crafted
            for curious minds.
          </p>
        </div>

        {/* Quick Links */}
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-[#7C6A0A] mb-2'>
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
            <li>
              <Link
                to='/blogs'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-all'>
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* Recent Blogs */}
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-[#7C6A0A] mb-2'>
            Recent Blogs
          </h3>

          {isLoading && <p className='text-sm text-[#7C6A0A]/70'>Loading...</p>}

          {!isLoading && recentBlogs.length === 0 && (
            <p className='text-sm text-[#7C6A0A]/70'>No blogs yet.</p>
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

      <div className='border-t border-[#BABD8D]/30 mt-6 py-4 text-center text-[#7C6A0A]/80 text-sm'>
        &copy; {currentYear} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
