import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CreateTaskModal from "../components/CreateTaskModal";
import UpdateTaskModal from "../components/UpdateTaskModal";

interface Task {
  id: string;
  title: string;
  status: string;
  due_date: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const ProjectDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [inputValue, setInputValue] = useState({
    title: "",
    status: "",
    due_date: "",
  });
  const location = useLocation();
  const project = location.state;
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = user.accessToken;

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/api/projects/${project.id}/tasks/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    setBtnLoading(true);
    const payload = {
      title: inputValue.title,
      status: inputValue.status,
      due_date: inputValue.due_date
        ? new Date(inputValue.due_date).toISOString()
        : null,
    };
    try {
      await axios.post(
        `${API_URL}/api/projects/${project.id}/tasks/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("New project created!");
      fetchTasks();
      setInputValue({
        title: "",
        status: "",
        due_date: "",
      });
      setShowCreateTask(false);
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  const updateTask = async () => {
    try {
      await axios.patch(
        `${API_URL}/api/projects/${project.id}/tasks/${taskId}/`,
        { status: inputValue.status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Task updated!");
      setShowUpdateTask(false);
      fetchTasks();
      setInputValue({ ...inputValue, status: "" });
    } catch (error) {
      console.error(error);
      toast.error("couldn't update");
    }
  };

  return (
    <section className="lg:w-1/2 mx-auto md:p-10 p-5 shadow-md">
      <h1 className="sm:text-2xl text-xl font-bold">{project.title}</h1>
      <p className="text-sm">{project.description}</p>
      <button
        type="button"
        className="bg-amber-700 my-2 p-2 sm:w-40 text-white text-sm cursor-pointer"
        onClick={() => setShowCreateTask(true)}
      >
        Add task
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-10">
          {tasks.length === 0 ? (
            <li className="text-center">You have no tasks</li>
          ) : (
            tasks.map((task, index) => (
              <li
                key={index}
                className="my-2 shadow-md p-3 flex justify-between items-center"
              >
                <div>
                  <span>{index + 1}</span>
                  <h3 className=" font-semibold">{task.title}</h3>
                  <p className="text-sm">Status: {task.status}</p>
                  <p className="text-sm">
                    Due Date: {new Date(task.due_date).toDateString()}
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-amber-700 my-2 p-2 text-white text-sm cursor-pointer"
                  onClick={() => {
                    setShowUpdateTask(true);
                    setTaskId(task.id);
                  }}
                >
                  Update Status
                </button>
              </li>
            ))
          )}
        </ul>
      )}
      {showCreateTask && (
        <CreateTaskModal
          showCreateTask={showCreateTask}
          setShowCreateTask={setShowCreateTask}
          inputValue={inputValue}
          setInputValue={setInputValue}
          createTask={createTask}
          btnLoading={btnLoading}
        />
      )}
      {showUpdateTask && (
        <UpdateTaskModal
          showUpdateTask={showUpdateTask}
          setShowUpdateTask={setShowUpdateTask}
          inputValue={inputValue}
          setInputValue={setInputValue}
          updateTask={updateTask}
          btnLoading={btnLoading}
        />
      )}
    </section>
  );
};

export default ProjectDetails;
