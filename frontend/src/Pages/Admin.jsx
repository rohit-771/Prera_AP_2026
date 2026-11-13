
import { useEffect, useState } from 'react';
import '../CSS/Admin.css';

const API = 'http://localhost:5001/api';

export default function Admin() {
  const [token, setToken] = useState(
    localStorage.getItem('prera_admin_token') || ''
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('prera_admin_token', data.token);
      setToken(data.token);
      setPassword('');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load Feedback
  const loadFeedback = async () => {
    if (!token) return;

    setLoading(true);
    setMessage('');

    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '100',
        status,
        search
      });

      const res = await fetch(`${API}/admin/feedback?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem('prera_admin_token');
        setToken('');
        throw new Error('Session expired. Please login again.');
      }

      if (!res.ok) {
        throw new Error(data.message || 'Could not load feedback');
      }

      setFeedback(data.data || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadFeedback();
    }
  }, [token, status, search]);

  // Update Feedback Status
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API}/admin/feedback/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Status update failed');
      }

      setFeedback((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );

      setMessage('Feedback status updated successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Delete Feedback
  const deleteFeedback = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this feedback?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`${API}/admin/feedback/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Delete failed');
      }

      setFeedback((previous) =>
        previous.filter((item) => item.id !== id)
      );

      setMessage('Feedback deleted successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('prera_admin_token');
    setToken('');
    setFeedback([]);
    setMessage('');
  };

  // Login Screen
  if (!token) {
    return (
      <div className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <p className="admin-eyebrow">PRERA ADMINISTRATION</p>
          <h1>Admin <span>Login</span></h1>
          <p className="admin-login-description">
            Login to manage PRERA feedback submissions.
          </p>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {message && <p className="admin-message">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'LOGGING IN...' : 'LOGIN →'}
          </button>
        </form>
      </div>
    );
  }

  const pendingCount = feedback.filter(
    (item) => item.status === 'Pending'
  ).length;

  const reviewedCount = feedback.filter(
    (item) => item.status === 'Reviewed'
  ).length;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">PRERA MANAGEMENT</p>
          <h1>Feedback <span>Dashboard</span></h1>
        </div>

        <button className="admin-logout" onClick={logout}>
          LOGOUT
        </button>
      </header>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <p>Total Loaded</p>
          <h2>{feedback.length}</h2>
        </div>

        <div className="admin-stat-card">
          <p>Pending</p>
          <h2>{pendingCount}</h2>
        </div>

        <div className="admin-stat-card">
          <p>Reviewed</p>
          <h2>{reviewedCount}</h2>
        </div>
      </div>

      <div className="admin-feedback-section">
        <div className="admin-toolbar">
          <input
            type="search"
            placeholder="Search name, email or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Feedback</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
          </select>

          <button onClick={loadFeedback}>REFRESH</button>
        </div>

        {message && <p className="admin-message">{message}</p>}

        {loading ? (
          <p className="admin-empty">Loading feedback...</p>
        ) : feedback.length === 0 ? (
          <p className="admin-empty">No feedback found.</p>
        ) : (
          <div className="admin-feedback-list">
            {feedback.map((item) => (
              <article className="admin-feedback-card" key={item.id}>
                <div className="admin-feedback-top">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.email}</p>
                  </div>

                  <span className={`feedback-status ${
                    item.status === 'Reviewed' ? 'reviewed' : 'pending'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="admin-rating">
                  {'★'.repeat(item.rating)}
                  <span>{'☆'.repeat(5 - item.rating)}</span>
                </div>

                <p className="admin-feedback-message">
                  {item.message}
                </p>

                <p className="admin-feedback-date">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <div className="admin-card-actions">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(item.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                  </select>

                  <button
                    className="admin-delete"
                    onClick={() => deleteFeedback(item.id)}
                  >
                    DELETE
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
