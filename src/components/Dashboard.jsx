import React, { useEffect, useState } from 'react';
import { getProjects } from '../api';
import '../assets/Dashboard.css';
export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(res => {
      setProjects(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Mes projets</h1>
      <ul>
        {projects.map(p => (
          <li key={p.id}>
            <a href={`/project/${p.id}`}>{p.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
