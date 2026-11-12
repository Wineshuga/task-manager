import Modal from "./Modal";

export interface TaskInput {
  title: string;
  status: string;
  due_date: string;
}

interface CreateTaskModalProps {
  showCreateTask: boolean;
  setShowCreateTask: React.Dispatch<React.SetStateAction<boolean>>;

  inputValue: TaskInput;
  setInputValue: React.Dispatch<React.SetStateAction<TaskInput>>;

  createTask: () => void;
  btnLoading: boolean;
}

const CreateTaskModal = ({
  showCreateTask,
  setShowCreateTask,
  inputValue,
  setInputValue,
  createTask,
  btnLoading,
}: CreateTaskModalProps) => {
  return (
    <Modal
      isOpen={showCreateTask}
      title={"Add Task"}
      onClose={() => setShowCreateTask(false)}
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
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="label">Status</label>
          <select
            name="status"
            id="status"
            className="input"
            value={inputValue.status}
            onChange={(e) =>
              setInputValue({ ...inputValue, status: e.target.value })
            }
          >
            <option value="">Select a status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="due_date" className="label">Due Date</label>
          <input
            className="input"
            type="date"
            value={inputValue.due_date}
            onChange={(e) =>
              setInputValue({ ...inputValue, due_date: e.target.value })
            }
            id="due_date"
            name="due_date"
            placeholder="Enter due date"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-full mt-2"
          onClick={createTask}
          disabled={btnLoading}
        >
          {btnLoading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
