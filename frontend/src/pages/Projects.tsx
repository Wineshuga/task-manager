import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

interface Project {
  title: string;
  description: string;
}

const Projects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
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
      console.log(res.data);
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

  return (
    <section className="w-1/2 mx-auto p-10 border">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <button
          type="button"
          className="bg-amber-700 p-2 w-40 text-white text-sm cursor-pointer"
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
              <li key={index}>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <button type="button">Add Task</button>
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
};

export default Projects;
