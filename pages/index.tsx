// External Imports
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from 'next-intl';

// Internal Imports
import { Button } from "@/components/atoms/Button/Button";
import Ghost from "@/components/global/Ghost/Ghost";
import Cursor from "@/components/global/Cursor/Cursor";
import Camera from "@/components/organisms/three/Camera";
import Ground from "@/components/organisms/three/Ground";
import Lighting from "@/components/organisms/three/Lighting";
import Draggable from "@/components/molecules/Draggable/Draggable";
import Sidebar from "@/components/organisms/Sidebar";
import BottomBar from "@/components/organisms/Bottombar";
import TopBar from "@/components/organisms/Topbar";
import SettingsModal from "@/components/organisms/SettingsModal";

import { ObjectProps } from "@/types/object";
import { CanvasView, CursorStatus } from "@/types/enums";
import { CANVAS } from "@/constants/canvas";
import { ModelRegistry } from "@/helpers/modelRegistry";
import { useProfile } from "@/hooks/useProfile";
import { useCanvasStore } from "@/stores/canvas/canvasStore";

// Icons
import { MdSettings } from "react-icons/md";

const Home = () => {
  const t = useTranslations();
  const profileId = useProfile();

  // Debugging: Log the entire canvas store state on any change
  useEffect(() => {
    console.log("Canvas Store Profile Theme:", useCanvasStore.getState().profiles[profileId]?.theme);
    console.log("Canvas Store Profile Camera:", useCanvasStore.getState().profiles[profileId]?.camera);
  }, [useCanvasStore((state) => state.profiles[profileId])]);

  // States
  const profiles = useCanvasStore((state) => state.profiles);
  const objects = useCanvasStore((state) => state.objects);

  // Actions
  const setCursorStatus = useCanvasStore.getState().setCursorStatus;
  const addObject = useCanvasStore.getState().addObject;

  // NOTE: Multipurpose Update: Using local state for draggedObject
  const updateProfile = useCanvasStore.getState().updateProfile;

  // TODO: Do not use this defensive guard, find something more universal in the loading component
  // if (!profileId) return "";

  // Function to add a new object to the canvas
  const handleCursorUp = () => {
    if (profiles[profileId].draggedObject) {
      addObject(profiles[profileId].draggedObject);
      updateProfile(profileId, { draggedObject: null });
    }
  }

  const toggleView = () => {
    const setView = useCanvasStore.getState().updateProfile;
    const newView = profiles[profileId].view === CanvasView.TopDown ? CanvasView.Isometric : CanvasView.TopDown;
    setView(profileId, { view: newView });
  };

  const openSettingsModal = () => {
    const modal = document.getElementById("settings-modal");
    if (modal instanceof HTMLDialogElement) modal.show();

    setCursorStatus(profileId, CursorStatus.Hidden);
  }

  return (
    <div
      className={`font-satoshi h-screen flex`}
      onPointerUp={handleCursorUp}
    >
      <div className="absolute top-4 right-4 z-50">
        <Button onClick={toggleView}>
          {profiles[profileId].view === CanvasView.TopDown ? t('canvasView.isometric') : t('canvasView.topDown')}
        </Button>
      </div>
      <div className="absolute bottom-4 left-4 z-50">
        <Button
          onClick={openSettingsModal}
        >
          <MdSettings size={16} aria-label={t('settings.label')} />
          <span className="text-xs">{t('settings.label')}</span>
        </Button>
      </div>
      <SettingsModal />

      {/* TODO: Convert this to one component, so the tabs can be moved around*/}
      <Sidebar />
      <BottomBar />
      <TopBar />

      <Canvas dpr={[1, 2]} shadows className="h-screen">
        <Camera />
        <Ground />
        <Ghost />

        {Object.values(objects).map((obj: ObjectProps, index: number) => {
          const ModelComponent = ModelRegistry[obj.fileName];
          return (
            <Draggable key={index}>
              <ModelComponent
                position={[obj.position.x, CANVAS.PLANE, obj.position.z]}
                rotation={[0, (obj.rotation.y * Math.PI) / 180, 0]}
                scale={obj.scale}
                onPointerOver={() => setCursorStatus(profileId, CursorStatus.Hovered)}
                onPointerOut={() => setCursorStatus(profileId, CursorStatus.Default)}
              />
            </Draggable>
          )
        })}
        <Lighting />
      </Canvas>
      <Cursor />
    </div>
  );
}

// Load translations (i18n) at build time
export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
  try {
    return {
      props: {
        messages: (await import(`../messages/${locale}.json`)).default
      }
    };
  } catch (error) {
    console.error(`Error loading messages for locale "${locale}":`, error);
    return {
      props: {
        messages: (await import(`../messages/en.json`)).default
      }
    };
  }
}

export default Home;
