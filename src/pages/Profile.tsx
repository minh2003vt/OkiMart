import React, { useMemo, useState } from 'react';
import { useAuthStore } from '@/store/auth';

const Profile: React.FC = () => {
  const user = useAuthStore((s) => s.currentUser);
  const logout = useAuthStore((s) => s.logout);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(user?.name ?? '');
  const [dob, setDob] = useState<string>(user?.dob ?? '');
  const [address, setAddress] = useState<string>(user?.address ?? '');
  const [phone, setPhone] = useState<string>(user?.phone ?? '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  React.useEffect(() => {
    setName(user?.name ?? '');
    setDob(user?.dob ?? '');
    setAddress(user?.address ?? '');
    setPhone(user?.phone ?? '');
  }, [user]);

  const isValidName = useMemo(() => name.trim().length > 0 && !/\d/.test(name), [name]);
  const isValidPhone = useMemo(() => phone === '' || /^\d+$/.test(phone), [phone]);

  const onSave: React.FormEventHandler = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!isValidName) {
      setError('Name must not contain numbers');
      return;
    }
    if (!isValidPhone) {
      setError('Phone must contain digits only');
      return;
    }
    try {
      updateProfile({ name: name.trim(), dob: dob || undefined, address: address || undefined, phone: phone || undefined });
      setSuccess('Profile updated');
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-green-600 text-white flex items-center justify-center text-3xl shadow-sm">👤</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Profile</h1>
          {user && <p className="text-sm text-gray-600 mt-1">{user.email}</p>}
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-sm p-4">
          {user ? (
            isEditing ? (
              <form onSubmit={onSave} className="space-y-3">
                {error && <div className="text-sm text-red-600">{error}</div>}
                {success && <div className="text-sm text-green-700">{success}</div>}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Full name"
                    required
                  />
                  {!isValidName && <p className="text-xs text-red-600 mt-1">Name must not contain numbers</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Digits only"
                  />
                  {!isValidPhone && <p className="text-xs text-red-600 mt-1">Phone must contain digits only</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="YYYY-MM-DD"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Street, City, Zip"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => { setIsEditing(false); setError(null); setSuccess(null); }} className="flex-1 bg-gray-100 text-gray-900 py-2 rounded-lg">Cancel</button>
                  <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg">Save</button>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500">Name</div>
                  <div className="text-gray-900 font-medium">{user.name}</div>
                </div>
                {user.phone && (
                  <div>
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="text-gray-900">{user.phone}</div>
                  </div>
                )}
                {user.dob && (
                  <div>
                    <div className="text-xs text-gray-500">Date of Birth</div>
                    <div className="text-gray-900">{user.dob}</div>
                  </div>
                )}
                {user.address && (
                  <div>
                    <div className="text-xs text-gray-500">Address</div>
                    <div className="text-gray-900 whitespace-pre-line">{user.address}</div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button onClick={() => setIsEditing(true)} className="flex-1 bg-gray-900 text-white py-2 rounded-lg">Edit profile</button>
                  <button onClick={logout} className="flex-1 bg-gray-100 text-gray-900 py-2 rounded-lg">Logout</button>
                </div>
              </div>
            )
          ) : (
            <p className="text-gray-600 text-center">You are not logged in.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
