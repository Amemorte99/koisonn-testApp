import React, { useEffect, useState } from 'react';
import { getProjectById, getTasksByProject } from '../api';
import { useParams, Link } from 'react-router-dom';
import '../assets/ProjectView.css';
export default function ProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getProjectById(id)
      .then(res => setProject(res.data))
      .catch(() => setError('Erreur lors du chargement du projet'));

    getTasksByProject(id)
      .then(res => setTasks(res.data))
      .catch(() => setError('Erreur lors du chargement des tâches'));
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!project) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Projet: {project.name}</h2>
      <Link to="/dashboard">Retour au dashboard</Link>

      <h3>Tâches</h3>
      {tasks.length === 0 && <p>Aucune tâche pour ce projet.</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - Statut: {task.status} - Assigné à: {task.assigned_to ? task.assigned_to.username : 'Aucun'}
          </li>
        ))}
      </ul>
    </div>
  );
}
