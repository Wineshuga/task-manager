import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import { createProject, fetchProjects, signOut } from "../thunk";

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

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProjects(token);
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async () => {
    setBtnLoading(true);
    try {
      await createProject(inputValue, token);
      toast.success("New project created!");
      loadProjects();
      setShowCreateProject(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <header className="border-b border-line bg-surface">
        <div className="max-w-3xl mx-auto flex justify-between items-center px-5 py-4">
          <span className="font-heading font-bold text-lg">
            Welcome, {user?.username || "User"}!
          </span>
          <button type="button" className="btn btn-outline" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-10">
        <div className="flex flex-wrap gap-4 justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="text-sm text-muted mt-1">
              Select a project to view and manage its tasks.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowCreateProject(true)}
          >
            + New Project
          </button>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted text-center mt-16">Loading...</p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {projects.length === 0 ? (
              <li className="card sm:col-span-2 p-10 text-center text-sm text-muted">
                You have no projects yet. Create one to get started.
              </li>
            ) : (
              projects.map((project, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="card w-full h-full text-left p-5 cursor-pointer transition hover:border-ink/40 hover:shadow-md"
                    onClick={() =>
                      navigate(`/projects/${project.id}`, { state: project })
                    }
                  >
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    <span className="inline-block text-xs font-medium text-ink mt-4">
                      View tasks →
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </section>

      {showCreateProject && (
        <CreateProjectModal
          showCreateProject={showCreateProject}
          setShowCreateProject={setShowCreateProject}
          inputValue={inputValue}
          setInputValue={setInputValue}
          createProject={handleCreateProject}
          btnLoading={btnLoading}
        />
      )}
    </main>
  );
};

export default Projects;
