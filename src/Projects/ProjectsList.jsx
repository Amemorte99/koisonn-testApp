// src/Projects/ProjectsList.jsx
import React, { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../api/api';
import { Link } from 'react-router-dom';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(res => {
      setProjects(res.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Projects</h2>
        <Link to="/projects/new" className="btn btn-primary">
          <i className="bi bi-plus-lg"></i> New Project
        </Link>
      </div>
      <div className="row g-4">
        {projects.map(project => (
          <div key={project.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text text-muted">{project.description}</p>
                <div className="mt-3">
                  <Link to={`/projects/${project.id}`} className="btn btn-sm btn-outline-primary me-2">
                    View
                  </Link>
                  <button onClick={() => handleDelete(project.id)} className="btn btn-sm btn-outline-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}