import React, { useMemo, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isValidName = useMemo(() => name.trim().length > 0 && !/\d/.test(name), [name]);
  const isValidPhone = useMemo(() => phone === '' || /^\d+$/.test(phone), [phone]);

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (!isValidName) {
        throw new Error('Name must not contain numbers');
      }
      if (!isValidPhone) {
        throw new Error('Phone must contain digits only');
      }
      const extras: { phone?: string; dob?: string; address?: string } = {};
      if (phone) extras.phone = phone;
      if (dob) extras.dob = dob;
      if (address) extras.address = address;
      // Casting due to store selector type inference; extras properties are optional
      register(name.trim(), email, password, extras as any);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full bg-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          {!isValidName && name !== '' && <p className="text-xs text-red-600">Name must not contain numbers</p>}
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
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (digits only)"
            className="w-full bg-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {!isValidPhone && phone !== '' && <p className="text-xs text-red-600">Phone must contain digits only</p>}
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="YYYY-MM-DD"
            className="w-full bg-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            rows={3}
            className="w-full bg-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
            Create account
          </button>
        </form>
        <div className="text-sm text-gray-600 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-green-700 font-medium">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;


