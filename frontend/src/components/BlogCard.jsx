import { Link } from "react-router-dom";
import { useThemeStore } from "../store/theme.store";
import { ArrowRight } from "lucide-react";

export default function BlogCard({ post }) {
  const { theme } = useThemeStore();

  return (
    <div
      className={`s
        group relative w-full
        rounded-2xl overflow-hidden
        transition-all duration-300 mx-auto flex flex-col
        ${
          theme === "light"
            ? "border-[#7C6A0A]/20 bg-[#FFDAC6]/40 shadow-sm hover:shadow-xl"
            : "border-gray-700 bg-[#1a1a1a]/40 shadow-sm hover:shadow-[0_0_25px_rgba(255,255,255,0.07)]"
        }
      `}>
      {/* Image */}
      <Link to={`/blogs/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className='
            h-[230px] w-full object-cover rounded-t-2xl
            transition-all duration-300 group-hover:scale-105
          '
        />
      </Link>

      {/* Content */}
      <div className='p-5 flex flex-col gap-3 flex-grow'>
        <p
          className={`
            text-xl font-semibold line-clamp-2
            ${theme === "light" ? "text-[#4B3B2A]" : "text-gray-100"}
          `}>
          {post.title}
        </p>

        <span
          className={`
            text-sm italic opacity-70
            ${theme === "light" ? "text-[#6B5430]" : "text-gray-300"}
          `}>
          {post.category}
        </span>
      </div>

      {/* Read More Button */}
      <div className='p-4 pt-0'>
        <Link
          to={`/blog/${post.slug}`}
          className='
            w-full bg-[#FA9500] hover:bg-[#EB6424]
            text-white font-medium py-3 rounded-xl
            flex items-center justify-center gap-2
            transition-all duration-300
            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
          '>
          Read Article <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
