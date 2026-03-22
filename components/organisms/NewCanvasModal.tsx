// External Imports
import { useTranslations } from "next-intl";

// Internal Imports
import { useProfile } from "@/hooks/useProfile";
import { useCanvasStore } from "@/stores/canvas/canvasStore";
import { CursorStatus } from "@/types/enums";
import { Button } from "@/components/atoms/Button/Button";

const NewCanvasModal = () => {
  const t = useTranslations('actions');
  const profileId = useProfile();
  const setCursorStatus = useCanvasStore.getState().setCursorStatus;
  const clearObjects = useCanvasStore.getState().clearObjects;

  const restoreDefaultCursor = () => {
    setCursorStatus(profileId, CursorStatus.Default);
  }

  const clearCanvas = () => {
    setCursorStatus(profileId, CursorStatus.Default);
    clearObjects();
  }

  return (
    <dialog id="new-canvas-modal" className="modal cursor-default z-60">
      <div className="modal-box flex flex-col pt-6">
        <h3 className="font-bold text-2xl divider-center divider">{t('newCanvas.label')}</h3>
        <div className="font-bold text-sm text-center my-4">
          {t('newCanvas.modal')}
        </div>
        <div className="flex gap-12 justify-center my-2">
          <form method="dialog">
            <Button className="btn btn-sm btn-outline btn-error" onClick={restoreDefaultCursor}> {t('cancel')}</Button>
          </form>
          <form method="dialog">
            <Button className="btn btn-sm btn-outline btn-success" onClick={clearCanvas}>{t('confirm')}</Button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={restoreDefaultCursor}>
        <button>close</button>
      </form>
    </dialog>
  )
}

export default NewCanvasModal;
