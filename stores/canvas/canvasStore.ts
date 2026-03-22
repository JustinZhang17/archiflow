// External Imports 
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Internal Imports
import { CanvasState } from "@/types/canvas";

const useCanvasStore = create<CanvasState>()(persist((set) => ({
  objects: {},
  profiles: {},

  addObject: (object) => {
    set((state) => ({
      objects: {
        ...state.objects,
        [object.instanceId]: object,
      }
    }))
  },

  updateObject: (instanceId, updatedProps) => {
    set((state) => ({
      objects: {
        ...state.objects,
        [instanceId]: {
          ...state.objects[instanceId], ...updatedProps
        }
      }
    }))
  },

  removeObject: (instanceId) => {
    set((state) => {
      const newObjects = { ...state.objects };
      delete newObjects[instanceId];
      return { objects: newObjects };
    })
  },

  clearObjects: () => {
    set({ objects: {} })
  },

  addProfile: (profile) => {
    set((state) => ({
      profiles: {
        ...state.profiles,
        [profile.id]: profile,
      }
    }))
  },

  updateProfile: (id, updatedProps) => {
    set((state) => ({
      profiles: {
        ...state.profiles,
        [id]: {
          ...state.profiles[id], ...updatedProps,
        }
      }
    }))
  },

  removeProfile: (id) => {
    set((state) => {
      const newProfiles = {
        ...state.profiles
      };
      delete newProfiles[id];
      return { profiles: newProfiles };
    })
  },

  setCursorStatus: (id, status) => {
    set((state) => ({
      profiles: {
        ...state.profiles,
        [id]: {
          ...state.profiles[id],
          cursor: {
            ...state.profiles[id].cursor,
            status: status,
          }
        }
      }
    }))
  },

  setCursorPosition: (id, position) => {
    set((state) => ({
      profiles: {
        ...state.profiles,
        [id]: {
          ...state.profiles[id],
          cursor: {
            ...state.profiles[id].cursor,
            position: position,
          }
        }
      }
    }))
  }

}), { name: "canvas-storage" }));

export { useCanvasStore };
