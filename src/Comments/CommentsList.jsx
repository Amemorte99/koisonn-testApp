// src/Comments/CommentsList.jsx
import React, { useEffect, useState } from 'react';
import { getCommentsByTask, deleteComment } from '../api/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './comments.css';

export default function CommentsList({ taskId, onCommentDeleted }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await getCommentsByTask(taskId);
      setComments(res.data);
    } catch (err) {
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) fetchComments();
  }, [taskId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await deleteComment(id);
      setComments(comments.filter(c => c.id !== id));
      onCommentDeleted?.();
      toast.success('Comment deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-3 text-muted">Loading comments...</div>;

  if (comments.length === 0) {
    return (
      <div className="empty-comments">
        <i className="bi bi-chat-dots"></i>
        <p>No comments yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="comments-list">
      {comments.map(comment => (
        <div key={comment.id} className="comment-item">
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
            <button
              onClick={() => handleDelete(comment.id)}
              className="comment-delete"
              title="Delete"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
          <p className="comment-content">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}