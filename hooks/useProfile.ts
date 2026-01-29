// External Imports
import { useState, useEffect } from "react";

// Internal Imports;
import { useCanvasStore } from "@/stores/canvas/canvasStore";
import { ProfileProps } from "@/types/profile";
import { CursorStatus } from "@/types/enums";
import { generateUUID } from "@/helpers/generators";

// YOU DON'T NEED THIS SINCE YOU ARE USING ZUSTAND STORE PERSIST
// TODO: Figure out if I should move this into the constants folder
const PROFILE_STORAGE_KEY = "user-profile";

const useProfile = (): ProfileProps["id"] => {
  const profiles = useCanvasStore((state) => state.profiles);
  const [profileId, setProfileID] = useState<ProfileProps["id"]>("");

  useEffect(() => {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (savedProfile) {
      // TODO: Add validation to ensure the parsed data matches ProfileProps structure
      const profileData: ProfileProps = JSON.parse(savedProfile);
      const profileId = profileData.id;

      // Check if the profile already exists in the store
      if (!profiles[profileId]) {
        useCanvasStore.getState().addProfile(profileData);
      };

      setProfileID(profileId);
    } else {
      // If no profile is found, create a default one
      const newProfile: ProfileProps = {
        id: generateUUID(),
        // TODO: Change this name later to be dynamic, this is the display during collab sessions 
        name: "Creator",
        // TODO: Changed this color later to be dynamic
        color: "#ff0000",
        cursor: {
          status: CursorStatus.Default,
          position: { x: 0, y: 0 }
        }
      };

      // Save to local storage
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));

      // Add to global store
      useCanvasStore.getState().addProfile(newProfile);
      setProfileID(newProfile.id);
    }
  }, [])

  return profileId;
}


export { useProfile };
