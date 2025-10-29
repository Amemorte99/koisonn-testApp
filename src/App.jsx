import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectView from './components/ProjectView';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <PrivateRoute>
              <ProjectView />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
