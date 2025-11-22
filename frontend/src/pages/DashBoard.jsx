// src/pages/DashBoard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  X,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAdminBlogStore } from "../store/admin.blog.store";
import { useThemeStore } from "../store/theme.store";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.35 },
});

const DashBoard = () => {
  const { theme } = useThemeStore();
  const isLight = theme === "light";

  const { blogs, getBlogs, createBlog, updateBlog, deleteBlog, isLoading } =
    useAdminBlogStore();

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deletingBlog, setDeletingBlog] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const emptyForm = {
    title: "",
    content: "",
    category: "",
    isFeatured: false,
    previewUrl: "",
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    getBlogs();
  }, []);

  const resetForm = () => {
    setForm({ ...emptyForm });
    setImageUrl(null);
  };

  const openCreate = () => {
    resetForm();
    setShowCreate(true);
    setShowEdit(false);
    setEditingBlog(null);
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      isFeatured: blog.isFeatured,
      previewUrl: blog.image,
    });
    setImageUrl(null);
    setShowEdit(true);
    setShowCreate(false);
  };

  // CLOUDINARY IMAGE UPLOAD
  const handleFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/"))
      return toast.error("Please upload a valid image file.");

    try {
      const data = new FormData();
      data.append("file", f);
      data.append("upload_preset", "blogify-title-images");
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);

      const res = await fetch(import.meta.env.VITE_CLOUDINARY_API_URL, {
        method: "POST",
        body: data,
      });
      const uploadingImageUrl = await res.json();
      setImageUrl(uploadingImageUrl.secure_url);
      setForm((prev) => ({ ...prev, previewUrl: URL.createObjectURL(f) }));
    } catch {
      toast.error("Image upload failed.");
    }
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.content.trim()) return "Content is required";
    if (!form.category.trim()) return "Category is required";
    return null;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) return toast.error(err);
    if (!imageUrl) return toast.error("Please upload a cover image.");

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        title: form.title.trim(),
        content: form.content.trim(),
        category: form.category.trim(),
        image: imageUrl,
      };
      const res = await createBlog(payload);
      if (res?.success) {
        setShowCreate(false);
        resetForm();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingBlog) return;
    const err = validateForm();
    if (err) return toast.error(err);

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        image: imageUrl || editingBlog.image,
        title: form.title.trim(),
        content: form.content.trim(),
        category: form.category.trim(),
      };
      const res = await updateBlog(editingBlog._id, payload);
      if (res?.success) {
        setShowEdit(false);
        setEditingBlog(null);
        resetForm();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingBlog) return;
    setSubmitting(true);
    try {
      const res = await deleteBlog(deletingBlog._id);
      if (res?.success) setDeletingBlog(null);
    } finally {
      setSubmitting(false);
    }
  };

  const renderCardActions = (blog) => (
    <div className='flex items-center gap-2'>
      <Link
        to={`/blogs/${blog.slug}`}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm border ${
          isLight
            ? "border-[#E9E2CE] bg-white hover:bg-[#FAF7F2]"
            : "border-[#555] bg-[#2A2A3C] hover:bg-[#3B3B50] text-white"
        }`}>
        <ExternalLink size={14} /> Read
      </Link>

      <button
        onClick={() => openEdit(blog)}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm ${
          isLight
            ? "bg-white border border-[#E9E2CE] hover:bg-[#FFF8E5]"
            : "bg-[#3B3B50] border border-[#555] text-white hover:bg-[#4B4B5A]"
        }`}>
        <Edit size={14} /> Edit
      </button>

      <button
        onClick={() => setDeletingBlog(blog)}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm ${
          isLight
            ? "bg-white border border-[#E9E2CE] hover:bg-[#FFECEC] text-[#B91C1C]"
            : "bg-[#4B1C1C] border border-[#B91C1C] text-white hover:bg-[#6B1C1C]"
        }`}>
        <Trash2 size={14} /> Delete
      </button>
    </div>
  );

  return (
    <section
      className={`${
        isLight ? "bg-[#FBF9F2]" : "bg-[#1E1E2F]"
      } min-h-screen w-full px-4 sm:px-8 md:px-16 py-10`}>
      <motion.div
        {...fadeUp(0)}
        className='max-w-7xl mx-auto'>
        {/* HEADER */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8'>
          <div>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold ${
                isLight ? "text-[#2B2B2B]" : "text-[#E0E0E0]"
              }`}>
              Admin Dashboard
            </h1>
            <p
              className={`${
                isLight ? "text-[#6F6652]" : "text-[#CFCFCF]"
              } text-sm mt-1`}>
              Create, update & remove your blogs.
            </p>
          </div>

          <button
            onClick={openCreate}
            className='inline-flex items-center gap-2 bg-[#EB6424] text-white px-4 py-2 rounded-xl shadow-sm hover:bg-[#FA9500] transition'>
            <PlusCircle size={18} /> New Blog
          </button>
        </div>

        {/* BLOG LIST */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {isLoading &&
            [1, 2, 3].map((n) => (
              <div
                key={n}
                className={`animate-pulse rounded-2xl ${
                  isLight
                    ? "bg-white border border-[#E9E2CE]"
                    : "bg-[#2A2A3C] border border-[#555]"
                } p-5 h-64`}
              />
            ))}

          {!isLoading &&
            blogs?.length > 0 &&
            [...blogs]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((blog) => (
                <motion.article
                  key={blog._id}
                  {...fadeUp(0.03)}
                  className={`rounded-2xl ${
                    isLight
                      ? "bg-white border border-[#E9E2CE]"
                      : "bg-[#2A2A3C] border border-[#555]"
                  } p-4 shadow-sm flex flex-col justify-between`}>
                  <div>
                    <div
                      className={`relative rounded-lg overflow-hidden h-40 mb-4 ${
                        isLight ? "bg-[#FFF4E8]" : "bg-[#3B3B50]"
                      }`}>
                      <img
                        src={blog.image || "/placeholder-blog.png"}
                        alt={blog.title}
                        className='w-full h-full object-cover'
                      />
                      {blog.isFeatured && (
                        <span className='absolute top-3 left-3 bg-[#FA9500] text-white text-xs font-semibold px-2 py-1 rounded'>
                          Featured
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-lg font-semibold mb-2 line-clamp-2 ${
                        isLight ? "text-[#2B2B2B]" : "text-[#E0E0E0]"
                      }`}>
                      {blog.title}
                    </h3>

                    <p
                      className={`text-sm mb-3 line-clamp-3 ${
                        isLight ? "text-[#6F6652]" : "text-[#CFCFCF]"
                      }`}>
                      {blog.content}
                    </p>

                    <div
                      className={`flex items-center justify-between text-xs ${
                        isLight ? "text-[#8A7E6A]" : "text-[#AAA]"
                      }`}>
                      <span>{blog.category}</span>
                      <span>{new Date(blog.createdAt).toDateString()}</span>
                    </div>
                  </div>

                  <div className='mt-4 flex items-center justify-end'>
                    {renderCardActions(blog)}
                  </div>
                </motion.article>
              ))}
        </div>
      </motion.div>

      {/* CREATE/EDIT MODAL */}
      {(showCreate || showEdit) && (
        <div className='fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${
              isLight
                ? "bg-white border border-[#E9E2CE]"
                : "bg-[#2A2A3C] border border-[#555]"
            } w-full max-w-2xl rounded-2xl p-6 shadow-xl overflow-auto`}>
            <div className='flex items-start justify-between mb-4'>
              <h2
                className={`text-xl font-semibold ${
                  isLight ? "text-[#7C6A0A]" : "text-[#E0E0E0]"
                }`}>
                {showEdit ? "Edit Blog" : "Create New Blog"}
              </h2>
              <button
                onClick={() => {
                  setShowCreate(false);
                  setShowEdit(false);
                  resetForm();
                }}
                className={`p-1 rounded hover:${
                  isLight ? "bg-gray-100" : "bg-[#3B3B50]"
                }`}>
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={showEdit ? handleUpdate : handleCreate}
              className='space-y-4'>
              {/* IMAGE UPLOAD */}
              <div>
                <label
                  className={`block text-sm mb-2 items-center gap-2 ${
                    isLight ? "text-[#6F6652]" : "text-[#CFCFCF]"
                  }`}>
                  <ImageIcon size={16} /> Cover Image
                </label>

                <div className='flex items-center gap-4'>
                  <label
                    className={`${
                      isLight
                        ? "bg-[#FFFCF7] border-dashed border-[#E9E2CE]"
                        : "bg-[#3B3B50] border-dashed border-[#555]"
                    } w-36 h-24 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden`}>
                    {form.previewUrl ? (
                      <img
                        src={form.previewUrl}
                        alt='preview'
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <span
                        className={`${
                          isLight ? "text-[#7C6A0A]" : "text-[#E0E0E0]"
                        } text-sm`}>
                        Select Image
                      </span>
                    )}
                    <input
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={handleFile}
                    />
                  </label>

                  <div className='flex-1'>
                    <input
                      type='text'
                      placeholder='Title'
                      value={form.title}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, title: e.target.value }))
                      }
                      className={`${
                        isLight
                          ? "bg-white border border-[#E9E2CE] text-[#2B2B2B]"
                          : "bg-[#2A2A3C] border border-[#555] text-[#E0E0E0]"
                      } w-full rounded-md px-3 py-2 mb-2`}
                    />

                    <input
                      type='text'
                      placeholder='Category'
                      value={form.category}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, category: e.target.value }))
                      }
                      className={`${
                        isLight
                          ? "bg-white border border-[#E9E2CE] text-[#2B2B2B]"
                          : "bg-[#2A2A3C] border border-[#555] text-[#E0E0E0]"
                      } w-full rounded-md px-3 py-2`}
                    />

                    <label
                      className={`flex items-center gap-2 text-sm mt-2 ${
                        isLight ? "text-[#2B2B2B]" : "text-[#E0E0E0]"
                      }`}>
                      <input
                        type='checkbox'
                        checked={form.isFeatured}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            isFeatured: e.target.checked,
                          }))
                        }
                      />{" "}
                      <span>Featured</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div>
                <label
                  className={`block text-sm mb-2 ${
                    isLight ? "text-[#6F6652]" : "text-[#CFCFCF]"
                  }`}>
                  Content
                </label>
                <textarea
                  rows={6}
                  value={form.content}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  className={`${
                    isLight
                      ? "bg-white border border-[#E9E2CE] text-[#2B2B2B]"
                      : "bg-[#2A2A3C] border border-[#555] text-[#E0E0E0]"
                  } w-full rounded-md px-3 py-2`}
                />
              </div>

              {/* BUTTONS */}
              <div className='flex items-center justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setShowCreate(false);
                    setShowEdit(false);
                    resetForm();
                  }}
                  className={`${
                    isLight ? "bg-gray-200" : "bg-[#3B3B50] text-white"
                  } px-4 py-2 rounded-md`}>
                  Cancel
                </button>

                <button
                  type='submit'
                  disabled={submitting}
                  className={`${
                    isLight
                      ? "bg-[#FA9500] text-white"
                      : "bg-[#EB6424] text-white"
                  } px-4 py-2 rounded-md disabled:opacity-60`}>
                  {submitting
                    ? showEdit
                      ? "Updating..."
                      : "Creating..."
                    : showEdit
                    ? "Update Blog"
                    : "Create Blog"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deletingBlog && (
        <div className='fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4'>
          <motion.div
            className={`${
              isLight
                ? "bg-white border border-[#E9E2CE]"
                : "bg-[#2A2A3C] border border-[#555]"
            } w-full max-w-md rounded-2xl p-6 shadow-xl`}>
            <h3
              className={`${
                isLight ? "text-[#2B2B2B]" : "text-[#E0E0E0]"
              } text-lg font-semibold mb-3`}>
              Confirm Delete
            </h3>
            <p
              className={`${
                isLight ? "text-[#6F6652]" : "text-[#CFCFCF]"
              } text-sm mb-6`}>
              Are you sure you want to delete{" "}
              <strong>{deletingBlog.title}</strong>? This action cannot be
              undone.
            </p>

            <div className='flex items-center justify-end gap-3'>
              <button
                onClick={() => setDeletingBlog(null)}
                className={`${
                  isLight ? "bg-gray-200" : "bg-[#3B3B50] text-white"
                } px-4 py-2 rounded-md`}>
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className={`${
                  isLight
                    ? "bg-[#E63946] text-white"
                    : "bg-[#B91C1C] text-white"
                } px-4 py-2 rounded-md disabled:opacity-60`}>
                {submitting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default DashBoard;
