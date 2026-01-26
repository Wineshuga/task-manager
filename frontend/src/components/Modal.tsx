type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <article className="bg-white rounded-lg w-full max-w-md p-6">
        <header className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </header>

        {children}
      </article>
    </section>
  );
};

export default Modal;
