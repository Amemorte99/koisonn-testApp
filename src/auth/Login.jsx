import React, { useState } from 'react';
import { login } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(username, password);

      // Sauvegarde du token JWT
      localStorage.setItem('access_token', response.data.access_token);

      // Redirection vers le dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Identifiants invalides ou serveur indisponible.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center min-vh-100">
      <div className="card login-card shadow-lg p-4" style={{ maxWidth: '420px', borderRadius: '1rem' }}>
        <h3 className="text-center mb-4">Connexion</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Utilisateur</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="ex: jean.dupont"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? 'Masquer' : 'Afficher'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-warning w-100" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="signup-link mt-3 text-center">
          Pas encore de compte ? <a href="/inscription">Inscrivez-vous</a>
        </div>
      </div>
    </div>
  );
}
