// Internal Imports
import { ObjectProps } from "@/types/object";
import { ProfileProps } from "@/types/profile";
import { CursorStatus } from "@/types/enums";
import { CursorProps } from "@/types/cursor";

// Used in Zustand store for management
type CanvasState = {
  // Data
  objects: Record<ObjectProps['id'], ObjectProps>;
  profiles: Record<ObjectProps['id'], ProfileProps>;

  // Actions
  addObject: (object: ObjectProps) => void;
  updateObject: (id: ObjectProps['id'], updatedProps: Partial<ObjectProps>) => void;
  removeObject: (id: ObjectProps['id']) => void;

  addProfile: (profile: ProfileProps) => void;
  updateProfile: (id: ProfileProps['id'], updatedProps: Partial<ProfileProps>) => void;
  removeProfile: (id: ProfileProps['id']) => void;

  setCursorStatus: (id: ProfileProps['id'], status: CursorStatus) => void;
  setCursorPosition: (id: ProfileProps['id'], position: CursorProps['position']) => void;
}

export type { CanvasState };

