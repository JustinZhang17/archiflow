import React, { useRef, useCallback } from "react";
import { DragControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; // Import useFrame for animation loop

import * as THREE from "three";

// TODO: Have a constants and Enums file for these values
const ANIMATION_SPEED = 0.3;
const SNAP_INTERVAL = 0.5;

type DraggableProps = {
  children: React.ReactNode;
};

const Draggable = ({ children }: DraggableProps) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const targetPosition = useRef(new THREE.Vector3()); // Stores the snapped target position
  const isDragging = useRef(false); // To track if dragging is active

  const tempVector = useRef(new THREE.Vector3());
  const tempQuaternion = useRef(new THREE.Quaternion());
  const tempScale = useRef(new THREE.Vector3(1, 1, 1));

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
    if (!groupRef.current) return;
    targetPosition.current.copy(groupRef.current.position);

    // TODO: Use this to update the state of the object in state management library
    console.log("Drag started:", groupRef.current.position);
  }, []);

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
    if (!groupRef.current) return;
    groupRef.current.position.copy(targetPosition.current);

    // Ensure the matrix is updated to match the new position (preventing snapping offset issues)
    groupRef.current.matrix.compose(
      groupRef.current.position,
      groupRef.current.quaternion,
      groupRef.current.scale
    );

    // TODO: Use this to update the state of the object in state management library
    console.log("Drag ended:", groupRef.current.position);
  }, []);


  const handleDrag = useCallback((localMatrix: THREE.Matrix4) => {
    const obj = groupRef.current;
    const tar = targetPosition.current;
    if (!obj) return;

    // Decompose the incoming localMatrix to get the dragged position
    localMatrix.decompose(
      tempVector.current,
      tempQuaternion.current,
      tempScale.current
    );

    // Snap X and Z of the *dragged* position to nearest 0.5
    const snappedX = Math.round(tempVector.current.x / SNAP_INTERVAL) * SNAP_INTERVAL;
    const snappedZ = Math.round(tempVector.current.z / SNAP_INTERVAL) * SNAP_INTERVAL;

    // Update the targetPosition
    if (snappedX !== tar.x || snappedZ !== tar.z) {
      tar.set(snappedX, obj.position.y, snappedZ); // Maintain current Y
    }
  }, []);

  useFrame(() => {
    const obj = groupRef.current;
    if (!obj) return;
    if (!isDragging.current) return;

    obj.position.lerp(targetPosition.current, ANIMATION_SPEED);

    // Rebuild matrices to ensure consistency if the object's position has changed
    obj.matrix.compose(obj.position, obj.quaternion, obj.scale);
  });

  return (
    <DragControls
      autoTransform={false} // We handle the position transformation manually
      ref={groupRef}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      axisLock="y" // Lock movement to X and Z axes
    >
      {children}
    </DragControls>
  );
};

export default Draggable;
