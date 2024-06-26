import { create } from "zustand";

export const useHistorial = create((set) => ({
  activeWalker: null,
  setActiveWalker: (id) => set({ activeWalker: id }),
}));
