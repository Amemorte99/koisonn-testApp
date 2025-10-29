// src/Projects/ProjectsList.jsx
import React, { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../api/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './projects.css';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      toast.success('Project deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-5 text-white">Loading projects...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="page-title">Projects</h1>
        <Link to="/projects/new" className="btn btn-primary btn-add">
          <i className="bi bi-plus-lg me-2"></i>New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-folder-x"></i>
          <p>No projects yet. Create your first one!</p>
        </div>
      ) : (
        <div className="row g-4">
          {projects.map(project => (
            <div key={project.id} className="col-md-6 col-lg-4">
              <div className="project-card">
                <div className="card-header">
                  <h3 className="project-name">{project.name}</h3>
                  <span className="badge tenant-badge">Tenant {project.tenantId}</span>
                </div>
                {project.description && (
                  <p className="project-desc">{project.description}</p>
                )}
                <div className="card-actions">
                  <Link to={`/projects/${project.id}`} className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-eye"></i> View
                  </Link>
                  <Link to={`/projects/${project.id}/edit`} className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-pencil"></i> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}