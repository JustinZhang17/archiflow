// External Imports
import { useTranslations } from "next-intl";

// Internal Imports
import { useProfile } from "@/hooks/useProfile";
import { useCanvasStore } from "@/stores/canvas/canvasStore";
import { CursorStatus } from "@/types/enums";
import LanguagePicker from "@/components/atoms/LanguagePicker/LanguagePicker";
import SettingEntry from "@/components/atoms/SettingEntry/SettingEntry";
import SettingTitle from "@/components/atoms/SettingTitle/SettingTitle";
import ThemePicker from "@/components/atoms/ThemePicker/ThemePicker";

// TODO: Change to follow good formatting
const SettingsModal = () => {
  const t = useTranslations();
  const profileId = useProfile();
  const setCursorStatus = useCanvasStore.getState().setCursorStatus;

  const restoreDefaultCursor = () => {
    setCursorStatus(profileId, CursorStatus.Default);
  }

  return (
    <dialog id="settings-modal" className="modal cursor-default z-60">
      <div className="modal-box flex flex-col pt-6">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={restoreDefaultCursor}>✕</button>
        </form>
        {/* TODO: Change to use i18n*/}
        <SettingTitle>Preferences</SettingTitle>
        <SettingEntry title={t('settings.language.title')} description={t('settings.language.description')}>
          <LanguagePicker />
        </SettingEntry>
        <SettingEntry title={t('settings.theme.title')} description={t('settings.theme.description')}>
          <ThemePicker />
        </SettingEntry>

      </div>
      <form method="dialog" className="modal-backdrop" onClick={restoreDefaultCursor}>
        <button>close</button>
      </form>
    </dialog>
  )
}

export default SettingsModal;
