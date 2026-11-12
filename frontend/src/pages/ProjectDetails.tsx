import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateTaskModal from "../components/CreateTaskModal";
import UpdateTaskModal from "../components/UpdateTaskModal";
import ConfirmModal from "../components/ConfirmModal";
import { deleteProject, deleteTask, signOut } from "../thunk";

interface Task {
  id: string;
  title: string;
  status: string;
  due_date: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const STATUS_LABELS: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const STATUS_STYLES: Record<string, string> = {
  todo: "bg-cream text-ink border border-line",
  in_progress: "bg-secondary/20 text-ink",
  done: "bg-primary/15 text-primary-dark",
};

const ProjectDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [inputValue, setInputValue] = useState({
    title: "",
    status: "",
    due_date: "",
  });
  const navigate = useNavigate();
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
      toast.success("Task added!");
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

  const handleDeleteTask = async () => {
    setBtnLoading(true);
    try {
      await deleteTask(project.id, taskId, token);
      toast.success("Task deleted!");
      setShowDeleteTask(false);
      setTaskId("");
      fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete task");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    setBtnLoading(true);
    try {
      await deleteProject(project.id, token);
      toast.success("Project deleted!");
      setShowDeleteProject(false);
      navigate("/projects");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete project");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <header className="border-b border-line bg-surface">
        <div className="max-w-3xl mx-auto flex justify-between items-center px-5 py-4">
          <Link
            to="/projects"
            className="text-sm font-medium text-muted hover:text-ink transition"
          >
            ← All projects
          </Link>
          <button type="button" className="btn btn-outline" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-10">
        <div className="flex flex-wrap gap-4 justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-sm text-muted mt-1">{project.description}</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => setShowDeleteProject(true)}
            >
              Delete Project
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowCreateTask(true)}
            >
              + Add Task
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted text-center mt-16">Loading...</p>
        ) : (
          <ul className="mt-8 space-y-3">
            {tasks.length === 0 ? (
              <li className="card p-10 text-center text-sm text-muted">
                You have no tasks yet. Add one to get started.
              </li>
            ) : (
              tasks.map((task, index) => (
                <li
                  key={index}
                  className="card p-5 flex flex-wrap gap-4 justify-between items-center"
                >
                  <div className="flex items-start gap-4">
                    <span className="h-8 w-8 shrink-0 rounded-full bg-cream border border-line flex items-center justify-center text-xs font-medium text-muted">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            STATUS_STYLES[task.status] ?? STATUS_STYLES.todo
                          }`}
                        >
                          {STATUS_LABELS[task.status] ?? task.status}
                        </span>
                        <p className="text-xs text-muted">
                          Due {new Date(task.due_date).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => {
                        setShowUpdateTask(true);
                        setTaskId(task.id);
                      }}
                    >
                      Update Status
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        setShowDeleteTask(true);
                        setTaskId(task.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </section>

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
      {showDeleteTask && (
        <ConfirmModal
          isOpen={showDeleteTask}
          title="Delete Task"
          message="Are you sure you want to delete this task?"
          onConfirm={handleDeleteTask}
          onCancel={() => {
            setShowDeleteTask(false);
            setTaskId("");
          }}
          btnLoading={btnLoading}
        />
      )}
      {showDeleteProject && (
        <ConfirmModal
          isOpen={showDeleteProject}
          title="Delete Project"
          message="This will delete all tasks for this project. Do you want to proceed?"
          onConfirm={handleDeleteProject}
          onCancel={() => setShowDeleteProject(false)}
          btnLoading={btnLoading}
        />
      )}
    </main>
  );
};

export default ProjectDetails;
