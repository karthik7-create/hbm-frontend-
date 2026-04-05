import HotelSearch from './pages/HotelSearch';
import HotelDetail from './pages/HotelDetail';

// Hotel routes — exported as array for merge with other modules
// Admin hotel pages are routed via the admin layout in App.jsx
export const HotelRoutes = [
  // Public routes
  { path: '/hotels', element: <HotelSearch /> },
  { path: '/hotels/:id', element: <HotelDetail /> },
];
