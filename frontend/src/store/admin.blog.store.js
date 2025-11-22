import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

axios.defaults.withCredentials = true;

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/admin/blogs`;

export const useAdminBlogStore = create((set, get) => ({
  blogs: [],
  isLoading: false,
  error: null,

  getBlogs: async () => {
    try {
      set({ isLoading: true });

      const { data } = await axios.get(`${API_URL}/`);

      if (!data.success) {
        toast.error(data.message);
        return set({ isLoading: false });
      }

      set({ blogs: data.blogs, isLoading: false });
    } catch (err) {
      console.error("Get Blogs Err:", err);
      toast.error("Unable to fetch blogs");
      set({ isLoading: false, error: err.message });
    }
  },

  createBlog: async (payload) => {
    try {
      set({ isLoading: true });

      const { data } = await axios.post(`${API_URL}/create`, payload);

      if (!data.success) {
        toast.error(data.message);
        return { success: false };
      }

      set({ blogs: [data.blog, ...get().blogs], isLoading: false });

      toast.success("Blog created");
      return { success: true };
    } catch (err) {
      console.error("Create Blog Err:", err);
      toast.error("Failed to create blog");
      set({ isLoading: false });
      return { success: false };
    }
  },

  updateBlog: async (id, payload) => {
    try {
      set({ isLoading: true });

      const { data } = await axios.put(`${API_URL}/update/${id}`, payload);

      if (!data.success) {
        toast.error(data.message);
        return { success: false };
      }

      set({
        blogs: get().blogs.map((b) => (b._id === id ? data.blog : b)),
        isLoading: false,
      });

      toast.success("Blog updated");
      return { success: true };
    } catch (err) {
      console.error("Update Blog Err:", err);
      toast.error("Unable to update");
      set({ isLoading: false });
      return { success: false };
    }
  },

  deleteBlog: async (id) => {
    try {
      set({ isLoading: true });

      const { data } = await axios.delete(`${API_URL}/delete/${id}`);

      if (!data.success) {
        toast.error(data.message);
        return { success: false };
      }

      set({
        blogs: get().blogs.filter((b) => b._id !== id),
        isLoading: false,
      });

      toast.success("Blog deleted");
      return { success: true };
    } catch (err) {
      console.error("Delete Blog Err:", err);
      toast.error("Failed to delete");
      set({ isLoading: false });
      return { success: false };
    }
  },
}));
