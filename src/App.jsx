import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AdminRoutes } from './features/admin/routes';
import { HotelRoutes } from './features/hotel/routes';

// Merge all module routes here during integration
const router = createBrowserRouter([
  // Redirect root to hotel search (public landing page)
  { path: '/', element: <Navigate to="/hotels" replace /> },

  // Module 2 — Hotel & Search routes (public)
  ...HotelRoutes,

  // Module 4 — Admin Dashboard routes
  ...AdminRoutes,

  // Other module routes will be spread here during merge:
  // ...AuthRoutes,
  // ...BookingRoutes,
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
