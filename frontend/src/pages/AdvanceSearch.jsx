import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "../store/theme.store";
import { useBlogStore } from "../store/user.blog.store";
import BlogCard from "../components/BlogCard";

const AdvanceSearch = () => {
  const { theme } = useThemeStore();
  const { blogs, getBlogs, isLoading, error } = useBlogStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Fetch blogs on component mount
  useEffect(() => {
    getBlogs();
  }, []);

  // Filter blogs dynamically whenever inputs or blogs change
  useEffect(() => {
    const results = blogs.filter((b) => {
      const matchesTitle = b.title.toLowerCase().includes(title.toLowerCase());
      const matchesContent = b.content
        .toLowerCase()
        .includes(content.toLowerCase());
      const matchesCategory = b.category
        .toLowerCase()
        .includes(category.toLowerCase());

      // Correct featured filtering using isFeatured
      let matchesFeatured = true; // default for "Any"
      if (featured === "true") matchesFeatured = b.isFeatured === true;
      else if (featured === "false") matchesFeatured = b.isFeatured === false;

      return (
        matchesTitle && matchesContent && matchesCategory && matchesFeatured
      );
    });

    setFilteredBlogs(results);
  }, [title, content, category, featured, blogs]);

  // Theme-based classes
  const pageTitleColor =
    theme === "light" ? "text-[#4B3B2A]" : "text-[#E0E0E0]";
  const filterBg = theme === "light" ? "bg-[#FFF9F4]/80" : "bg-[#2B2B3A]/80";
  const filterBorder =
    theme === "light" ? "border-[#E5D9C4]" : "border-[#4B4B5A]";
  const labelColor = theme === "light" ? "text-[#6B5430]" : "text-[#CFCFCF]";
  const inputBg = theme === "light" ? "bg-white" : "bg-[#3A3A4A]";
  const inputBorder =
    theme === "light" ? "border-[#D6C7A1]" : "border-[#5A5A6A]";
  const inputText = theme === "light" ? "text-[#4B3B2A]" : "text-[#E0E0E0]";

  const dropdownBg = theme === "light" ? "bg-white" : "bg-[#3A3A4A]";
  const dropdownBorder =
    theme === "light" ? "border-[#D6C7A1]" : "border-[#5A5A6A]";
  const dropdownText = theme === "light" ? "text-[#4B3B2A]" : "text-[#E0E0E0]";
  const dropdownFocusRing =
    theme === "light" ? "focus:ring-[#FA9500]/70" : "focus:ring-[#EB6424]/70";

  return (
    <div className='max-w-7xl mx-auto px-6 pt-32 pb-12'>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-4xl font-bold mb-10 ${pageTitleColor}`}>
        Advance Search
      </motion.h1>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${filterBg} backdrop-blur-xl border ${filterBorder} shadow-md rounded-xl p-6 mb-6`}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div>
            <label className={`block mb-2 text-sm font-semibold ${labelColor}`}>
              Title
            </label>
            <input
              type='text'
              placeholder='Search by title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border ${inputBorder} ${inputBg} shadow-sm ${inputText} outline-none focus:ring-2 ${dropdownFocusRing} transition-all`}
            />
          </div>

          <div>
            <label className={`block mb-2 text-sm font-semibold ${labelColor}`}>
              Category
            </label>
            <input
              type='text'
              placeholder='Type category...'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border ${inputBorder} ${inputBg} shadow-sm ${inputText} outline-none focus:ring-2 ${dropdownFocusRing} transition-all`}
            />
          </div>

          <div>
            <label className={`block mb-2 text-sm font-semibold ${labelColor}`}>
              Content
            </label>
            <input
              type='text'
              placeholder='Search inside content...'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border ${inputBorder} ${inputBg} shadow-sm ${inputText} outline-none focus:ring-2 ${dropdownFocusRing} transition-all`}
            />
          </div>

          <div>
            <label className={`block mb-2 text-sm font-semibold ${labelColor}`}>
              Featured
            </label>
            <select
              value={featured}
              onChange={(e) => setFeatured(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border ${dropdownBorder} ${dropdownBg} shadow-sm ${dropdownText} outline-none focus:ring-2 ${dropdownFocusRing} transition-all cursor-pointer appearance-none`}>
              <option value=''>Any</option>
              <option value='true'>⭐ Featured Only</option>
              <option value='false'>Non-Featured</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <div className='min-h-[200px]'>
        {isLoading && (
          <p className={`text-center text-lg opacity-70 ${labelColor}`}>
            Loading blogs...
          </p>
        )}
        {error && (
          <p className='text-center text-red-500 text-lg opacity-80'>{error}</p>
        )}
        {!isLoading && filteredBlogs.length === 0 && !error && (
          <p className={`text-center text-lg opacity-70 ${labelColor}`}>
            No blogs found...
          </p>
        )}
        {!isLoading && filteredBlogs.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center'>
            {filteredBlogs.map((b) => (
              <BlogCard
                key={b._id}
                post={b}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvanceSearch;
