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

// TENANTS
import TenantList from './Tenants/TenantList';
import TenantForm from './Tenants/TenantForm';
import TenantView from './Tenants/TenantView';

// USERS
import UsersList from './Users/UsersList';
import UserForm from './Users/UserForm';
import UserView from './Users/UserView';

// COMMENTS
import CommentsList from './Comments/CommentsList';
import CommentsPage from './Comments/CommentsPage';
import CommentForm from './Comments/CommentForm';
import CommentView from './Comments/CommentView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />

          {/* PROJECTS */}
          <Route path="/projects" element={<Layout><ProjectsList /></Layout>} />
          <Route path="/projects/new" element={<Layout><ProjectForm /></Layout>} />
          <Route path="/projects/:id" element={<Layout><ProjectView /></Layout>} />
          <Route path="/projects/:id/edit" element={<Layout><ProjectForm /></Layout>} />

          {/* TASKS */}
          <Route path="/tasks" element={<Layout><TasksList /></Layout>} />
          <Route path="/tasks/new" element={<Layout><TaskForm /></Layout>} />
          <Route path="/tasks/:id" element={<Layout><TaskView /></Layout>} />
          <Route path="/tasks/:id/edit" element={<Layout><TaskForm /></Layout>} />

          {/* TENANTS */}
          <Route path="/tenants" element={<Layout><TenantList /></Layout>} />
          <Route path="/tenants/new" element={<Layout><TenantForm /></Layout>} />
          <Route path="/tenants/:id" element={<Layout><TenantView /></Layout>} />
          <Route path="/tenants/:id/edit" element={<Layout><TenantForm /></Layout>} />

          {/* USERS */}
          <Route path="/users" element={<Layout><UsersList /></Layout>} />
          <Route path="/users/new" element={<Layout><UserForm /></Layout>} />
          <Route path="/users/:id" element={<Layout><UserView /></Layout>} />

          {/* COMMENTS */}
          <Route path="/comments" element={<Layout><CommentsPage /></Layout>} />
          <Route path="/comments/new" element={<Layout><CommentForm /></Layout>} />
          <Route path="/comments/:id" element={<Layout><CommentView /></Layout>} />
          <Route path="/comments/:id/edit" element={<Layout><CommentForm /></Layout>} />

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