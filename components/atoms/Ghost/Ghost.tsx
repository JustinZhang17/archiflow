// External Imports
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Internal Imports
import { ModelRegistry } from "@/helpers/modelRegistry";
import { CANVAS } from "@/constants/canvas";
import { useProfile } from "@/hooks/useProfile";
import { useCanvasStore } from "@/stores/canvas/canvasStore";

const Ghost = () => {
  const profileId = useProfile();

  const draggedObject = useCanvasStore((state) => state.profiles[profileId]?.draggedObject);
  const setDraggedObject = useCanvasStore.getState().updateProfile;

  const groupRef = useRef<THREE.Group | null>(null);
  const targetPosition = useRef(new THREE.Vector3()); // Stores the snapped target position

  const ModelComponent = draggedObject ? ModelRegistry[draggedObject.fileName] : null;

  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), CANVAS.PLANE);

  // const 

  useFrame(({ pointer, camera, raycaster }) => {
    const obj = groupRef.current;
    const tar = targetPosition.current;
    if (!obj) return;

    raycaster.setFromCamera(pointer, camera)
    raycaster.ray.intersectPlane(plane, tar)

    const snappedX = Math.round(tar.x / CANVAS.SNAP_INTERVAL) * CANVAS.SNAP_INTERVAL;
    const snappedZ = Math.round(tar.z / CANVAS.SNAP_INTERVAL) * CANVAS.SNAP_INTERVAL;

    // Update the targetPosition
    if (snappedX === tar.x && snappedZ === tar.z) return;
    tar.set(snappedX, obj.position.y, snappedZ); // Maintain current Y

    obj.position.lerp(tar, CANVAS.ANIMATION_SPEED);

    // Rebuild matrices to ensure consistency if the object's position has changed
    obj.matrix.compose(obj.position, obj.quaternion, obj.scale);
  });

  if (!draggedObject || !ModelComponent) return null;

  return (
    <ModelComponent
      ref={groupRef}
      onPointerMove={() => setDraggedObject(profileId, { draggedObject: { ...draggedObject, position: { x: targetPosition.current.x, z: targetPosition.current.z } } })}
      position={[draggedObject.position.x, CANVAS.PLANE, draggedObject.position.z]}
      rotation={[0, (draggedObject.rotation.y * Math.PI) / 180, 0]}
      scale={draggedObject.scale}
    />
  )
}

export default Ghost;
