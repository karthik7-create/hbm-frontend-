import BookingsPage from './pages/BookingsPage';
import BookingDetailPage from './pages/BookingDetailPage';
import PaymentPage from './pages/PaymentPage';
import ProtectedRoute from '../auth/components/ProtectedRoute';

// Route array for Module 3 — Booking & Payment
export const BookingRoutes = [
  {
    path: '/bookings',
    element: (
      <ProtectedRoute>
        <BookingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/bookings/:id',
    element: (
      <ProtectedRoute>
        <BookingDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/bookings/:id/pay',
    element: (
      <ProtectedRoute>
        <PaymentPage />
      </ProtectedRoute>
    ),
  },
];
