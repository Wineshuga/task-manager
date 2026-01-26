import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

interface Project {
  id: string;
  title: string;
  description: string;
}

const Projects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = user.accessToken;

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/projects/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    setBtnLoading(true);
    const payload = {
      title: inputValue.title,
      description: inputValue.description,
    };
    try {
      await axios.post(`${API_URL}/api/projects/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("New project created!");
      fetchProjects();
      setShowCreateProject(false);
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <section className="lg:w-1/2 mx-auto md:p-10 p-5 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <button
          type="button"
          className="bg-amber-700 p-2 sm:w-40 text-white text-sm cursor-pointer"
          onClick={() => setShowCreateProject(true)}
        >
          Create Project
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-10">
          {projects.length === 0 ? (
            <li className="text-center">You have no projects</li>
          ) : (
            projects.map((project, index) => (
              <li key={index} className="my-2">
                <button
                  type="button"
                  className="w-full text-left cursor-pointer"
                  onClick={() =>
                    navigate(`/projects/${project.id}`, { state: project })
                  }
                >
                  <div className="shadow-md p-3">
                    <h3 className=" font-semibold">{project.title}</h3>
                    <p className="text-sm">{project.description}</p>
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
      {showCreateProject && (
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
      )}
    </section>
  );
};

export default Projects;
