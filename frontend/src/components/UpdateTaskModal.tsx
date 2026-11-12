import Modal from "./Modal";

export interface TaskInput {
  title: string;
  status: string;
  due_date: string;
}

interface UpdateTaskModalProps {
  showUpdateTask: boolean;
  setShowUpdateTask: React.Dispatch<React.SetStateAction<boolean>>;

  inputValue: TaskInput;
  setInputValue: React.Dispatch<React.SetStateAction<TaskInput>>;

  updateTask: () => void;
  btnLoading: boolean;
}
const UpdateTaskModal = ({
  showUpdateTask,
  setShowUpdateTask,
  inputValue,
  setInputValue,
  updateTask,
  btnLoading,
}: UpdateTaskModalProps) => {
  return (
    <Modal
      isOpen={showUpdateTask}
      title={"Update Task Status"}
      onClose={() => setShowUpdateTask(false)}
    >
      <form>
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
        <button
          type="button"
          className="btn btn-primary w-full mt-2"
          onClick={updateTask}
          disabled={btnLoading}
        >
          {btnLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </Modal>
  );
};

export default UpdateTaskModal;
