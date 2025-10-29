// src/Tasks/TasksList.jsx
import React, { useEffect, useState } from 'react';
import { getTasks, updateTask, deleteTask } from '../api/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './tasks.css';

const STATUS_COLUMNS = {
  TODO: { title: 'To Do', color: 'indigo' },
  IN_PROGRESS: { title: 'In Progress', color: 'amber' },
  DONE: { title: 'Done', color: 'emerald' },
};

function TaskCard({ task, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
    >
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="task-delete"
        >
          <i className="bi bi-x"></i>
        </button>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-meta">
        <span className="task-project">Project {task.projectId}</span>
        <span className="task-assignee">User {task.assignedToId}</span>
      </div>
      <Link to={`/tasks/${task.id}`} className="task-view-link">
        <i className="bi bi-box-arrow-up-right"></i>
      </Link>
    </div>
  );
}

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterProject, setFilterProject] = useState('all');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    const overColumn = Object.keys(STATUS_COLUMNS).find(col =>
      over.id.toString().includes(col)
    );

    if (!overColumn || activeTask.status === overColumn) return;

    try {
      const updatedTask = { ...activeTask, status: overColumn };
      await updateTask(activeTask.id, updatedTask);
      setTasks(tasks.map(t => t.id === activeTask.id ? updatedTask : t));
      toast.success(`Task moved to ${STATUS_COLUMNS[overColumn].title}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredTasks = filterProject === 'all'
    ? tasks
    : tasks.filter(t => t.projectId === parseInt(filterProject));

  const columns = Object.entries(STATUS_COLUMNS).map(([status, { title, color }]) => ({
    status,
    title,
    color,
    tasks: filteredTasks.filter(t => t.status === status),
  }));

  if (loading) return <div className="text-center py-5 text-white">Loading tasks...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="page-title">Tasks</h1>
        <div className="d-flex gap-3 align-items-center">
          <select
            className="form-select kanban-filter"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            <option value="all">All Projects</option>
            {/* Remplir dynamiquement si besoin */}
            <option value="1">Project 1</option>
          </select>
          <Link to="/tasks/new" className="btn btn-primary btn-add">
            <i className="bi bi-plus-lg me-2"></i>New Task
          </Link>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-board">
          {columns.map(column => (
            <div key={column.status} className="kanban-column">
              <div className={`column-header ${column.color}`}>
                <h3>{column.title}</h3>
                <span className="task-count">{column.tasks.length}</span>
              </div>
              <div className="column-body" id={`column-${column.status}`}>
                <SortableContext
                  items={column.tasks.map(t => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {column.tasks.length === 0 ? (
                    <div className="empty-column">Drop tasks here</div>
                  ) : (
                    column.tasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </SortableContext>
              </div>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}