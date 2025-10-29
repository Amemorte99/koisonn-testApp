// src/Tasks/TaskView.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTask, deleteTask } from '../api/api';
import { toast } from 'react-hot-toast';
import './tasks.css';

export default function TaskView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const res = await getTask(id);
      setTask(res.data);
    } catch (err) {
      toast.error('Task not found');
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this task permanently?')) return;
    try {
      await deleteTask(id);
      toast.success('Task deleted');
      navigate('/tasks');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-5 text-white">Loading...</div>;
  if (!task) return null;

  const statusInfo = {
    TODO: { label: 'To Do', color: 'indigo' },
    IN_PROGRESS: { label: 'In Progress', color: 'amber' },
    DONE: { label: 'Done', color: 'emerald' },
  }[task.status];

  return (
    <div className="container py-4">
      <div className="view-card">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="view-title">{task.title}</h1>
            <span className={`badge status-badge ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
          <div>
            <Link to={`/tasks/${id}/edit`} className="btn btn-outline-secondary me-2">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              Delete
            </button>
          </div>
        </div>

        {task.description && (
          <div className="mb-4">
            <h5>Description</h5>
            <p className="text-muted">{task.description}</p>
          </div>
        )}

        <div className="row">
          <div className="col-md-6">
            <div className="info-item">
              <strong>Project ID:</strong> {task.projectId}
            </div>
            <div className="info-item">
              <strong>Assigned To:</strong> User {task.assignedToId}
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-item">
              <strong>Created By:</strong> User {task.createdById}
            </div>
            <div className="info-item">
              <strong>Tenant ID:</strong> {task.tenantId}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link to="/tasks" className="btn btn-outline-primary">
            Back to Tasks
          </Link>
        </div>
      </div>
    </div>
  );
}