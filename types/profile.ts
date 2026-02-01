import { CursorProps } from "@/types/cursor";
import { GlobalTheme } from "@/types/enums";
import { CanvasView } from "@/types/enums";
import { CameraControlsProps } from "@/types/camera";

type ProfileProps = {
  id: string;
  name: string;
  color: string;
  camera: CameraControlsProps;
  view: CanvasView;
  theme: GlobalTheme;
  cursor: CursorProps;
}

export type { ProfileProps };
