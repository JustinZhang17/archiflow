// External Imports
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from 'next-intl';

// Internal Imports
import LanguagePicker from "@/components/atoms/LanguagePicker/LanguagePicker";
import Ghost from "@/components/atoms/Ghost/Ghost";
import Cursor from "@/components/atoms/Cursor/Cursor";
import Camera from "@/components/organisms/three/Camera";
import Ground from "@/components/organisms/three/Ground";
import Lighting from "@/components/organisms/three/Lighting";
import Draggable from "@/components/molecules/Draggable";
import Sidebar from "@/components/organisms/Sidebar";
import BottomBar from "@/components/organisms/Bottombar";
import TopBar from "@/components/organisms/Topbar";
import SettingsModal from "@/components/organisms/SettingsModal";

import { ObjectProps } from "@/types/object";
import { CanvasView, CursorStatus, GlobalTheme } from "@/types/enums";
import { CANVAS } from "@/constants/canvas";
import { ModelRegistry } from "@/helpers/modelRegistry";
import { useProfile } from "@/hooks/useProfile";
import { useCanvasStore } from "@/stores/canvas/canvasStore";
import { LoadingScreen } from "@/components/organisms/LoadingScreen";

const Home = () => {
  const t = useTranslations();
  const profileId = useProfile();

  // TODO: Add dragged object state into profiles in canvas store (zustand)
  const [draggedObject, setDraggedObject] = useState<ObjectProps | null>(null);

  // Debugging: Log the entire canvas store state on any change
  // useEffect(() => {
  //   console.log("Canvas Store State:", useCanvasStore.getState())
  // }, [useCanvasStore((state) => state)]);

  // States
  const profiles = useCanvasStore((state) => state.profiles);
  const objects = useCanvasStore((state) => state.objects);

  // Actions
  const setCursorStatus = useCanvasStore.getState().setCursorStatus;
  const addObject = useCanvasStore.getState().addObject;

  // Function to add a new object to the canvas
  const handleCursorUp = () => {
    if (draggedObject) {
      addObject(draggedObject);
      setDraggedObject(null);
    }
  }

  const toggleView = () => {
    const setView = useCanvasStore.getState().updateProfile;
    const newView = profiles[profileId].view === CanvasView.TopDown ? CanvasView.Isometric : CanvasView.TopDown;
    setView(profileId, { view: newView });
  };

  const openSettingsModal = () => {
    const modal = document.getElementById("settings-modal");
    if (modal instanceof HTMLDialogElement) modal.showModal();

    setCursorStatus(profileId, CursorStatus.Hidden);
  }

  if (!profiles[profileId]) return <LoadingScreen />;

  return (
    <div
      className={`font-erode h-screen flex`}
      onPointerUp={handleCursorUp}
    >
      <input type="checkbox" value={GlobalTheme.Light} className="absolute bottom-16 left-4 toggle theme-controller" />
      <LanguagePicker />
      <button
        className="absolute top-4 right-4 z-50 btn btn-sm"
        onClick={toggleView}
      >
        {profiles[profileId]?.view === CanvasView.TopDown ? t('canvasView.isometric') : t('canvasView.topDown')}
      </button>
      <button
        className="absolute bottom-4 right-4 z-50 btn btn-sm"
        onClick={openSettingsModal}
      >
        {t('settings')}
      </button>
      <SettingsModal />

      {/* TODO: Convert this to one component, so the tabs can be moved around*/}
      <Sidebar setDraggedObject={setDraggedObject} />
      <BottomBar />
      <TopBar />

      <Canvas dpr={[1, 2]} shadows className="h-screen">
        <Camera />

        <Ground />

        {draggedObject && (
          <Ghost obj={draggedObject} setObj={setDraggedObject} planeY={CANVAS.PLANE} />
        )}

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
    return {
      props: {
        messages: (await import(`../messages/en.json`)).default
      }
    };
  }
}

export default Home;
