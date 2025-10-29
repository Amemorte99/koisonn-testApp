import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
