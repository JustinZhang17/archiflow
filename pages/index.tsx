// External Imports
import { Geist, Geist_Mono } from "next/font/google";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

// Internal Imports
import Cursor from "@/components/atoms/Cursor/Cursor";
import Camera from "@/components/organisms/three/Camera";
import Ground from "@/components/organisms/three/Ground";
import Lighting from "@/components/organisms/three/Lighting";
import Draggable from "@/components/molecules/Draggable";
import Sidebar from "@/components/organisms/Sidebar";
import BottomBar from "@/components/organisms/Bottombar";
import TopBar from "@/components/organisms/Topbar";

import { ObjectProps } from "@/types/object";
import { ModelRegistry } from "@/helpers/modelRegistry";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const PLANE = 0; // The Y position of the ground plane
const CAM_HEIGHT = 100; // Height of the camera in top-down view

const Home = () => {
  const [view, setView] = useState<"top-down" | "isometric">("top-down");
  const [cursorStatus, setCursorStatus] = useState<"default" | "hovered">("default");

  // HACK: Current Easy State Management
  const [spawnedObjects, setSpawnedObjects] = useState<ObjectProps[]>([]);

  const addObject = (obj: ObjectProps) => {
    setSpawnedObjects((prev) => [...prev, obj]);
  }

  const toggleView = () => {
    setView((prev) => (prev === "top-down" ? "isometric" : "top-down"));
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} h-screen flex`}
    >
      <button
        className="absolute top-4 right-4 bg-black text-white p-2 text-xs rounded z-50"
        onClick={toggleView}
      >
        Toggle View ({view === "top-down" ? "Isometric" : "Top-Down"})
      </button>

      {/* TODO: Convert this to one component, so the tabs can be moved around*/}
      <Sidebar addObject={addObject} />
      <BottomBar />
      <TopBar />

      <Canvas dpr={[1, 2]} shadows className="h-screen">
        <Camera view={view} planeY={PLANE} height={CAM_HEIGHT} />

        <Ground planeY={PLANE} />

        {spawnedObjects.map((obj: ObjectProps, index: number) => {
          const ModelComponent = ModelRegistry[obj.name];
          return (
            <Draggable key={index}>
              <ModelComponent
                position={[obj.position.x, PLANE, obj.position.z]}
                rotation={[0, (obj.rotation.y * Math.PI) / 180, 0]}
                scale={obj.scale}
                onPointerOver={() => setCursorStatus("hovered")}
                onPointerOut={() => setCursorStatus("default")}
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


export default Home;
