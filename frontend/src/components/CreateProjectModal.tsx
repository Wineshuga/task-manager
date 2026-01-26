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
        <div>
          <label htmlFor="title">Title:</label>
          <input
            className="border p-2 text-sm w-full my-2"
            type="text"
            value={inputValue.title}
            onChange={(e) =>
              setInputValue({ ...inputValue, title: e.target.value })
            }
            name="title"
            placeholder="Enter project title"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            className="border p-2 text-sm w-full my-2"
            type="text"
            value={inputValue.description}
            onChange={(e) =>
              setInputValue({ ...inputValue, description: e.target.value })
            }
            name="description"
            placeholder="Enter description"
          />
        </div>
        <button
          type="button"
          className="bg-amber-700 p-2 w-40 text-white text-sm cursor-pointer"
          onClick={createProject}
          disabled={btnLoading}
        >
          Create
        </button>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
