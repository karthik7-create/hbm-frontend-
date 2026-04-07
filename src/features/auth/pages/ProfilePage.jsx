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
    <div style={{ minHeight: '100vh', padding: '3rem 1rem' }}>
      {/* Background Glow */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, background: 'rgba(59,130,246,0.08)', borderRadius: '50%', filter: 'blur(64px)',
        }} />
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>My Profile</h1>
          <p style={{ color: 'rgba(226,232,240,0.6)', fontSize: '0.95rem' }}>Manage your StayEase account information</p>
        </div>

        {/* Profile Card */}
        <div
          className="glass animate-fade-in-up"
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.06)',
            animationDelay: '0.1s',
          }}
        >
          {/* Banner */}
          <div style={{
            height: 140,
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 40%, #d946ef 100%)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoNnptMC0zMHY2aC02VjRoNnptMCAxMHY2aC02VjE0aDZ6bTAgMTB2NmgtNlYyNGg2em0tMTAtNHY2aC02VjIwaDZ6bTAgMTB2NmgtNlYzMGg2em0wLTIwdjZoLTZWMTBoNnptMTAgMHY2aC02VjEwaDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')",
              opacity: 0.3,
            }} />
            {/* Bottom gradient fade to blend into card body */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
              background: 'linear-gradient(to top, rgba(15,23,42,0.85), transparent)',
            }} />
          </div>

          {/* Avatar — centered, overlapping banner bottom */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: -56 }}>
            <div style={{
              width: 96, height: 96,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #d946ef)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '4px solid rgba(15,23,42,0.95)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.06)',
            }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '1rem 2rem 2rem' }}>
            {/* Name & Role */}
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: '0.5rem 0 0.5rem' }}>
                {user?.name || 'User'}
              </h2>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 14px', borderRadius: 9999,
                fontSize: '0.75rem', fontWeight: 600,
                background: user?.role === 'ADMIN' ? 'rgba(245,158,11,0.12)' : 'rgba(59,130,246,0.12)',
                color: user?.role === 'ADMIN' ? '#fbbf24' : '#60a5fa',
                border: `1px solid ${user?.role === 'ADMIN' ? 'rgba(245,158,11,0.2)' : 'rgba(59,130,246,0.2)'}`,
              }}>
                <Shield style={{ width: 14, height: 14 }} />
                {user?.role || 'USER'}
              </span>
            </div>

            {/* Separator */}
            <div style={{
              height: 1, margin: '0 0 1.25rem',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            }} />

            {/* Info Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <InfoField
                icon={<User style={{ width: 18, height: 18 }} />}
                label="Full Name"
                value={editing ? (
                  <input
                    id="profile-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
                      padding: '8px 12px', color: '#fff', fontSize: '0.875rem',
                      outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                ) : (
                  <span style={{ color: '#fff', fontSize: '0.875rem' }}>{user?.name || '—'}</span>
                )}
              />

              <InfoField
                icon={<Mail style={{ width: 18, height: 18 }} />}
                label="Email"
                value={<span style={{ color: '#fff', fontSize: '0.875rem' }}>{user?.email || '—'}</span>}
              />

              <InfoField
                icon={<Phone style={{ width: 18, height: 18 }} />}
                label="Phone"
                value={editing ? (
                  <input
                    id="profile-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
                      padding: '8px 12px', color: '#fff', fontSize: '0.875rem',
                      outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                ) : (
                  <span style={{ color: '#fff', fontSize: '0.875rem' }}>{user?.phone || 'Not provided'}</span>
                )}
              />

              <InfoField
                icon={<Calendar style={{ width: 18, height: 18 }} />}
                label="Member Since"
                value={<span style={{ color: '#fff', fontSize: '0.875rem' }}>{formatDate(user?.createdAt)}</span>}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginTop: '1.75rem' }}>
              {editing ? (
                <>
                  <button
                    id="profile-save"
                    onClick={handleSave}
                    disabled={loading}
                    style={{
                      flex: 1, padding: '12px 16px',
                      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                      color: '#fff', fontWeight: 600, borderRadius: 12,
                      border: 'none', cursor: 'pointer', fontSize: '0.875rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: '0 4px 14px rgba(59,130,246,0.3)',
                      transition: 'all 0.2s', opacity: loading ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 20px rgba(59,130,246,0.4)'; }}
                    onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 14px rgba(59,130,246,0.3)'; }}
                  >
                    {loading ? (
                      <div style={{
                        width: 16, height: 16,
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#fff', borderRadius: '50%',
                        animation: 'spin 0.6s linear infinite',
                      }} />
                    ) : (
                      <>
                        <Save style={{ width: 16, height: 16 }} /> Save Changes
                      </>
                    )}
                  </button>
                  <button
                    id="profile-cancel"
                    onClick={handleCancel}
                    style={{
                      padding: '12px 20px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12, color: '#e2e8f0',
                      fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem',
                      display: 'flex', alignItems: 'center', gap: 8,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    <X style={{ width: 16, height: 16 }} /> Cancel
                  </button>
                </>
              ) : (
                <button
                  id="profile-edit"
                  onClick={() => setEditing(true)}
                  style={{
                    flex: 1, padding: '12px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12, color: '#e2e8f0',
                    fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = '#e2e8f0'; }}
                >
                  <Edit3 style={{ width: 16, height: 16 }} /> Edit Profile
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
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: 14,
    padding: '14px 16px', borderRadius: 14,
    background: 'rgba(255,255,255,0.025)',
    transition: 'background 0.2s',
  }}
    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
  >
    <div style={{ marginTop: 2, color: 'rgba(226,232,240,0.4)', flexShrink: 0 }}>{icon}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ fontSize: '0.7rem', color: 'rgba(226,232,240,0.45)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>{label}</p>
      {value}
    </div>
  </div>
);

export default ProfilePage;
