import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBlogStore } from "../store/user.blog.store";
import { useThemeStore } from "../store/theme.store";

const BlogDetails = () => {
  const { slug } = useParams();
  const { blogs, getBlogs, isLoading } = useBlogStore();
  const { theme } = useThemeStore();

  const blog = blogs.find((b) => b.slug === slug);

  useEffect(() => {
    if (blogs.length === 0) getBlogs();
  }, []);

  if (isLoading || !blog)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "light" ? "text-[#6F6652]" : "text-[#CFCFCF]"
        }`}>
        Loading blog...
      </div>
    );

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-8 ${
        theme === "light" ? "bg-[#FBF9F2]" : "bg-[#1E1E2F]"
      }`}>
      <div className='max-w-4xl mx-auto'>
        {/* IMAGE */}
        <div
          className={`overflow-hidden rounded-3xl shadow-md mb-10 border ${
            theme === "light" ? "border-[#E9E2CE]" : "border-[#4B4B5A]"
          }`}>
          <img
            src={blog.image}
            alt={blog.title}
            className='w-full h-[340px] sm:h-[420px] object-cover'
          />
        </div>

        {/* CATEGORY + DATE */}
        <div
          className={`flex items-center justify-between mb-4 text-sm ${
            theme === "light" ? "text-[#8A7E6A]" : "text-[#CFCFCF]/80"
          }`}>
          <span
            className={`px-3 py-1 rounded-full font-medium ${
              theme === "light"
                ? "bg-[#FFDAC6] text-[#7C6A0A]"
                : "bg-[#4B4B5A] text-[#DCDCDC]"
            }`}>
            {blog.category}
          </span>

          <span className={theme === "light" ? "" : "text-[#CFCFCF]/80"}>
            {new Date(blog.createdAt).toDateString()}
          </span>
        </div>

        {/* TITLE */}
        <h1
          className={`text-4xl sm:text-5xl font-extrabold leading-tight mb-6 ${
            theme === "light" ? "text-[#2B2B2B]" : "text-[#E0E0E0]"
          }`}>
          {blog.title}
        </h1>

        {/* CONTENT */}
        <div
          className={`prose prose-lg max-w-none leading-relaxed ${
            theme === "light" ? "text-[#3F3A32]" : "text-[#DCDCDC]"
          }`}>
          {blog.content.split("\n").map((para, i) => (
            <p
              key={i}
              className='mb-4'>
              {para}
            </p>
          ))}
        </div>

        {/* FOOTER SECTION */}
        <div
          className={`mt-12 border-t pt-8 text-center ${
            theme === "light" ? "border-[#E9E2CE]" : "border-[#4B4B5A]"
          }`}>
          <p
            className={
              theme === "light"
                ? "text-[#6F6652] text-sm"
                : "text-[#CFCFCF] text-sm"
            }>
            Thanks for reading! Want more? Explore all blogs on the homepage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
