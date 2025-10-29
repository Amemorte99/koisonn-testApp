import React, { useState, useEffect } from 'react';
import { createProject, updateProject } from '../api';

export default function ProjectForm({ project, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, description };
    if (project) {
      await updateProject(project.id, data);
    } else {
      await createProject(data);
    }
    onClose();
  };

  return (
    <div className="modal">
      <form className="project-form" onSubmit={handleSubmit}>
        <h3>{project ? 'Modifier le projet' : 'Créer un projet'}</h3>
        <label>Nom</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
        <div className="buttons">
          <button type="submit">{project ? 'Enregistrer' : 'Créer'}</button>
          <button type="button" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
}
