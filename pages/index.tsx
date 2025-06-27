// External Imports
import { Geist, Geist_Mono } from "next/font/google";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

// Internal Imports
import Camera from "@/components/organisms/three/camera";
import Ground from "@/components/organisms/three/ground";
import Lighting from "@/components/organisms/three/lighting";
import Draggable from "@/components/molecules/draggable";
import Sidebar from "@/components/organisms/sidebar";
import BottomBar from "@/components/organisms/bottombar";
import TopBar from "@/components/organisms/topbar";

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

export default function Home() {
  const [view, setView] = useState<"top-down" | "isometric">("top-down");

  const toggleView = () => {
    setView((prev) => (prev === "top-down" ? "isometric" : "top-down"));
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} h-screen flex`}
    >
      <button
        className="absolute top-4 right-4 bg-black text-white p-2 rounded z-50"
        onClick={toggleView}
      >
        Toggle View ({view === "top-down" ? "Isometric" : "Top-Down"})
      </button>

      <Sidebar />
      <BottomBar />
      <TopBar />

      <Canvas dpr={[1, 2]} shadows className="h-screen">
        <Camera view={view} planeY={PLANE} height={CAM_HEIGHT} />

        <Ground planeY={PLANE} />

        <Draggable>
          <mesh position={[0, PLANE + 0.5, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="tomato" />
          </mesh>
        </Draggable>

        <Draggable>
          <mesh position={[0, PLANE + 0.5, 2]}>
            <coneGeometry args={[0.5, 1]} />
            <meshStandardMaterial color="plum" />
          </mesh>
        </Draggable>

        <Draggable>
          <mesh position={[0, PLANE + 0.5, -2]}>
            <cylinderGeometry args={[0.5, 0.5]} />
            <meshStandardMaterial color="teal" />
          </mesh>
        </Draggable>

        <Draggable>
          <mesh position={[0, PLANE + 0.5, -4]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="teal" />
          </mesh>
        </Draggable>

        <Draggable>
          <mesh position={[0, PLANE + 0.75, 4]}>
            <capsuleGeometry args={[0.5, 1, 20, 20]} />
            <meshStandardMaterial color="teal" />
          </mesh>
        </Draggable>

        <Lighting />
      </Canvas>
    </div>
  );
}
