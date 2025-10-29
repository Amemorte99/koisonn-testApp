// src/Comments/CommentsPage.jsx
import React, { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './comments.css';

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await getComments(); // TOUS LES COMMENTS
      setComments(res.data);
    } catch (err) {
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await deleteComment(id);
      setComments(comments.filter(c => c.id !== id));
      toast.success('Comment deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-5 text-white">Loading comments...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="page-title">All Comments</h1>
        <Link to="/comments/new" className="btn btn-primary btn-add">
          New Comment
        </Link>
      </div>

      {comments.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-chat-dots"></i>
          <p>No comments yet.</p>
        </div>
      ) : (
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-item comment-global">
              <div className="comment-header">
                <div className="comment-user">
                  <div className="user-avatar-sm">
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <div>
                    <strong>User {comment.userId}</strong>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="comment-actions">
                  <Link
                    to={`/comments/${comment.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="btn btn-sm btn-outline-danger ms-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="comment-content">{comment.content}</p>
              <div className="comment-task-info">
                <Link to={`/tasks/${comment.taskId}`} className="text-indigo-400 hover:underline">
                  Task #{comment.taskId}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}