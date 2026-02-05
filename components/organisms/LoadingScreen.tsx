// External Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const SIZE = 6;
const BORDER_WIDTH = SIZE / 40;

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

const Loading = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) setIsLoading(true);
    };

    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath, router.events]);

  return !isLoading ? null : <LoadingScreen />;
};

export { LoadingScreen, Loading };

