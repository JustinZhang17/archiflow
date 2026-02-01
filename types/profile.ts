import { CursorProps } from "@/types/cursor";
import { ObjectProps } from "@/types/object";
import { GlobalTheme } from "@/types/enums";
import { CanvasView } from "@/types/enums";
import { CameraControlsProps } from "@/types/camera";

type ProfileProps = {
  id: string;
  name: string;
  color: string;
  camera: CameraControlsProps;
  draggedObject: ObjectProps | null;
  focusedObject: Record<ObjectProps['instanceId'], ObjectProps> | null;
  view: CanvasView;
  theme: GlobalTheme;
  cursor: CursorProps;
  // TODO: Other props to consider: role 'editor' | 'viewer'; settings preferences
}

export type { ProfileProps };
