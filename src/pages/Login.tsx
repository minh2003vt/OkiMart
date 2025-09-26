import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    setError(null);
    try {
      login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <div className="mt-3 text-xl font-bold text-gray-900">Oki Mart</div>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          {error && <div className="text-sm text-red-600">{error}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
            Login
          </button>
        </form>
        <div className="text-sm text-gray-600 mt-4 text-center">
          No account? <Link to="/register" className="text-green-700 font-medium">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;


