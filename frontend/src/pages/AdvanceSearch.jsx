import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchStore } from "../store/search.store";
import BlogCard from "../components/BlogCard";

const AdvanceSearch = () => {
  const { blogs, loading, error, advancedSearch } = useSearchStore();

  const [filters, setFilters] = useState({
    title: "",
    category: "",
    content: "",
    featured: "",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    advancedSearch(filters);
  };

  return (
    <div className='max-w-7xl mx-auto px-6 pt-32 pb-12'>
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-4xl font-bold text-[#4B3B2A] mb-10'>
        Advance Search
      </motion.h1>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-[#FFF9F4]/80 backdrop-blur-xl border border-[#E5D9C4] shadow-md rounded-xl p-6 mb-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Title */}
          <div>
            <label className='block mb-2 text-sm font-semibold text-[#6B5430]'>
              Title
            </label>
            <input
              type='text'
              placeholder='Search by title...'
              value={filters.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className='w-full px-4 py-2 rounded-xl border border-[#D6C7A1] bg-white shadow-sm text-[#4B3B2A] outline-none focus:ring-2 focus:ring-[#FA9500]/70 transition-all'
            />
          </div>

          {/* Category */}
          <div>
            <label className='block mb-2 text-sm font-semibold text-[#6B5430]'>
              Category
            </label>
            <input
              type='text'
              placeholder='Type category...'
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className='w-full px-4 py-2 rounded-xl border border-[#D6C7A1] bg-white shadow-sm text-[#4B3B2A] outline-none focus:ring-2 focus:ring-[#FA9500]/70 transition-all'
            />
          </div>

          {/* Content */}
          <div>
            <label className='block mb-2 text-sm font-semibold text-[#6B5430]'>
              Content
            </label>
            <input
              type='text'
              placeholder='Search inside content...'
              value={filters.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className='w-full px-4 py-2 rounded-xl border border-[#D6C7A1] bg-white shadow-sm text-[#4B3B2A] outline-none focus:ring-2 focus:ring-[#FA9500]/70 transition-all'
            />
          </div>

          {/* Featured */}
          <div>
            <label className='block mb-2 text-sm font-semibold text-[#6B5430]'>
              Featured
            </label>
            <select
              value={filters.featured}
              onChange={(e) => handleChange("featured", e.target.value)}
              className='w-full px-4 py-2 rounded-xl border border-[#D6C7A1] bg-[#FFF7F0] shadow-sm text-[#4B3B2A] outline-none focus:ring-2 focus:ring-[#FA9500]/70 transition-all'>
              <option value=''>Any</option>
              <option value='true'>⭐ Featured Only</option>
              <option value='false'>Non-Featured</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className='mt-6 text-center'>
          <button
            onClick={handleSearch}
            className='px-8 py-3 rounded-full bg-[#FA9500] hover:bg-[#EB6424] text-white font-semibold transition'>
            Search
          </button>
        </div>
      </motion.div>

      {/* Results */}
      <div className='min-h-[200px]'>
        {loading && (
          <p className='text-center text-[#6B5430] text-lg opacity-70'>
            Searching...
          </p>
        )}

        {error && (
          <p className='text-center text-red-500 text-lg opacity-80'>{error}</p>
        )}

        {!loading && blogs.length === 0 && !error && (
          <p className='text-center text-[#6B5430] text-lg opacity-70'>
            No blogs found...
          </p>
        )}

        {!loading && blogs.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center'>
            {blogs.map((b) => (
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
