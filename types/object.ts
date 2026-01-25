type ObjectProps = {
  id: string; // Unique identifier for the Object 
  name: string; // Type of the Object 
  position: { x: number, z: number }; // Position of the Object in 3D space
  rotation: { y: number }; // Rotation of the Object in 3D space 
  scale: [number, number, number]; // Scale of the Object in 3D space
};

export type { ObjectProps };
