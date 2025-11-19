import { create } from "zustand";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/user`;

export const useBlogStore = create((set, get) => ({
  blogs: [],
  isLoading: false,
  error: null,

  getBlogs: async () => {
    try {
      set({ isLoading: true, error: null });

      const { data } = await axios.get(`${API_URL}/blogs`);

      if (!data.success) {
        return set({ error: data.message, isLoading: false });
      }

      set({
        blogs: data.blogs,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },
}));
