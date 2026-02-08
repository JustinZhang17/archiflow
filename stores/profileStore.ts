// External Imports 
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Internal Imports
import { ProfileProps } from "@/types/profile";

type ProfileState = {
  profileId: ProfileProps['id'];
  setProfileId: (id: ProfileProps['id']) => void;
}

const useProfileStore = create<ProfileState>()(persist((set) => ({
  profileId: "",
  setProfileId: (id) => set({ profileId: id }),

}), { name: "profile-storage" }));

export { useProfileStore };
