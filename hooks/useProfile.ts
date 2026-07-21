import { createContext, useContext } from "react";
import type { ProfileProps } from "@/types/profile";

export const ProfileContext = createContext<ProfileProps['id'] | null>(null);

export const useProfile = (): ProfileProps['id'] => {
  const id = useContext(ProfileContext);
  if (!id) {
    throw new Error(
      "useProfile() must be used within a <Loading> gate or a ProfileContext.Provider with a valid profileId"
    );
  }
  return id;
};
