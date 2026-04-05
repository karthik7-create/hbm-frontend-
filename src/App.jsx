import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

// Module routes (flat arrays)
import { AuthRoutes } from './features/auth/routes';
import { HotelRoutes } from './features/hotel/routes';
import { BookingRoutes } from './features/booking/routes';

// Admin uses nested layout, import components directly
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import AdminLayout from './features/admin/components/AdminLayout';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import AdminUsers from './features/admin/pages/AdminUsers';
import AdminHotels from './features/admin/pages/AdminHotels';
import AdminBookings from './features/admin/pages/AdminBookings';
import AdminHotelCreate from './features/hotel/pages/AdminHotelCreate';
import AdminHotelManage from './features/hotel/pages/AdminHotelManage';

// Merge all flat routes from modules
const allRoutes = [...AuthRoutes, ...HotelRoutes, ...BookingRoutes];

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Hide the main navbar on admin pages — admin has its own sidebar */}
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? '' : 'flex-1'}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* All flat module routes (Auth, Hotel public, Booking) */}
          {allRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Admin nested layout — protected, admin only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="hotels/create" element={<AdminHotelCreate />} />
            <Route path="hotels/manage" element={<AdminHotelManage />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
