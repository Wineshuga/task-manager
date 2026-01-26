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
        <div>
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            id="status"
            className="border p-2 text-sm w-full my-2"
            value={inputValue.status}
            onChange={(e) =>
              setInputValue({ ...inputValue, status: e.target.value })
            }
          >
            <option value="">select</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button
          type="button"
          className="bg-amber-700 p-2 w-40 text-white text-sm cursor-pointer"
          onClick={updateTask}
          disabled={btnLoading}
        >
          Add
        </button>
      </form>
    </Modal>
  );
};

export default UpdateTaskModal;
