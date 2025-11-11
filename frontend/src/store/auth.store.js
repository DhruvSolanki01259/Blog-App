import { persist } from "zustand/middleware";
import { create } from "zustand";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/auth`;
axios.defaults.withCredentials = true;

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      error: null,
      isLoading: false,
      isAuthenticated: false,

      signup: async ({ username, email, password, gender }) => {
        try {
          set({ isLoading: true, error: null });

          const { data } = await axios.post(`${API_URL}/signup`, {
            username,
            email,
            password,
            gender,
          });
          if (!data?.user) throw new Error("Invalid Server Response");

          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return data;
        } catch (error) {
          console.error("Signup Error:", error.response?.data || error.message);
          set({
            isLoading: false,
            error:
              error.response?.data?.message ||
              error.message ||
              "Signup Failed. Please try again.",
          });
        }
      },

      login: async ({ email, password }) => {
        try {
          set({ isLoading: true, error: null });

          const { data } = await axios.post(`${API_URL}/login`, {
            email,
            password,
          });
          if (!data?.user) throw new Error("Invalid Server Response");

          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return data;
        } catch (error) {
          console.error("Login Error:", error.response?.data || error.message);
          set({
            isLoading: false,
            error:
              error.response?.data ||
              error.message ||
              "Login failed. Please check your credentials.",
          });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true, error: null });
          const res = await axios.post(`${API_URL}/logout`);
          if (!res) throw new Error("Invalid Server Response");
          return;
        } catch (error) {
          console.error("Logout Error:", error.response?.data || error.message);
          set({
            isLoading: false,
            error: error.response?.data || error.message || "Logout Failed",
          });
        } finally {
          set({
            user: null,
            error: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
