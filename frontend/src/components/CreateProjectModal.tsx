import Modal from "./Modal";

export interface ProductInput {
  title: string;
  description: string;
}

interface CreateProjectModalProps {
  showCreateProject: boolean;
  setShowCreateProject: React.Dispatch<React.SetStateAction<boolean>>;

  inputValue: ProductInput;
  setInputValue: React.Dispatch<React.SetStateAction<ProductInput>>;

  createProject: () => void;
  btnLoading: boolean;
}

const CreateProjectModal = ({
  showCreateProject,
  setShowCreateProject,
  inputValue,
  setInputValue,
  createProject,
  btnLoading,
}: CreateProjectModalProps) => {
  return (
    <Modal
      isOpen={showCreateProject}
      title={"Create New Project"}
      onClose={() => setShowCreateProject(false)}
    >
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="label">Title</label>
          <input
            className="input"
            type="text"
            value={inputValue.title}
            onChange={(e) =>
              setInputValue({ ...inputValue, title: e.target.value })
            }
            id="title"
            name="title"
            placeholder="Enter project title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="label">Description</label>
          <input
            className="input"
            type="text"
            value={inputValue.description}
            onChange={(e) =>
              setInputValue({ ...inputValue, description: e.target.value })
            }
            id="description"
            name="description"
            placeholder="Enter description"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-full mt-2"
          onClick={createProject}
          disabled={btnLoading}
        >
          {btnLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
