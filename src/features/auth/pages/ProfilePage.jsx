import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, editProfile, clearError } from '../authSlice';
import { User, Mail, Phone, Shield, Calendar, Edit3, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || '', phone: user.phone || '' });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSave = () => {
    dispatch(editProfile(formData)).then((res) => {
      if (!res.error) {
        toast.success('Profile updated successfully');
        setEditing(false);
      }
    });
  };

  const handleCancel = () => {
    setFormData({ name: user?.name || '', phone: user?.phone || '' });
    setEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-surface-200/60">Manage your StayEase account information</p>
        </div>

        {/* Profile Card */}
        <div className="glass rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {/* Banner */}
          <div className="h-32 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoNnptMC0zMHY2aC02VjRoNnptMCAxMHY2aC02VjE0aDZ6bTAgMTB2NmgtNlYyNGg2em0tMTAtNHY2aC02VjIwaDZ6bTAgMTB2NmgtNlYzMGg2em0wLTIwdjZoLTZWMTBoNnptMTAgMHY2aC02VjEwaDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-14">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center border-4 border-surface-900 shadow-xl">
              <span className="text-4xl font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 pt-4">
            {/* Name & Role */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-1">{user?.name || 'User'}</h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                user?.role === 'ADMIN'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                  : 'bg-primary-500/15 text-primary-400 border border-primary-500/20'
              }`}>
                <Shield className="w-3.5 h-3.5" />
                {user?.role || 'USER'}
              </span>
            </div>

            {/* Info Fields */}
            <div className="space-y-4">
              {/* Name (editable) */}
              <InfoField
                icon={<User className="w-4 h-4" />}
                label="Full Name"
                value={editing ? (
                  <input
                    id="profile-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                ) : (
                  <span className="text-white text-sm">{user?.name || '—'}</span>
                )}
              />

              {/* Email (read-only) */}
              <InfoField
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value={<span className="text-white text-sm">{user?.email || '—'}</span>}
              />

              {/* Phone (editable) */}
              <InfoField
                icon={<Phone className="w-4 h-4" />}
                label="Phone"
                value={editing ? (
                  <input
                    id="profile-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-surface-200/30 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                ) : (
                  <span className="text-white text-sm">{user?.phone || 'Not provided'}</span>
                )}
              />

              {/* Joined Date (read-only) */}
              <InfoField
                icon={<Calendar className="w-4 h-4" />}
                label="Member Since"
                value={<span className="text-white text-sm">{formatDate(user?.createdAt)}</span>}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8">
              {editing ? (
                <>
                  <button
                    id="profile-save"
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 border-none cursor-pointer text-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" /> Save Changes
                      </>
                    )}
                  </button>
                  <button
                    id="profile-cancel"
                    onClick={handleCancel}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-surface-200 font-medium transition-all flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </>
              ) : (
                <button
                  id="profile-edit"
                  onClick={() => setEditing(true)}
                  className="flex-1 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-surface-200 hover:text-white font-medium transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable info field component
const InfoField = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
    <div className="mt-0.5 text-surface-200/40">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-surface-200/50 mb-1">{label}</p>
      {value}
    </div>
  </div>
);

export default ProfilePage;
