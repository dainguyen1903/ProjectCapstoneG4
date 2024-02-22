import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (userData) => {
        set({ isAuthenticated: true, user: userData });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      setUser: (userData) => {
        set({ user: userData });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
