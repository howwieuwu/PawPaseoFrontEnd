import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      sesionUser: {}, // => initial state
      setSesionUser: (user) => set({ sesionUser: user }), // => añadir al usuario
    }),

    { name: "adminFound" }
  )
);
