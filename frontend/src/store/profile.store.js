import { persist } from "zustand/middleware";
import { create } from "zustand";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/user`;
axios.defaults.withCredentials = true;

export const useProfileStore = create(
  persist(
    (set, get) => ({
      bio: "",
      github: "",
      twitter: "",
      linkedin: "",
      portfolio: "",
      error: null,
      isLoading: false,

      editProfile: async ({ bio, github, linkedin, twitter, portfolio }) => {
        try {
          set({ isLoading: true, error: null });

          const { data } = await axios.put(`${API_URL}/edit-profile`, {
            bio,
            github,
            linkedin,
            twitter,
            portfolio,
          });

          if (!data?.success || !data?.user) {
            throw new Error(data?.message || "Profile update failed");
          }

          const updated = {
            bio: data.user.bio ?? "",
            github: data.user.github ?? "",
            twitter: data.user.twitter ?? "",
            linkedin: data.user.linkedin ?? "",
            portfolio: data.user.portfolio ?? "",
          };

          set({ ...updated, isLoading: false });
          return { success: true, message: data.message };
        } catch (error) {
          const msg =
            error.response?.data?.message ||
            error.message ||
            "Unknown error occurred";
          set({ isLoading: false, error: msg });
          return { success: false, message: msg };
        }
      },

      clearProfileFields: () =>
        set({
          bio: "",
          github: "",
          twitter: "",
          linkedin: "",
          portfolio: "",
        }),
    }),
    {
      name: "profile-storage",
      partialize: (state) => ({
        bio: state.bio,
        github: state.github,
        twitter: state.twitter,
        linkedin: state.linkedin,
        portfolio: state.portfolio,
      }),
    }
  )
);
