import axios from 'axios';

// ========================
// Base API configuration
// ========================

// Production API URL
const API_URL = "https://project-management-c5kp.onrender.com/api";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Automatically attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

// ========================
// Authentication
// ========================

/**
 * Login user with username and password.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<AxiosResponse>}
 */
export const login = (username, password) => api.post('/auth/login', { username, password });

// ========================
// Users
// ========================
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// ========================
// Projects
// ========================
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// ========================
// Tasks
// ========================
export const getTasks = () => api.get('/tasks');
export const getTask = (id) => api.get(`/tasks/${id}`);
export const createTask = (data) => api.post('/tasks', data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

// ========================
// Tenants
// ========================
export const getTenants = () => api.get('/tenants');
export const getTenant = (id) => api.get(`/tenants/${id}`);
export const createTenant = (data) => api.post('/tenants', data);
export const updateTenant = (id, data) => api.put(`/tenants/${id}`, data);
export const deleteTenant = (id) => api.delete(`/tenants/${id}`);

// ========================
// Comments
// ========================
export const getComments = () => api.get('/comments');
export const getComment = (id) => api.get(`/comments/${id}`);
export const getCommentsByTask = (taskId) => api.get(`/comments/task/${taskId}`);
export const getCommentsByUser = (userId) => api.get(`/comments/user/${userId}`);
export const createComment = (data) => api.post('/comments', data);
export const updateComment = (id, data) => api.put(`/comments/${id}`, data);
export const deleteComment = (id) => api.delete(`/comments/${id}`);

export default api;
