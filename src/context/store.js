import { create } from "zustand";

export const useStore = create((set) => ({
  sesionUser: {}, // => initial state
  setSesionUser: (user) => set({ sesionUser: user }), // => añadir al usuario
}));
