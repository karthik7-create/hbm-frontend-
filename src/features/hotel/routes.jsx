import HotelSearch from './pages/HotelSearch';
import HotelDetail from './pages/HotelDetail';
import AdminHotelCreate from './pages/AdminHotelCreate';
import AdminHotelManage from './pages/AdminHotelManage';

// Hotel routes — exported as array for merge with other modules
export const HotelRoutes = [
  // Public routes
  { path: '/hotels', element: <HotelSearch /> },
  { path: '/hotels/:id', element: <HotelDetail /> },

  // Admin routes (these render inside admin layout via separate merge)
  { path: '/admin/hotels/create', element: <AdminHotelCreate /> },
  { path: '/admin/hotels/manage', element: <AdminHotelManage /> },
];
