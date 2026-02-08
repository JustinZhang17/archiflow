// External Imports
import { useEffect, useRef, useMemo } from "react";

// Internal Imports;
import { useCanvasStore } from "@/stores/canvas/canvasStore";
import { useProfileStore } from "@/stores/profileStore";
import { ProfileProps } from "@/types/profile";
import { CanvasView, CursorStatus, GlobalTheme } from "@/types/enums";
import { generateUUID, generateUsername, generateColor } from "@/helpers/generators";
import { CANVAS } from "@/constants/canvas";

const useProfile = (): ProfileProps["id"] => {
  const profiles = useCanvasStore((state) => state.profiles);
  const profileId = useProfileStore((state) => state.profileId);

  useEffect(() => {
    if (profileId && profiles[profileId]) {
      useProfileStore.getState().setProfileId(profileId);
    } else {
      // If no profile is found, create a default one
      const newProfile: ProfileProps = {
        id: generateUUID(),
        name: generateUsername(),
        color: generateColor(),
        camera: {
          position: [0, CANVAS.PLANE + CANVAS.CAM_HEIGHT, 0],
          zoom: 100,
          rotation: [0, 0, 0],
        },
        draggedObject: null,
        focusedObject: null,
        view: CanvasView.TopDown,
        theme: GlobalTheme.Light,
        cursor: {
          status: CursorStatus.Default,
          position: { x: 0, y: 0 }
        }
      };

      useProfileStore.getState().setProfileId(newProfile.id);
      useCanvasStore.getState().addProfile(newProfile);
    }
  }, [profiles]);

  return useMemo(() => profileId, [profileId]);
}

export { useProfile };



