import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Toaster } from 'react-hot-toast';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <AdminSidebar />

      {/* Main content — offset by sidebar width */}
      <main className="flex-1 ml-64 p-8 transition-all duration-300">
        {/* Top header bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            {/* Page-specific title will be rendered by child routes */}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-indigo-500/25">
              K
            </div>
          </div>
        </div>

        <Outlet />
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#f1f5f9' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#f1f5f9' },
          },
        }}
      />
    </div>
  );
};

export default AdminLayout;
