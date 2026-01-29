// External imports
import { useTranslations } from "next-intl";

// Internal Imports
import { IconCard } from "@/components/molecules/IconCard/IconCard";
import { ObjectProps } from "@/types/object";

type SidebarProps = {
  setDraggedObject: (obj: ObjectProps) => void;
}


const Sidebar = ({ setDraggedObject }: SidebarProps) => {

  const t = useTranslations('models');

  const OBJECTS: ObjectProps[] = [
    {
      id: "1", // Unique identifier for the Object 
      name: `${t('bowl.name')}`, // Type of the Object 
      fileName: "Bowl", // 3D Model file name
      position: { x: 0, z: 0 }, // Position of the Object in 3D space
      rotation: { y: 0 }, // Rotation of the Object in 3D space 
      scale: [0.5, 0.5, 0.5], // Scale of the Object in 3D space
    }
  ]

  return (
    <div className="p-2 border-r border-white">
      {OBJECTS.map((obj: ObjectProps) => (
        <IconCard key={obj.id} name={obj.name} tags={[]} url="https://placehold.co/300x300/png" onPointerDown={() => setDraggedObject(obj)} />
      ))}
    </div>
  );
}

export default Sidebar;
