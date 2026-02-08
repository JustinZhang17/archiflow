// External Imports
import { useTranslations } from 'next-intl';

// Internal Imports
import { useProfile } from '@/hooks/useProfile';
import { useCanvasStore } from '@/stores/canvas/canvasStore';
import { GlobalTheme } from '@/types/enums';


const ThemePicker = ({ ...props }) => {
  const t = useTranslations('settings.theme.style');

  const profileId = useProfile();

  const profileTheme = useCanvasStore((state) => state.profiles[profileId].theme);
  const setProfileTheme = useCanvasStore.getState().updateProfile;

  const themeEntries = Object.entries(GlobalTheme) as [keyof typeof GlobalTheme, GlobalTheme][];

  return (
    <fieldset className="fieldset" {...props}>
      {themeEntries.map(([name, theme]) => (
        <label key={name} className="flex gap-2 cursor-pointer items-center justify-end">
          {t(name.toLowerCase())}
          <input type="radio" name="theme-radios" className="radio radio-xs theme-controller" value={theme} onChange={() => setProfileTheme(profileId, { theme: theme })} defaultChecked={theme === profileTheme} />
        </label>
      ))}
    </fieldset>
  );
}

export default ThemePicker;
