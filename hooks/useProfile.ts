// External Imports
import { useState, useEffect, useRef, useMemo } from "react";

// Internal Imports;
import { useCanvasStore } from "@/stores/canvas/canvasStore";
import { ProfileProps } from "@/types/profile";
import { CanvasView, CursorStatus, GlobalTheme } from "@/types/enums";
import { generateUUID } from "@/helpers/generators";

// TODO: Figure out if I should move this into the constants folder
const PROFILE_STORAGE_KEY = "user-profile-id";

const useProfile = (): ProfileProps["id"] => {
  const profiles = useCanvasStore((state) => state.profiles);
  const [profileId, setProfileID] = useState<ProfileProps["id"]>("");
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const savedProfileId = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (savedProfileId && profiles[savedProfileId]) {
      setProfileID(savedProfileId);
    } else {
      // If no profile is found, create a default one
      const newProfile: ProfileProps = {
        id: generateUUID(),
        // TODO: Change this name later to be dynamic, this is the display during collab sessions 
        name: "Creator",
        // TODO: Changed this color later to be dynamic
        color: "#ff6600",
        // TODO: Change camera defaults later to match the selected view
        camera: {
          position: [0, 0, 0],
          zoom: 1,
          rotation: [0, 0, 0],
        },
        view: CanvasView.TopDown,
        theme: GlobalTheme.Light,
        cursor: {
          status: CursorStatus.Default,
          position: { x: 0, y: 0 }
        }
      };

      // Save to local storage
      localStorage.setItem(PROFILE_STORAGE_KEY, newProfile.id);

      // Add to global store
      useCanvasStore.getState().addProfile(newProfile);
      setProfileID(newProfile.id);
    }
  }, [profiles]);

  return useMemo(() => profileId, [profileId]);
}


export { useProfile };



