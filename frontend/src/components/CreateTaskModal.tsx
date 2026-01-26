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
            placeholder="Enter task title"
          />
        </div>
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
        <div>
          <label htmlFor="due_date">Due Date</label>
          <input
            className="border p-2 text-sm w-full my-2"
            type="date"
            value={inputValue.due_date}
            onChange={(e) =>
              setInputValue({ ...inputValue, due_date: e.target.value })
            }
            name="due_date"
            placeholder="Enter due date"
          />
        </div>
        <button
          type="button"
          className="bg-amber-700 p-2 w-40 text-white text-sm cursor-pointer"
          onClick={createTask}
          disabled={btnLoading}
        >
          Add
        </button>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
