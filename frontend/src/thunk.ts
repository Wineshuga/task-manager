import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

export const signOut = () => {
  localStorage.clear()
  window.location.href = "/"
}

export interface ProjectPayload {
  title: string;
  description: string;
}

export const fetchProjects = async (token: string) => {
  const res = await axios.get(`${API_URL}/api/projects/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createProject = async (
  payload: ProjectPayload,
  token: string
) => {
  const res = await axios.post(`${API_URL}/api/projects/`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


