// src/auth/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Supprime le token
    localStorage.removeItem('access_token');
    
    // 2. Toast
    toast.success('Déconnecté avec succès');
    
    // 3. Redirige vers login
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-outline-danger d-flex align-items-center gap-2"
      style={{ fontSize: '0.9rem' }}
    >
      <i className="bi bi-box-arrow-right"></i>
      Déconnexion
    </button>
  );
}