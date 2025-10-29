import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

// Instance axios avec token dans header si présent
const axiosInstance = axios.create({
  baseURL: API_BASE,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (username, password) => {
  return axios.post(`${API_BASE}/auth/login/`, { username, password });
};

export const logout = (refreshToken) => {
  return axios.post(`${API_BASE}/auth/logout/`, { refresh: refreshToken });
};

// Projects
export const getProjects = () => {
  return axiosInstance.get('/projects/');
};

export const getProjectById = (id) => {
  return axiosInstance.get(`/projects/${id}/`);
};

// Tasks by project id
export const getTasksByProject = (projectId) => {
  return axiosInstance.get(`/tasks/?project=${projectId}`);
};
