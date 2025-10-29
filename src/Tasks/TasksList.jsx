import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import Loader from '../components/Loader';

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette tâche ?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <h2>Tâches</h2>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{task.title}</span>
            <div>
              <button className="btn btn-sm btn-warning me-2">Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
