import { createContext, useContext } from "react";

export const ProfileContext = createContext<string | null>(null);

export const useProfile = (): string => {
  const id = useContext(ProfileContext);
  if (!id) {
    throw new Error(
      "useProfile() must be used within a <Loading> gate or a ProfileContext.Provider with a valid profileId"
    );
  }
  return id;
};
