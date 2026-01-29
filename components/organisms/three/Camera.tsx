// External Imports
import { useEffect, useRef } from "react";
import { CameraControls, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

// Internal Imports
import { CanvasView } from "@/types/enums";

type CameraProps = {
  view: CanvasView;
  planeY: number;
  height: number;
};

const Camera = ({ view, planeY, height }: CameraProps) => {
  const cameraControlsRef = useRef<CameraControls | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);

  // Intersection detection setup
  const raycaster = useRef(new THREE.Raycaster());
  const intersectionPoint = useRef(new THREE.Vector3());
  const groundPlane = useRef(
    new THREE.Plane(new THREE.Vector3(0, 1, 0), planeY)
  );

  useEffect(() => {
    if (!cameraRef.current) return;
    const camera = cameraRef.current;

    // Get Camera Direction
    const currentCameraDirection = new THREE.Vector3();
    camera.getWorldDirection(currentCameraDirection);

    raycaster.current.set(camera.position, currentCameraDirection);

    // Find the intersection between the camera and plane
    const intersect = raycaster.current.ray.intersectPlane(
      groundPlane.current,
      intersectionPoint.current
    );
    const intersectPoint = intersect ? intersectionPoint.current : null;
    if (!intersectPoint) return;

    if (!cameraControlsRef.current) return;
    const controls = cameraControlsRef.current;

    if (view === CanvasView.TopDown) {
      const ang = 0; // 0 degrees for top-down view
      const x = intersectPoint.x;
      const z = intersectPoint.z;

      // set rotations
      controls.rotatePolarTo(ang, true);
      controls.rotateAzimuthTo(ang, true);
      controls.setTarget(x, planeY, z, true); // Set target to the center of the scene
      controls.setPosition(x, planeY + height, z, true);

      // lock rotations for top-down view
      controls.minAzimuthAngle = ang;
      controls.maxAzimuthAngle = ang;
      controls.minPolarAngle = ang;
      controls.maxPolarAngle = ang;
    } else if (view === CanvasView.Isometric) {
      const ang = Math.PI / 4; // 45 degrees for isometric view
      const sin = Math.sin(ang);
      const cos = Math.cos(ang);

      // set rotations
      controls.rotatePolarTo(ang, true);
      controls.rotateAzimuthTo(ang, true);
      controls.setTarget(intersectPoint.x, planeY, intersectPoint.z, true);

      // spherical‐to‐Cartesian conversion
      const x = intersectPoint.x + height * Math.SQRT2 * sin * sin;
      const y = (planeY + height) * Math.SQRT2 * cos;
      const z = intersectPoint.z + height * Math.SQRT2 * sin * cos;
      controls.setPosition(x, y, z, true);

      // lock rotations for isometric view
      controls.minAzimuthAngle = ang;
      controls.maxAzimuthAngle = ang;
      controls.minPolarAngle = ang;
      controls.maxPolarAngle = ang;
    }
  }, [view, planeY, height]);

  return (
    <>
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={[0, planeY + height, 0]}
        zoom={100}

      />
      <CameraControls
        makeDefault
        ref={cameraControlsRef}
        maxAzimuthAngle={0}
        minAzimuthAngle={0}
        maxPolarAngle={0}
        minPolarAngle={0}
        maxZoom={1000}
        minZoom={5}
      />
    </>
  );
};

export default Camera;
