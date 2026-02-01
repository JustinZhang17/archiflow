// Internal Import
import { useProfile } from "@/hooks/useProfile";
import { useCanvasStore } from "@/stores/canvas/canvasStore";
import { CursorStatus } from "@/types/enums";

// TODO: Change to follow good formatting
const SettingsModal = () => {
  const profileId = useProfile();
  const setCursorStatus = useCanvasStore.getState().setCursorStatus;

  const restoreDefaultCursor = () => {
    setCursorStatus(profileId, CursorStatus.Default);
  }

  return (
    <dialog id="settings-modal" className="modal cursor-default">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={restoreDefaultCursor}>✕</button>
        </form>
        {/* Modal Content goes here */}
      </div>
      <form method="dialog" className="modal-backdrop" onClick={restoreDefaultCursor}>
        <button>close</button>
      </form>
    </dialog>
  )
}

export default SettingsModal;
