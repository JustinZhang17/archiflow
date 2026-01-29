// Internal Imports
import { GlobalTheme } from "@/types/enums";
import { ProfileProps } from "./profile";

// Used in Zustand store for settings management
type SettingsState = {
  theme: GlobalTheme;
  setTheme: (theme: GlobalTheme) => void;
}

export type { SettingsState };
