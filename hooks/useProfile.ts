// External Imports
import { useEffect, useMemo } from "react";

// Internal Imports;
import { useCanvasStore } from "@/stores/canvas/canvasStore";
import { useProfileStore } from "@/stores/profileStore";
import { ProfileProps } from "@/types/profile";
import { generateProfile } from "@/helpers/generators";

const useProfile = (): ProfileProps["id"] => {
  const profiles = useCanvasStore((state) => state.profiles);
  const profileId = useProfileStore((state) => state.profileId);

  useEffect(() => {
    if (profileId && profiles[profileId]) {
      useProfileStore.getState().setProfileId(profileId);
    } else {
      // If no profile is found, create a default one
      const newProfile: ProfileProps = generateProfile();
      useProfileStore.getState().setProfileId(newProfile.id);
      useCanvasStore.getState().addProfile(newProfile);
    }
  }, [profiles]);

  return useMemo(() => profileId, [profileId]);
}

export { useProfile };



