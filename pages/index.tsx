// External Imports
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
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
import { useSettingsStore } from "@/stores/settingsStore";
import { useCanvasStore } from "@/stores/canvas/canvasStore";


const Home = () => {
  const t = useTranslations();

  // Check and load user profile
  const profileId = useProfile();

  // TODO: Check if I only should be watching changes to my profile or all profiles
  const profiles = useCanvasStore((state) => state.profiles);

  const models = useCanvasStore((state) => state.models);

  // TODO: Check if pulling out an action instead of a value/data is okay and good practice
  // const setCursorStatus = useCanvasStore.getState().setCursorStatus;

  const [view, setView] = useState<CanvasView>(CanvasView.TopDown);

  // TODO: use usecontext for cursor status, or a global state management solution
  const [cursorStatus, setCursorStatus] = useState<CursorStatus>(CursorStatus.Default);
  const [draggedObject, setDraggedObject] = useState<ObjectProps | null>(null);

  // HACK: Current Easy State Management

  const [spawnedObjects, setSpawnedObjects] = useState<ObjectProps[]>([]);

  // Function to add a new object to the canvas
  const handleCursorUp = () => {
    if (draggedObject) {
      setSpawnedObjects((prev) => [...prev, draggedObject]);
      setDraggedObject(null);
    }
  }

  const toggleView = () => {
    setView((prev) => (prev === CanvasView.TopDown ? CanvasView.Isometric : CanvasView.TopDown));
  };

  const openSettingsModal = () => {
    const modal = document.getElementById("settings-modal");
    if (modal instanceof HTMLDialogElement) modal.showModal();

    setCursorStatus(CursorStatus.Hidden);
  }

  return (
    <div
      className={`font-satoshi h-screen flex`}
      onPointerUp={handleCursorUp}
    >
      <input type="checkbox" value={GlobalTheme.Light} className="absolute bottom-16 left-4 toggle theme-controller" />
      <LanguagePicker />
      <button
        className="absolute top-4 right-4 z-50 btn btn-sm"
        onClick={toggleView}
      >
        {view === CanvasView.TopDown ? t('canvasView.isometric') : t('canvasView.topDown')}
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
        <Camera view={view} planeY={CANVAS.PLANE} height={CANVAS.CAM_HEIGHT} />

        <Ground planeY={CANVAS.PLANE} />

        {draggedObject && (
          <Ghost obj={draggedObject} setObj={setDraggedObject} planeY={CANVAS.PLANE} />
        )}

        {spawnedObjects.map((obj: ObjectProps, index: number) => {
          const ModelComponent = ModelRegistry[obj.fileName];
          return (
            <Draggable key={index}>
              <ModelComponent
                position={[obj.position.x, CANVAS.PLANE, obj.position.z]}
                rotation={[0, (obj.rotation.y * Math.PI) / 180, 0]}
                scale={obj.scale}
                onPointerOver={() => setCursorStatus(CursorStatus.Hovered)}
                onPointerOut={() => setCursorStatus(CursorStatus.Default)}
              />
            </Draggable>
          )
        })}
        <Lighting />
      </Canvas>
      <Cursor cursorStatus={cursorStatus} />
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
