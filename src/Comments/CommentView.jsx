// src/Comments/CommentView.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getComment, deleteComment } from '../api/api';
import { toast } from 'react-hot-toast';
import './comments.css';

export default function CommentView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComment();
  }, [id]);

  const fetchComment = async () => {
    try {
      const res = await getComment(id);
      setComment(res.data);
    } catch (err) {
      toast.error('Comment not found');
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this comment permanently?')) return;
    try {
      await deleteComment(id);
      toast.success('Comment deleted');
      navigate(-1); // Retour à la page précédente
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-5 text-white">Loading...</div>;
  if (!comment) return null;

  return (
    <div className="container py-4">
      <div className="view-card">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="view-title">Comment #{comment.id}</h1>
            <span className="badge status-badge indigo">Task {comment.taskId}</span>
          </div>
          <button onClick={handleDelete} className="btn btn-outline-danger">
            Delete
          </button>
        </div>

        <div className="mb-4">
          <p className="comment-content-lg">{comment.content}</p>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="info-item">
              <strong>User ID:</strong> {comment.userId}
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-item">
              <strong>Created:</strong> {new Date(comment.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button onClick={() => navigate(-1)} className="btn btn-outline-primary">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}