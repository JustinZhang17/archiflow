// External Imports
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Internal Imports
import { ModelRegistry } from "@/helpers/modelRegistry";
import { ObjectProps } from "@/types/object";

type GhostProps = {
  obj: ObjectProps;
  setObj: (obj: ObjectProps) => void;
  planeY: number;
}

// TODO: Have a constants and Enums file for these values
const ANIMATION_SPEED = 0.3;
const SNAP_INTERVAL = 0.5;

const Ghost = ({ obj, setObj, planeY }: GhostProps) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const targetPosition = useRef(new THREE.Vector3()); // Stores the snapped target position
  const ModelComponent = ModelRegistry[obj.name];

  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), planeY)

  useFrame(({ pointer, camera, raycaster }) => {
    const obj = groupRef.current;
    const tar = targetPosition.current;
    if (!obj) return;

    raycaster.setFromCamera(pointer, camera)
    raycaster.ray.intersectPlane(plane, tar)

    const snappedX = Math.round(tar.x / SNAP_INTERVAL) * SNAP_INTERVAL;
    const snappedZ = Math.round(tar.z / SNAP_INTERVAL) * SNAP_INTERVAL;

    // Update the targetPosition
    if (snappedX === tar.x && snappedZ === tar.z) return;
    tar.set(snappedX, obj.position.y, snappedZ); // Maintain current Y

    obj.position.lerp(tar, ANIMATION_SPEED);

    // Rebuild matrices to ensure consistency if the object's position has changed
    obj.matrix.compose(obj.position, obj.quaternion, obj.scale);
  });


  return (
    <ModelComponent
      ref={groupRef}
      // TODO: When I end up using a statement management library, move this logic, so I can just call a func to update the object's position
      onPointerUp={() => setObj({ ...obj, position: { x: targetPosition.current.x, z: targetPosition.current.z } })}
      position={[obj.position.x, planeY, obj.position.z]}
      rotation={[0, (obj.rotation.y * Math.PI) / 180, 0]}
      scale={obj.scale}
    />
  )
}

export default Ghost;
