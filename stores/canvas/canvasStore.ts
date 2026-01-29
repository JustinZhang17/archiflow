// External Imports 
import { create } from "zustand";
import { CanvasState } from "@/types/canvas";

const useCanvasStore = create<CanvasState>()((set) => ({
  models: {},
  profiles: {},

  addModel: (model) => {
    set((state) => ({
      models: {
        ...state.models,
        [model.id]: model,
      }
    }))
  },

  updateModel: (id, updatedProps) => {
    set((state) => ({
      models: {
        ...state.models,
        [id]: {
          ...state.models[id], ...updatedProps
        }
      }
    }))
  },

  removeModel: (id) => {
    set((state) => {
      const newModels = { ...state.models };
      delete newModels[id];
      return { models: newModels };
    })
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

}))

export { useCanvasStore };
