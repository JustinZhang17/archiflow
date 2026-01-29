// External Imports
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Internal Imports
import { SettingsState } from "@/types/settings";
import { GlobalTheme } from "@/types/enums";

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: GlobalTheme.System,
      setTheme: (theme: GlobalTheme) => set({ theme: theme })
    }),
    { name: "settings-storage" }
  )
)


export { useSettingsStore };
