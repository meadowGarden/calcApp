import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTokenStore = create(
  persist((set) => ({
    token: null,
    addToken: (t) => {
      set(() => ({ token: t }));
    },
    removeToken: () => {
      set(() => ({ token: null }));
    },
  }))
);

export default useTokenStore;
