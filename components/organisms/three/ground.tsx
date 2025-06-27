// External Imports
import { Grid } from "@react-three/drei";

type GroundProps = {
  planeY: number;
};

const Ground = ({ planeY }: GroundProps) => {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: "#6f6f6f",
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: "#9d4b4b",
    fadeDistance: 1000,
    fadeStrength: 0,
    infiniteGrid: true,
  };
  return <Grid position={[0, planeY, 0]} args={[100, 100]} {...gridConfig} />;
};

export default Ground;
