import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      addUser: (serverResponse) => {
        set(() => ({ user: serverResponse }));
      },

      updateUser: (updatedUserData) => {
        set((state) => ({
          user: {
            ...state.user,
            user: {
              ...state.user.user,
              ...updatedUserData,
            },
          },
        }));
      },

      removeUser: () => {
        set(() => ({ user: null }));
        localStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
