// Internal Import
import { useProfile } from "@/hooks/useProfile";
import { useCanvasStore } from "@/stores/canvas/canvasStore";
import { CursorStatus } from "@/types/enums";
import LanguagePicker from "@/components/atoms/LanguagePicker/LanguagePicker";

// TODO: Change to follow good formatting
const SettingsModal = () => {
  const profileId = useProfile();
  const setCursorStatus = useCanvasStore.getState().setCursorStatus;

  const restoreDefaultCursor = () => {
    setCursorStatus(profileId, CursorStatus.Default);
  }

  return (
    <dialog id="settings-modal" className="modal cursor-default z-60">
      <div className="modal-box flex flex-col">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={restoreDefaultCursor}>✕</button>
        </form>
        <div className="flex w-full bg-red-400 justify-between">
          {/* TODO: Optimize this into a formal component (ie. look at Notion's Settings as an example)*/}
          Language:
          <LanguagePicker
            className="select select-sm w-30 "
          />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={restoreDefaultCursor}>
        <button>close</button>
      </form>
    </dialog>
  )
}

export default SettingsModal;
