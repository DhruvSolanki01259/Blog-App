import { create } from "zustand";
import axios from "axios";

export const useSearchStore = create((set) => ({
  blogs: [],
  loading: false,
  error: null,

  // Basic Search
  searchBlogs: async (query) => {
    if (!query.trim()) {
      return set({ blogs: [], error: null });
    }

    try {
      set({ loading: true, error: null });

      const res = await axios.get(`/api/user/search`, { params: { query } });

      set({ blogs: res.data.blogs || [], loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },

  // Advanced Search
  advancedSearch: async (filters) => {
    // Remove empty filters
    const payload = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value && value.toString().trim() !== ""
      )
    );

    if (Object.keys(payload).length === 0) {
      return set({
        error: "Please provide at least one search parameter.",
        blogs: [],
      });
    }

    try {
      set({ loading: true, error: null });
      const res = await axios.get(`/api/user/advance-search`, {
        params: payload,
      });
      set({ blogs: res.data.blogs || [], loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },

  // Clear results
  clearSearch: () => set({ blogs: [], error: null }),
}));
