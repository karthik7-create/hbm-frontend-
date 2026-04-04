import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Hotel,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/hotels', icon: Building2, label: 'Hotels' },
  { path: '/admin/bookings', icon: CalendarCheck, label: 'Bookings' },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col border-r border-slate-800 transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
      style={{ background: 'var(--bg-sidebar)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-800">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center">
          <Hotel size={20} className="text-indigo-400" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in-up">
            <h1 className="text-base font-bold text-white tracking-tight">HMS Admin</h1>
            <p className="text-[10px] text-slate-500 font-medium -mt-0.5">Management Panel</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.end
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-500/15 text-indigo-400 shadow-sm shadow-indigo-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon
                size={20}
                className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-indigo-400' : ''
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-all duration-200"
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /> <span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
