import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useThemeStore } from "../store/theme.store";

export default function PostCard({ post }) {
  const { theme } = useThemeStore();

  const borderColor =
    theme === "light" ? "border-[#7C6A0A]/30" : "border-[#4B4B5A]";
  const bgColor = theme === "light" ? "bg-[#FFDAC6]/40" : "bg-[#1a1a1a]/40";
  const titleColor = theme === "light" ? "text-[#2B2B2B]" : "text-[#E0E0E0]";
  const categoryColor =
    theme === "light" ? "text-[#7C6A0A]/80" : "text-[#CFCFCF]/80";

  return (
    <div
      className={`
        group relative w-full sm:w-[420px] h-[420px]
        rounded-2xl overflow-hidden 
        ${borderColor} ${bgColor} 
        backdrop-blur-md
        shadow-sm hover:shadow-xl 
        transition-all duration-300 mx-auto
      `}>
      {/* Image */}
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className='
            h-[250px] w-full object-cover 
            rounded-t-2xl 
            transition-all duration-300 
            group-hover:h-[220px]
          '
        />
      </Link>

      {/* Content */}
      <div className='p-5 flex flex-col gap-2'>
        <p className={`text-xl font-semibold line-clamp-2 ${titleColor}`}>
          {post.title}
        </p>
        <span className={`text-sm italic opacity-70 ${categoryColor}`}>
          {post.category}
        </span>
      </div>

      {/* Read More Button */}
      <Link
        to={`/blogs/${post.slug}`}
        className='
          absolute left-0 right-0 
          bottom-[-180px] group-hover:bottom-0 
          mx-4 mb-4
          bg-[#FA9500] hover:bg-[#EB6424]
          text-white font-medium
          py-3 rounded-xl 
          flex items-center justify-center gap-2
          transition-all duration-300
        '>
        Read Article <ArrowRight size={18} />
      </Link>
    </div>
  );
}
