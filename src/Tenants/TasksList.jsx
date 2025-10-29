import React, { useEffect, useState } from 'react';
import { getTenants, deleteTenant } from '../api';
import Loader from '../components/Loader';

export default function TenantsList() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTenants = async () => {
    try {
      const res = await getTenants();
      setTenants(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce tenant ?')) return;
    try {
      await deleteTenant(id);
      setTenants(tenants.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTenants(); }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <h2>Tenants</h2>
      <ul className="list-group">
        {tenants.map(tenant => (
          <li key={tenant.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{tenant.name}</span>
            <div>
              <button className="btn btn-sm btn-warning me-2">Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(tenant.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
