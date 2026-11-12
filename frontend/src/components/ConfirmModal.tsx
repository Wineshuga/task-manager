import Modal from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  btnLoading: boolean;
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  btnLoading,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p className="text-sm text-muted">{message}</p>
      <div className="flex gap-3 mt-8">
        <button
          type="button"
          className="btn btn-outline flex-1"
          onClick={onCancel}
          disabled={btnLoading}
        >
          No
        </button>
        <button
          type="button"
          className="btn btn-danger flex-1"
          onClick={onConfirm}
          disabled={btnLoading}
        >
          {btnLoading ? "Deleting..." : "Yes"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
