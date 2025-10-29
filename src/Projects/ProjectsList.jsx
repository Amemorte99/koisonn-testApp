import React, { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../api';
import ProjectForm from './ProjectForm';
import './projects.css';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      await deleteProject(id);
      fetchProjects();
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingProject(null);
    setShowForm(false);
    fetchProjects();
  };

  return (
    <div className="projects-container">
      <h2>Projects</h2>
      <button onClick={() => setShowForm(true)}>Créer un projet</button>

      {showForm && <ProjectForm project={editingProject} onClose={handleFormClose} />}

      <table className="projects-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Modifier</button>
                <button onClick={() => handleDelete(p.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
