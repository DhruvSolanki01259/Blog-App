import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Backend URL (no trailing slash!)
const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/admin/blogs`;

// Axios instance with credentials
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const useAdminBlogStore = create((set, get) => ({
  blogs: [],
  isLoading: false,
  error: null,

  // Fetch all blogs
  getBlogs: async () => {
    try {
      set({ isLoading: true });

      const { data } = await axiosInstance.get("");

      if (!data.success) {
        toast.error(data.message || "Failed to fetch blogs");
        return set({ isLoading: false });
      }

      set({ blogs: data.blogs, isLoading: false });
    } catch (err) {
      console.error("Get Blogs Err:", err);
      toast.error(err.response?.data?.message || "Unable to fetch blogs");
      set({ isLoading: false, error: err.message });
    }
  },

  // Create new blog
  createBlog: async (payload) => {
    try {
      set({ isLoading: true });

      const { data } = await axiosInstance.post("/create", payload);

      if (!data.success) {
        toast.error(data.message || "Failed to create blog");
        return { success: false };
      }

      set({ blogs: [data.blog, ...get().blogs], isLoading: false });
      toast.success("Blog created successfully");
      return { success: true };
    } catch (err) {
      console.error("Create Blog Err:", err);
      toast.error(err.response?.data?.message || "Failed to create blog");
      set({ isLoading: false });
      return { success: false };
    }
  },

  // Update a blog
  updateBlog: async (id, payload) => {
    try {
      set({ isLoading: true });

      const { data } = await axiosInstance.put(`/update/${id}`, payload);

      if (!data.success) {
        toast.error(data.message || "Failed to update blog");
        return { success: false };
      }

      set({
        blogs: get().blogs.map((b) => (b._id === id ? data.blog : b)),
        isLoading: false,
      });

      toast.success("Blog updated successfully");
      return { success: true };
    } catch (err) {
      console.error("Update Blog Err:", err);
      toast.error(err.response?.data?.message || "Unable to update blog");
      set({ isLoading: false });
      return { success: false };
    }
  },

  // Delete a blog
  deleteBlog: async (id) => {
    try {
      set({ isLoading: true });

      const { data } = await axiosInstance.delete(`/delete/${id}`);

      if (!data.success) {
        toast.error(data.message || "Failed to delete blog");
        return { success: false };
      }

      set({
        blogs: get().blogs.filter((b) => b._id !== id),
        isLoading: false,
      });

      toast.success("Blog deleted successfully");
      return { success: true };
    } catch (err) {
      console.error("Delete Blog Err:", err);
      toast.error(err.response?.data?.message || "Failed to delete blog");
      set({ isLoading: false });
      return { success: false };
    }
  },
}));
