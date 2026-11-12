type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <article className="card w-full max-w-md p-6 sm:p-8 shadow-xl">
        <header className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 rounded-full text-muted hover:bg-canvas hover:text-ink transition cursor-pointer"
          >
            ✕
          </button>
        </header>

        {children}
      </article>
    </section>
  );
};

export default Modal;
