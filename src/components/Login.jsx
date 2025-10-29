import React, { useState } from 'react';
import { login } from '../api';
import '../assets/login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(username, password);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Utilisateur:</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div>
        <label>Mot de passe:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
}
