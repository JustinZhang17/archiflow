// TODO: Change to follow good formatting
const SettingsModal = () => {
  return (
    <dialog id="settings-modal" className="modal cursor-default">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="text-lg font-bold">Settings!</h3>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default SettingsModal;
