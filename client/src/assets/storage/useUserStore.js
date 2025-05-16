import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist((set) => ({
    user: null,
    addUser: (serverResponse) => {
      set(() => ({ user: serverResponse }));
    },
    removeUser: () => {
      set(() => ({ user: null }));
    },
  }))
);

export default useUserStore;
