import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <AdminSidebar />

      {/* Main content — offset by sidebar width */}
      <main className="flex-1 ml-64 p-8 transition-all duration-300">
        {/* Top header bar */}
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400 hidden sm:inline">
              {user?.name || 'Admin'}
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-indigo-500/25">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </div>
        </div>

        <Outlet />
      </main>

      {/* Removed duplicate Toaster — already exists in main.jsx */}
    </div>
  );
};

export default AdminLayout;
