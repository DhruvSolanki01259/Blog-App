import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBlogStore } from "../store/blog.store";

const BlogDetails = () => {
  const { slug } = useParams();
  const { blogs, getBlogs } = useBlogStore();

  const blog = blogs.find((b) => b.slug === slug);

  useEffect(() => {
    if (blogs.length === 0) getBlogs();
  }, []);

  if (!blog) return <div className='p-10 text-center'>Loading blog...</div>;

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <img
        src={blog.image}
        className='rounded-xl mb-6'
      />
      <h1 className='text-4xl font-bold mb-4'>{blog.title}</h1>

      <p className='opacity-70 mb-3'>{blog.category}</p>

      <p className='text-lg leading-relaxed'>{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
