import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useState } from 'react';
import { Hotel, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setDropdownOpen(false);
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Hotel className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              StayEase
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/search">Hotels</NavLink>

            {isAuthenticated ? (
              <div className="relative ml-2">
                <button
                  id="user-menu-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-surface-200 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">{user?.name || 'User'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass rounded-xl shadow-2xl py-2 animate-fade-in-up z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-semibold text-white">{user?.name}</p>
                      <p className="text-xs text-surface-200/60 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-200 hover:bg-white/5 no-underline transition-colors"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-200 hover:bg-white/5 no-underline transition-colors"
                      >
                        <Hotel className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-surface-200 hover:text-white rounded-lg hover:bg-white/5 no-underline transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 rounded-lg no-underline transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-surface-200 hover:text-white bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/5 pt-3 animate-fade-in-up">
            <MobileLink to="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
            <MobileLink to="/search" onClick={() => setMobileOpen(false)}>Hotels</MobileLink>
            {isAuthenticated ? (
              <>
                <MobileLink to="/profile" onClick={() => setMobileOpen(false)}>Profile</MobileLink>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="block w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg bg-transparent border-none cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileLink to="/login" onClick={() => setMobileOpen(false)}>Sign In</MobileLink>
                <MobileLink to="/register" onClick={() => setMobileOpen(false)}>Get Started</MobileLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop nav link
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="px-3 py-2 text-sm font-medium text-surface-200/80 hover:text-white rounded-lg hover:bg-white/5 no-underline transition-all duration-200"
  >
    {children}
  </Link>
);

// Mobile nav link
const MobileLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2.5 text-sm text-surface-200 hover:text-white hover:bg-white/5 rounded-lg no-underline transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;
