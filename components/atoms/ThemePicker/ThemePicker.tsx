// External Imports
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Internal Imports
import { useProfile } from '@/hooks/useProfile';
import { useCanvasStore } from '@/stores/canvas/canvasStore';
import { GlobalTheme } from '@/types/enums';


const ThemePicker = ({ ...props }) => {
  // const t = useTranslations('language');

  const profileId = useProfile();

  // TODO: Deal with this hydration issue
  const profileTheme = useCanvasStore((state) => state.profiles[profileId]?.theme);
  console.log(profileTheme);
  const setProfileTheme = useCanvasStore.getState().updateProfile;

  const themeEntries = Object.entries(GlobalTheme) as [keyof typeof GlobalTheme, GlobalTheme][];

  return (
    // NOTE: HAVE THEME PERSIST ACROSS SESSIONS USING LOCALSTORAGE
    <fieldset className="fieldset" {...props}>
      {themeEntries.map(([name, theme]) => (
        <label key={name} className="flex gap-2 cursor-pointer items-center justify-end">
          {/* TODO: Change Light, Dark, System to use next intl i18n*/}
          {name}
          <input type="radio" name="theme-radios" className="radio radio-xs theme-controller" value={theme} onChange={() => setProfileTheme(profileId, { theme: theme })} defaultChecked={theme == profileTheme} />
        </label>
      ))}
    </fieldset>
  );
}

export default ThemePicker;
