import React, { useRef } from "react";
import { DragControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; // Import useFrame for animation loop

import * as THREE from "three";

const ANIMATION_SPEED = 0.2;

type DraggableProps = {
  children: React.ReactNode;
};

const Draggable = ({ children }: DraggableProps) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const targetPosition = useRef(new THREE.Vector3()); // Stores the snapped target position
  const isDragging = useRef(false); // To track if dragging is active

  const handleDragStart = () => {
    isDragging.current = true;
    if (!groupRef.current) return;
    targetPosition.current.copy(groupRef.current.position);
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (!groupRef.current) return;
    groupRef.current.position.copy(targetPosition.current);
  };

  const handleDrag = (localMatrix: THREE.Matrix4) => {
    const obj = groupRef.current;
    if (!obj) return;

    // Decompose the incoming localMatrix to get the dragged position
    const currentDragPosition = new THREE.Vector3();
    localMatrix.decompose(
      currentDragPosition,
      new THREE.Quaternion(),
      new THREE.Vector3()
    );

    // Snap X and Z of the *dragged* position to nearest 0.5
    const snappedX = Math.round(currentDragPosition.x * 2) / 2;
    const snappedZ = Math.round(currentDragPosition.z * 2) / 2;

    // Update the targetPosition
    targetPosition.current.set(snappedX, obj.position.y, snappedZ); // Maintain current Y
  };

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
