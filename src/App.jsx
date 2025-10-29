// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';

// PROJECTS
import ProjectsList from './Projects/ProjectsList';
import ProjectForm from './Projects/ProjectForm';
import ProjectView from './Projects/ProjectView';

// TASKS
import TasksList from './Tasks/TasksList';
import TaskForm from './Tasks/TaskForm';
import TaskView from './Tasks/TaskView';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />

          {/* PROJECTS ROUTES */}
          <Route path="/projects" element={<Layout><ProjectsList /></Layout>} />
          <Route path="/projects/new" element={<Layout><ProjectForm /></Layout>} />
          <Route path="/projects/:id" element={<Layout><ProjectView /></Layout>} />
          <Route path="/projects/:id/edit" element={<Layout><ProjectForm /></Layout>} />

          {/* TASKS ROUTES */}
          <Route path="/tasks" element={<Layout><TasksList /></Layout>} />
          <Route path="/tasks/new" element={<Layout><TaskForm /></Layout>} />
          <Route path="/tasks/:id" element={<Layout><TaskView /></Layout>} />
          <Route path="/tasks/:id/edit" element={<Layout><TaskForm /></Layout>} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        marginLeft: '260px',
        flex: 1,
        padding: '2rem',
        transition: 'margin-left 0.35s ease'
      }}>
        {children}
      </main>
    </div>
  );
}

export default App;