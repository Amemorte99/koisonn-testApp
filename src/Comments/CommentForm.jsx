// src/Comments/CommentForm.jsx
import React, { useState } from 'react';
import { createComment } from '../api/api';
import { toast } from 'react-hot-toast';
import './comments.css';

export default function CommentForm({ taskId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createComment({
        content: content.trim(),
        taskId,
        userId: JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).sub // Récupère userId du JWT
      });
      setContent('');
      onCommentAdded?.();
      toast.success('Comment added');
    } catch (err) {
      toast.error('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        className="form-control"
        rows="3"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
        required
      />
      <div className="form-actions mt-3">
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={loading || !content.trim()}
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
}