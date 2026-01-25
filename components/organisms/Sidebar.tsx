// Internal Import;
import { IconCard } from "@/components/molecules/IconCard/IconCard";

import { ObjectProps } from "@/types/object";

type SidebarProps = {
  addObject: (obj: ObjectProps) => void;
}

const OBJECTS: ObjectProps[] = [
  {
    id: "1", // Unique identifier for the Object 
    name: "Bowl", // Type of the Object 
    position: { x: 0, z: 0 }, // Position of the Object in 3D space
    rotation: { y: 0 }, // Rotation of the Object in 3D space 
    scale: [0.5, 0.5, 0.5], // Scale of the Object in 3D space
  }
]

const Sidebar = ({ addObject }: SidebarProps) => {
  return (
    <div className="p-2 border-r border-white">
      {OBJECTS.map((obj: ObjectProps) => (
        <IconCard key={obj.id} name={obj.name} tags={[]} url="https://placehold.co/300x300/png" onMouseDown={() => addObject(obj)} />
      ))}
    </div>
  );
}

export default Sidebar;
