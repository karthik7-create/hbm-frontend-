import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminHotels from './pages/AdminHotels';
import AdminBookings from './pages/AdminBookings';

// Admin routes — exported as array for merge with other modules
export const AdminRoutes = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'hotels', element: <AdminHotels /> },
      { path: 'bookings', element: <AdminBookings /> },
    ],
  },
];
