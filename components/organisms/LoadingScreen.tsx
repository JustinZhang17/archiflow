// External Imports
import { ReactNode, useEffect, useState, createContext } from "react";
import { useTranslations } from "next-intl";

// Internal Imports
import { useCanvasStore } from "@/stores/canvas/canvasStore";
import { useProfileStore } from "@/stores/profileStore";
import { generateProfile } from "@/helpers/generators";
import { ProfileProps } from "@/types/profile";

const SIZE = 6;
const BORDER_WIDTH = SIZE / 40;

// TODO: Check if this is needed
const LoadingContext = createContext(false);

const LoadingScreen = () => {
  const t = useTranslations();
  const faceBase = "absolute h-full w-full border-neutral bg-neutral/10";

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-90 gap-6 bg-base-100/80 backdrop-blur-sm">
      <div className="animate-pulse p-8">
        <style>{`
        @keyframes cube-spin {
          0% { transform: rotate(45deg) rotateX(-25deg) rotateY(25deg); }
          50% { transform: rotate(45deg) rotateX(-385deg) rotateY(25deg); }
          100% { transform: rotate(45deg) rotateX(-385deg) rotateY(385deg); }
        }
       
        .animate-cube-3d {
          animation: cube-spin 4s infinite ease;
        }
      `}</style>

        <div className={`relative animate-cube-3d [transform-style:preserve-3d]`} style={{ width: `${SIZE}rem`, height: `${SIZE}rem` }}>
          <div className={faceBase} style={{ transform: `translateZ(${SIZE / 2}rem)`, borderWidth: `${BORDER_WIDTH}rem` }} />

          <div className={faceBase} style={{ transform: `translateX(${SIZE / 2}rem) rotateY(90deg)`, borderWidth: `${BORDER_WIDTH}rem` }} />

          <div className={faceBase} style={{ transform: `translateX(-${SIZE / 2}rem) rotateY(90deg)`, borderWidth: `${BORDER_WIDTH}rem` }} />

          <div className={faceBase} style={{ transform: `translateY(${SIZE / 2}rem) rotateX(90deg)`, borderWidth: `${BORDER_WIDTH}rem` }} />

          <div className={faceBase} style={{ transform: `translateY(-${SIZE / 2}rem) rotateX(90deg)`, borderWidth: `${BORDER_WIDTH}rem` }} />

          <div className={faceBase} style={{ transform: `translateZ(-${SIZE / 2}rem)`, borderWidth: `${BORDER_WIDTH}rem` }} />
        </div>
      </div>
      <div className="text-neutral text-7xl font-erode">{t('appName')}</div>
    </div>
  );
}

// TODO: This is a provider, it should not be in components, but I have kept it here for now since I don't know if a provider folder is needed right now, maybe a future thing
const Loading = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const checkHydration = (): boolean => {
      const canvasHydrate = useCanvasStore.persist?.hasHydrated();
      const profileHydrate = useProfileStore.persist?.hasHydrated();

      if (!canvasHydrate || !profileHydrate) return false;

      const profileId = useProfileStore.getState().profileId;
      const profiles = useCanvasStore.getState().profiles;

      // Create profile if it doesn't exist  
      if (!profileId || !profiles[profileId]) {
        const newProfile: ProfileProps = generateProfile();
        useProfileStore.getState().setProfileId(newProfile.id);
        useCanvasStore.getState().addProfile(newProfile);
        return false;
      }

      setIsMounted(true);
      return true;
    }

    const unsubCanvas = useCanvasStore.persist.onFinishHydration(checkHydration);
    const unsubProfile = useProfileStore.persist.onFinishHydration(checkHydration);

    // HACK: Check if this a good way to hydrate
    while (!checkHydration());

    return () => {
      unsubCanvas();
      unsubProfile();
    }
  }, []);


  if (!isMounted) return <LoadingScreen />;

  return <LoadingContext.Provider value={isMounted}>{children}</LoadingContext.Provider>;
};

export { LoadingScreen, Loading };

