import axios from 'axios';

// === CONFIGURATION DE L'API ===
const API_URL = "https://project-management-c5kp.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Utilise l'API de production par défaut
const API_BASE = import.meta.env.DEV ? API_DEV : API_PROD;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========================
// AUTH
// ========================
export const login = (username, password) => {
  return api.post('/auth/login', { username, password });
};

export const logout = (refreshToken) => {
  return api.post('/auth/logout', { refresh: refreshToken });
};

// ========================
// USERS
// ========================
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// ========================
// PROJECTS
// ========================
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// ========================
// TASKS
// ========================
export const getTasks = () => api.get('/tasks');
export const getTasksByProject = (projectId) => api.get(`/tasks?project=${projectId}`);
export const getTask = (id) => api.get(`/tasks/${id}`);
export const createTask = (data) => api.post('/tasks', data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

// ========================
// COMMENTS
// ========================
export const getComments = () => api.get('/comments');
export const getCommentsByTask = (taskId) => api.get(`/comments/task/${taskId}`);
export const getCommentsByUser = (userId) => api.get(`/comments/user/${userId}`);
export const getComment = (id) => api.get(`/comments/${id}`);
export const createComment = (data) => api.post('/comments', data);
export const updateComment = (id, data) => api.put(`/comments/${id}`, data);
export const deleteComment = (id) => api.delete(`/comments/${id}`);

// ========================
// TENANTS
// ========================
export const getTenants = () => api.get('/tenants');
export const getTenant = (id) => api.get(`/tenants/${id}`);
export const createTenant = (data) => api.post('/tenants', data);
export const updateTenant = (id, data) => api.put(`/tenants/${id}`, data);
export const deleteTenant = (id) => api.delete(`/tenants/${id}`);

export default api;